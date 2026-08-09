import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description:
    "How Infinite Architecture handles Site-to-Stay inquiry information.",
};

export default function PrivacyPage() {
  return (
    <article className="min-h-screen bg-ia-paper px-5 pb-24 pt-36 text-ia-ink sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-4xl">
        <p className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/55">
          Infinite Architecture · Privacy
        </p>
        <h1 className="mt-6 font-display text-[clamp(3.5rem,8vw,7.5rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
          Privacy notice
        </h1>
        <p className="mt-8 max-w-2xl font-editorial text-2xl leading-tight">
          We collect only the information needed to evaluate and respond to a
          property inquiry.
        </p>

        <div className="mt-14 space-y-10 border-t border-ia-line pt-10 text-sm leading-relaxed text-ia-ink/72">
          <section>
            <h2 className="font-editorial text-3xl text-ia-ink">
              Information collected
            </h2>
            <p className="mt-4">
              Contact details, property location and control, intended use,
              approximate investment range, timeline, optional property links,
              and the main uncertainty you describe.
            </p>
          </section>
          <section>
            <h2 className="font-editorial text-3xl text-ia-ink">
              How it is used
            </h2>
            <p className="mt-4">
              To review fit, contact you about the request, prepare a proposal
              when appropriate, prevent abuse, and maintain a record of the
              conversation. We do not sell inquiry information.
            </p>
          </section>
          <section>
            <h2 className="font-editorial text-3xl text-ia-ink">
              Retention and access
            </h2>
            <p className="mt-4">
              Inquiry records are restricted to authorized operations. You may
              request access, correction, or deletion by contacting the studio.
              Formal retention periods and the final Mexican privacy notice will
              be reviewed with qualified counsel before production lead
              collection begins.
            </p>
          </section>
          <section>
            <h2 className="font-editorial text-3xl text-ia-ink">
              Important status
            </h2>
            <p className="mt-4">
              This is a pre-launch notice for preview review. It is not a
              substitute for legal advice or final counsel approval under
              applicable Mexican privacy law.
            </p>
          </section>
        </div>

        <Link
          href="/#request-scan"
          className="mt-14 inline-flex border-b border-ia-ink pb-1 text-sm font-medium"
        >
          Return to the Site-to-Stay request
        </Link>
      </div>
    </article>
  );
}
