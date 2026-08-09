"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, Loader2 } from "lucide-react";

type SubmissionResult = {
  reference: string;
  whatsappUrl?: string;
};

const PROPERTY_CONTROL = [
  "I own the property",
  "I control it through a lease or agreement",
  "I am under contract or negotiating",
  "I am evaluating property before committing",
];

const INTENDED_USE = [
  "2–5 hospitality units",
  "6–10 hospitality units",
  "11–15 hospitality units",
  "Existing stay or property transformation",
  "Private nature-based residence",
];

const INVESTMENT_RANGES = [
  "Under MXN $1 million",
  "MXN $1–3 million",
  "MXN $3–8 million",
  "MXN $8–20 million",
  "MXN $20 million+",
  "Need the scan to establish a range",
];

const TIMELINES = [
  "Within 3 months",
  "3–6 months",
  "6–12 months",
  "12+ months",
  "Exploring now",
];

const inputClass =
  "w-full border-b border-ia-line bg-transparent px-0 py-3 text-sm text-ia-ink outline-none transition-colors placeholder:text-ia-ink/40 focus:border-ia-ink disabled:cursor-not-allowed disabled:opacity-60";

export default function ProjectIntake() {
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const payload: Record<string, FormDataEntryValue | boolean> =
      Object.fromEntries(form.entries());
    payload.consent = form.get("consent") === "on";

    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const body = (await response.json()) as {
        error?: string;
        reference?: string;
        whatsappUrl?: string;
      };

      if (!response.ok || !body.reference) {
        throw new Error(
          body.error || "The request could not be saved. Please try again.",
        );
      }

      setResult({ reference: body.reference, whatsappUrl: body.whatsappUrl });
      formElement.reset();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "The request could not be saved. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (result) {
    return (
      <div
        className="border border-ia-line bg-ia-cream p-6 md:p-8"
        role="status"
      >
        <CheckCircle2 size={24} />
        <h3 className="mt-8 font-editorial text-4xl">Request received.</h3>
        <p className="mt-4 text-sm leading-relaxed text-ia-ink/70">
          Your reference is <strong>{result.reference}</strong>. Keep it with
          your property photos, listing, plans, or location pin.
        </p>
        {result.whatsappUrl ? (
          <a
            href={result.whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-7 inline-flex min-h-12 items-center justify-center gap-3 bg-ia-ink px-6 py-3 text-sm font-medium text-ia-paper transition-colors hover:bg-ia-leaf"
          >
            Continue on WhatsApp
            <ArrowUpRight size={17} />
          </a>
        ) : (
          <p className="mt-5 text-sm text-ia-ink/60">
            WhatsApp continuation is being configured. We will use the contact
            details you submitted for the fit review.
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-8" noValidate>
      <div className="hidden" aria-hidden="true">
        <label>
          Leave this field empty
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="grid gap-2">
          <span className="ia-form-label">Your name *</span>
          <input
            name="name"
            autoComplete="name"
            className={inputClass}
            required
            disabled={submitting}
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Email *</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            className={inputClass}
            required
            disabled={submitting}
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">WhatsApp *</span>
          <input
            name="whatsapp"
            type="tel"
            autoComplete="tel"
            placeholder="+52..."
            className={inputClass}
            required
            disabled={submitting}
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Property location *</span>
          <input
            name="location"
            placeholder="Puerto Vallarta, Sayulita, San Pancho..."
            className={inputClass}
            required
            disabled={submitting}
          />
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Your control of the property *</span>
          <select
            name="propertyControl"
            defaultValue=""
            className={inputClass}
            required
            disabled={submitting}
          >
            <option value="" disabled>
              Select one
            </option>
            {PROPERTY_CONTROL.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Intended use / unit range *</span>
          <select
            name="intendedUse"
            defaultValue=""
            className={inputClass}
            required
            disabled={submitting}
          >
            <option value="" disabled>
              Select one
            </option>
            {INTENDED_USE.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Total investment range *</span>
          <select
            name="investmentRange"
            defaultValue=""
            className={inputClass}
            required
            disabled={submitting}
          >
            <option value="" disabled>
              Select one
            </option>
            {INVESTMENT_RANGES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>

        <label className="grid gap-2">
          <span className="ia-form-label">Desired timeline *</span>
          <select
            name="timeline"
            defaultValue=""
            className={inputClass}
            required
            disabled={submitting}
          >
            <option value="" disabled>
              Select one
            </option>
            {TIMELINES.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="grid gap-2">
        <span className="ia-form-label">
          Property, listing, plan, or map link
        </span>
        <input
          name="propertyUrl"
          type="url"
          placeholder="https://"
          className={inputClass}
          disabled={submitting}
        />
      </label>

      <label className="grid gap-2">
        <span className="ia-form-label">
          What is the biggest uncertainty right now? *
        </span>
        <textarea
          name="mainConstraint"
          rows={4}
          placeholder="Access, permits, total cost, water, the right build type, operations..."
          className={`${inputClass} resize-y`}
          required
          disabled={submitting}
        />
      </label>

      <label className="flex items-start gap-3 text-xs leading-relaxed text-ia-ink/65">
        <input
          name="consent"
          type="checkbox"
          className="mt-1 h-4 w-4 accent-ia-ink"
          required
          disabled={submitting}
        />
        <span>
          I agree that Infinite Architecture may use these details to evaluate
          and respond to this request. See the{" "}
          <Link href="/privacy" className="underline underline-offset-2">
            privacy notice
          </Link>
          .
        </span>
      </label>

      {error ? (
        <p id="inquiry-error" role="alert" className="text-sm text-red-800">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-4 border-t border-ia-line pt-6 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-xl text-xs leading-relaxed text-ia-ink/55">
          This begins a fit review—not a construction contract, feasibility
          opinion, or regulated design service.
        </p>
        <button
          type="submit"
          disabled={submitting}
          aria-describedby={error ? "inquiry-error" : undefined}
          className="group inline-flex min-h-12 items-center justify-center gap-3 bg-ia-ink px-6 py-3 text-sm font-medium text-ia-paper transition-colors hover:bg-ia-leaf disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? <Loader2 size={17} className="animate-spin" /> : null}
          {submitting ? "Sending request" : "Request the scan"}
          {!submitting ? (
            <ArrowUpRight
              size={17}
              className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          ) : null}
        </button>
      </div>
    </form>
  );
}
