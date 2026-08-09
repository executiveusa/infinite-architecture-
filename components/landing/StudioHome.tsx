import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, MapPin } from "lucide-react";
import ProjectIntake from "./ProjectIntake";

const HERO_IMAGE = "/images/concepts/hero-banderas-bay.webp";
const HERO_IMAGE_MOBILE = "/images/concepts/hero-banderas-bay-mobile.webp";

const SCAN_DELIVERABLES = [
  "Property and hospitality opportunity review",
  "Guest concept and local comparable snapshot",
  "Food, water, energy, and shelter systems map",
  "Preliminary investment bands, sourcing paths, and major risks",
  "One visual direction and the next recommended decision",
];

const SYSTEMS = [
  ["Food", "Planting, edible landscape, shade, habitat, and long-term care."],
  ["Water", "Supply, capture, drainage, storage, treatment, and wastewater."],
  [
    "Energy",
    "Passive comfort, solar exposure, ventilation, and resilient power.",
  ],
  [
    "Shelter",
    "Guest experience, structure, materials, access, and specialist needs.",
  ],
];

const FIELD_NOTES = [
  ["PROPERTY STRATEGY", "What can your Vallarta property actually become?"],
  ["REAL COST", "The real cost of a glamping dome is not the dome."],
  ["LIVING SYSTEMS", "Food, water, energy, and shelter belong in one plan."],
];

export default function StudioHome() {
  return (
    <div className="ia-home overflow-hidden bg-ia-cream text-ia-ink">
      <section
        id="studio"
        className="relative min-h-[100dvh] bg-ia-cave text-ia-paper"
      >
        <Image
          src={HERO_IMAGE}
          alt="AI-generated concept of a tropical off-grid property overlooking Banderas Bay"
          fill
          priority
          sizes="100vw"
          className="ia-hero-image hidden object-cover object-center md:block"
        />
        <Image
          src={HERO_IMAGE_MOBILE}
          alt="AI-generated mobile concept of a tropical off-grid property overlooking Banderas Bay"
          fill
          priority
          sizes="100vw"
          className="ia-hero-image object-cover object-center md:hidden"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,8,.24)_0%,rgba(7,12,8,.14)_28%,rgba(7,12,8,.88)_100%)]" />

        <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-5 pb-8 pt-28 sm:px-8 md:px-12 md:pb-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[1540px]">
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ia-paper/80">
              Puerto Vallarta · Riviera Nayarit
            </p>
            <h1 className="max-w-[13ch] text-balance font-display text-[clamp(3.9rem,10vw,10rem)] font-normal uppercase leading-[0.82] tracking-[-0.055em] text-ia-paper">
              Have land? Know what it can become before you build.
            </h1>

            <div className="mt-7 grid gap-7 border-t border-white/30 pt-6 md:grid-cols-[minmax(0,1.35fr)_minmax(18rem,.65fr)] md:items-end">
              <p className="max-w-3xl text-pretty font-editorial text-[clamp(1.3rem,2.1vw,2.2rem)] leading-[1.1] text-ia-paper">
                One coordinated direction for the stay, landscape, water,
                energy, sourcing, and qualified local specialists—before
                disconnected decisions get expensive.
              </p>
              <div className="md:justify-self-end">
                <a
                  href="#request-scan"
                  className="group inline-flex min-h-12 w-full items-center justify-center gap-3 bg-ia-paper px-6 py-3 text-sm font-medium text-ia-ink transition-colors hover:bg-ia-mist sm:w-auto"
                >
                  Request a Site-to-Stay Scan
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <p className="mt-3 text-center text-xs text-ia-paper/65 sm:text-left md:text-right">
                  From MXN $15,000
                </p>
              </div>
            </div>
          </div>
        </div>

        <p className="absolute right-5 top-28 z-10 hidden max-w-[14rem] border-l border-white/35 pl-4 text-xs leading-relaxed text-white/70 lg:block">
          AI-generated Infinite Architecture concept study. Not a built project.
        </p>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-8 border-b border-ia-line pb-8 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
              Interactive concept portfolio
            </p>
            <div className="flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
              <h2 className="max-w-[11ch] font-display text-[clamp(3.3rem,7vw,7.5rem)] font-normal uppercase leading-[0.85] tracking-[-0.045em]">
                See every system working together.
              </h2>
              <Link
                href="/portfolio"
                className="group inline-flex shrink-0 items-center gap-3 text-sm font-medium"
              >
                Explore three concepts{" "}
                <ArrowRight
                  size={16}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
            </div>
          </div>
          <div className="mt-9 grid gap-4 md:grid-cols-3">
            {[
              [
                "01",
                "Casa Semilla",
                "Start small and expand after demand is proven.",
                "/portfolio/casa-semilla",
              ],
              [
                "02",
                "Agua Alta",
                "Organize a hillside stay around shade, water and slope.",
                "/portfolio/agua-alta",
              ],
              [
                "03",
                "Bosque Vivo",
                "Share infrastructure across a nature-stay cluster.",
                "/portfolio/bosque-vivo",
              ],
            ].map(([number, title, body, href]) => (
              <Link
                key={title}
                href={href}
                className="group border-t border-ia-line py-5 md:min-h-56"
              >
                <p className="text-xs tracking-[0.16em] text-ia-ink/40">
                  {number}
                </p>
                <h3 className="mt-6 font-editorial text-[clamp(2.2rem,4vw,4.2rem)] leading-none">
                  {title}
                </h3>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-ia-ink/62">
                  {body}
                </p>
                <ArrowUpRight
                  size={18}
                  className="mt-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex items-start gap-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
            <span className="mt-2 h-px w-8 bg-ia-ink/35" />
            The expensive part is uncertainty
          </div>
          <div>
            <h2 className="max-w-[14ch] text-balance font-editorial text-[clamp(2.5rem,5.4vw,6rem)] leading-[0.95] tracking-[-0.025em]">
              A dome is one purchase. The property has to work as a complete
              hospitality system.
            </h2>
            <div className="mt-10 grid gap-6 border-t border-ia-line pt-8 text-sm leading-relaxed text-ia-ink/70 md:grid-cols-2">
              <p>
                Access, permits, rain, wastewater, power, heat, landscape,
                labor, operations, and the guest experience can change the
                economics long before the shell arrives.
              </p>
              <p>
                Infinite Architecture helps property owners make those decisions
                in the right order, then coordinates the approved direction with
                suppliers and qualified local professionals.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="offer"
        className="bg-ia-leaf px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24"
      >
        <div className="mx-auto grid max-w-[1540px] gap-14 lg:grid-cols-[.85fr_1.15fr]">
          <div>
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-paper/60">
              The paid first step
            </p>
            <h2 className="max-w-[11ch] font-display text-[clamp(3.5rem,7vw,8rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
              Site-to-Stay Opportunity Scan
            </h2>
            <p className="mt-8 max-w-xl font-editorial text-[clamp(1.4rem,2.4vw,2.25rem)] leading-[1.12] text-ia-paper/82">
              Know the opportunity, the major risks, and the next decision
              before committing to a full concept or construction path.
            </p>
          </div>

          <div className="border-t border-white/25">
            {SCAN_DELIVERABLES.map((item, index) => (
              <div
                key={item}
                className="grid grid-cols-[2.5rem_1fr] gap-4 border-b border-white/20 py-5 md:py-6"
              >
                <span className="text-xs text-ia-paper/50">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <p className="text-pretty font-editorial text-[clamp(1.5rem,2.5vw,2.5rem)] leading-[1.05]">
                  {item}
                </p>
              </div>
            ))}
            <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-ia-paper/55">
                  Starting at
                </p>
                <p className="mt-2 font-editorial text-5xl">MXN $15,000</p>
              </div>
              <a
                href="#request-scan"
                className="inline-flex min-h-12 items-center justify-center gap-3 bg-ia-paper px-6 py-3 text-sm font-medium text-ia-ink transition-colors hover:bg-ia-mist"
              >
                Request the scan
                <ArrowRight size={17} />
              </a>
            </div>
            <p className="mt-7 text-xs leading-relaxed text-ia-paper/55">
              This is an opportunity scan, not engineering, permit approval,
              appraisal, lender-grade feasibility, architectural certification,
              or construction documentation.
            </p>
          </div>
        </div>
      </section>

      <section
        id="systems"
        className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24"
      >
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-12 grid gap-7 lg:grid-cols-[.7fr_1.3fr] lg:items-end">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
              One living system
            </p>
            <h2 className="max-w-[13ch] font-display text-[clamp(3.3rem,7vw,7.5rem)] font-normal uppercase leading-[0.85] tracking-[-0.045em]">
              Food. Water. Energy. Shelter.
            </h2>
          </div>
          <div className="border-t border-ia-line">
            {SYSTEMS.map(([title, body], index) => (
              <article
                key={title}
                className="grid gap-4 border-b border-ia-line py-6 md:grid-cols-[4rem_.65fr_1.35fr] md:items-center md:py-8"
              >
                <span className="text-xs tracking-[0.16em] text-ia-ink/45">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-editorial text-[clamp(2.2rem,4vw,4.5rem)] leading-none">
                  {title}
                </h3>
                <p className="max-w-2xl text-sm leading-relaxed text-ia-ink/65">
                  {body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section
        id="founder"
        className="bg-ia-earth px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24"
      >
        <div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-paper/60">
              Local coordination · biophilic systems
            </p>
            <div className="mt-6 flex items-center gap-3 text-sm text-ia-paper/70">
              <MapPin size={16} />
              Puerto Vallarta, Jalisco
            </div>
          </div>
          <div>
            <h2 className="max-w-[15ch] font-editorial text-[clamp(2.6rem,5.5vw,6rem)] leading-[0.94] tracking-[-0.025em]">
              The goal is not to replace specialists. It is to help the right
              specialists work toward one property vision.
            </h2>
            <p className="mt-9 max-w-2xl text-sm leading-relaxed text-ia-paper/75">
              Infinite Architecture brings biophilic design, food-growing
              landscapes, water, energy, shelter, visualization, sourcing, and
              local project coordination into one decision path. Licensed
              architects, engineers, permit professionals, and regulated trades
              remain responsible for work requiring their credentials.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-10 flex flex-col gap-5 border-b border-ia-line pb-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
                Field notes
              </p>
              <h2 className="font-display text-[clamp(3.2rem,7vw,7rem)] font-normal uppercase leading-[0.85] tracking-[-0.045em]">
                Research before purchase.
              </h2>
            </div>
            <Link
              href="/field-notes"
              className="group inline-flex items-center gap-3 text-sm font-medium"
            >
              Read Field Notes
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>
          </div>
          <div className="border-t border-ia-line">
            {FIELD_NOTES.map(([label, title]) => (
              <Link
                key={title}
                href="/field-notes"
                className="group grid gap-4 border-b border-ia-line py-6 md:grid-cols-[.55fr_1.45fr_auto] md:items-center"
              >
                <span className="text-[0.65rem] font-medium tracking-[0.18em] text-ia-ink/45">
                  {label}
                </span>
                <h3 className="font-editorial text-[clamp(1.8rem,3vw,3.2rem)] leading-[1.02]">
                  {title}
                </h3>
                <ArrowUpRight
                  size={18}
                  className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section
        id="request-scan"
        className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24"
      >
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
                Request a Site-to-Stay Scan
              </p>
              <h2 className="max-w-[10ch] font-display text-[clamp(3.6rem,8vw,8.8rem)] font-normal uppercase leading-[0.82] tracking-[-0.055em]">
                Tell us about the property.
              </h2>
              <div className="mt-8 space-y-3 text-sm text-ia-ink/65">
                {[
                  "Short fit review first",
                  "No purchase commitment",
                  "Qualified work stays with qualified professionals",
                ].map((item) => (
                  <p key={item} className="flex items-start gap-3">
                    <Check size={16} className="mt-1 shrink-0" />
                    {item}
                  </p>
                ))}
              </div>
            </div>
            <div className="border-t border-ia-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <ProjectIntake />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
