import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const PRIMARY_LINKS = [
  ["Studio", "/#studio"],
  ["Site-to-Stay Scan", "/#offer"],
  ["Living Systems", "/#systems"],
  ["Field Notes", "/field-notes"],
  ["Request a Scan", "/#request-scan"],
];

const RESEARCH_LINKS = [
  ["Build Systems", "/build-systems"],
  ["Materials", "/materials"],
  ["Guides", "/guides"],
  ["Lab", "/lab"],
  ["Safety Canon", "/safety"],
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-ia-cave text-ia-paper">
      <div className="mx-auto max-w-[1540px] px-5 py-16 sm:px-8 md:px-12 md:py-24 lg:px-16 xl:px-24">
        <div className="grid gap-14 lg:grid-cols-[1.2fr_.8fr_.8fr]">
          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.22em] text-ia-paper/[0.45]">
              Infinite Architecture
            </p>
            <p className="mt-6 max-w-[15ch] font-editorial text-[clamp(2.5rem,5vw,5.6rem)] leading-[0.94]">
              Turn land into a nature stay people travel for.
            </p>
            <Link
              href="/#request-scan"
              className="group mt-8 inline-flex items-center gap-3 border-b border-ia-paper/[0.70] pb-1 text-sm font-medium"
            >
              Request a Site-to-Stay Scan
              <ArrowUpRight
                size={16}
                className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>
          </div>

          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ia-paper/[0.45]">
              Studio
            </p>
            <nav className="mt-6 flex flex-col gap-3" aria-label="Studio links">
              {PRIMARY_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-ia-paper/[0.68] transition-colors hover:text-ia-paper"
                >
                  {label}
                </Link>
              ))}
            </nav>
            <Link
              href="/privacy"
              className="mt-5 inline-block text-xs text-ia-paper/55 transition-colors hover:text-ia-paper"
            >
              Privacy notice
            </Link>
          </div>

          <div>
            <p className="text-[0.62rem] font-medium uppercase tracking-[0.18em] text-ia-paper/[0.45]">
              Public knowledge
            </p>
            <nav
              className="mt-6 flex flex-col gap-3"
              aria-label="Research links"
            >
              {RESEARCH_LINKS.map(([label, href]) => (
                <Link
                  key={href}
                  href={href}
                  className="text-sm text-ia-paper/[0.68] transition-colors hover:text-ia-paper"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="mt-16 grid gap-8 border-t border-white/[0.12] pt-8 text-xs leading-relaxed text-ia-paper/[0.48] md:grid-cols-[1fr_auto] md:items-end">
          <p className="max-w-3xl">
            Infinite Architecture provides concept design, visualization,
            planning, procurement support, and project coordination. Licensed
            architecture, engineering, permitting, regulated trades, and
            construction sign-off remain with qualified local professionals.
          </p>
          <div className="md:text-right">
            <p>© {year} Infinite Architecture</p>
            <p className="mt-1">Puerto Vallarta, Jalisco, México</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
