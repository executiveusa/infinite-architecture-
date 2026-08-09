import { createHash, randomBytes } from "node:crypto";
import { z } from "zod";

export const runtime = "nodejs";

const inquirySchema = z
  .object({
    name: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    whatsapp: z.string().trim().min(7).max(40),
    location: z.string().trim().min(2).max(180),
    propertyControl: z.string().trim().min(2).max(180),
    intendedUse: z.string().trim().min(2).max(180),
    investmentRange: z.string().trim().min(2).max(120),
    timeline: z.string().trim().min(2).max(120),
    propertyUrl: z
      .union([z.literal(""), z.string().trim().url().max(1000)])
      .optional(),
    mainConstraint: z.string().trim().min(8).max(2000),
    consent: z.literal(true),
    website: z.string().max(0).optional(),
  })
  .strict();

type RateLimitEntry = { count: number; resetAt: number };

const rateLimitStore = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000;
const RATE_LIMIT_MAX = 5;

function getClientKey(request: Request) {
  const forwarded = request.headers
    .get("x-forwarded-for")
    ?.split(",")[0]
    ?.trim();
  const candidate = forwarded || request.headers.get("x-real-ip") || "unknown";
  return createHash("sha256").update(candidate).digest("hex");
}

function isRateLimited(key: string) {
  const now = Date.now();
  const current = rateLimitStore.get(key);

  if (!current || current.resetAt <= now) {
    rateLimitStore.set(key, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  current.count += 1;
  return current.count > RATE_LIMIT_MAX;
}

function createReference() {
  const day = new Date().toISOString().slice(0, 10).replaceAll("-", "");
  return `IA-${day}-${randomBytes(2).toString("hex").toUpperCase()}`;
}

function getWhatsappUrl(reference: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.replace(/\D/g, "");
  if (!number || number.length < 10) return undefined;

  const message = encodeURIComponent(
    `Hello Infinite Architecture. I submitted a Site-to-Stay request. Reference: ${reference}`,
  );
  return `https://wa.me/${number}?text=${message}`;
}

function getAttribution(sourceUrl: string | null) {
  if (!sourceUrl)
    return {
      source: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };

  try {
    const url = new URL(sourceUrl);
    const limit = (value: string | null) => value?.slice(0, 180) || null;
    return {
      source: `${url.origin}${url.pathname}`.slice(0, 1000),
      utm_source: limit(url.searchParams.get("utm_source")),
      utm_medium: limit(url.searchParams.get("utm_medium")),
      utm_campaign: limit(url.searchParams.get("utm_campaign")),
    };
  } catch {
    return {
      source: null,
      utm_source: null,
      utm_medium: null,
      utm_campaign: null,
    };
  }
}

export async function POST(request: Request) {
  if (isRateLimited(getClientKey(request))) {
    return Response.json(
      { error: "Too many requests. Please wait before trying again." },
      { status: 429 },
    );
  }

  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return Response.json(
      { error: "The request body must be valid JSON." },
      { status: 400 },
    );
  }

  const parsed = inquirySchema.safeParse(json);
  if (!parsed.success) {
    return Response.json(
      { error: "Check the required fields and try again." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.SUPABASE_URL?.replace(/\/$/, "");
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY;
  if (!supabaseUrl || !supabaseSecretKey) {
    return Response.json(
      {
        error:
          "Secure inquiry storage is not configured yet. Please try again later.",
      },
      { status: 503 },
    );
  }

  const reference = createReference();
  const sourceUrl = request.headers.get("referer");
  const userAgent = request.headers.get("user-agent");
  const attribution = getAttribution(sourceUrl);
  const record = {
    reference,
    name: parsed.data.name,
    email: parsed.data.email.toLowerCase(),
    whatsapp: parsed.data.whatsapp,
    location: parsed.data.location,
    property_control: parsed.data.propertyControl,
    intended_use: parsed.data.intendedUse,
    investment_range: parsed.data.investmentRange,
    timeline: parsed.data.timeline,
    property_url: parsed.data.propertyUrl || null,
    main_constraint: parsed.data.mainConstraint,
    offer: "site_to_stay_opportunity_scan",
    ...attribution,
    consent_at: new Date().toISOString(),
    user_agent: userAgent,
  };

  try {
    const response = await fetch(`${supabaseUrl}/rest/v1/inquiries`, {
      method: "POST",
      headers: {
        apikey: supabaseSecretKey,
        Authorization: `Bearer ${supabaseSecretKey}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify(record),
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Inquiry insert failed", {
        status: response.status,
        reference,
      });
      return Response.json(
        { error: "The request could not be saved securely. Please try again." },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("Inquiry storage unavailable", {
      error: error instanceof Error ? error.name : "UnknownError",
      reference,
    });
    return Response.json(
      {
        error:
          "Secure inquiry storage is temporarily unavailable. Please try again.",
      },
      { status: 502 },
    );
  }

  return Response.json(
    { reference, whatsappUrl: getWhatsappUrl(reference) },
    { status: 201 },
  );
}
