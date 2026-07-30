import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Droplets,
  Leaf,
  MapPin,
  Sun,
  Wind,
} from 'lucide-react'
import ProjectIntake from './ProjectIntake'

const HERO_IMAGE = 'https://www.nakam.info/content/uploads/2019/07/9-9.jpg'
const INTERIOR_IMAGE = 'https://www.nakam.info/content/uploads/2019/07/13-9.jpg'
const DETAIL_IMAGE =
  'https://www.nakam.info/content/uploads/2019/07/c68a5a570985cd9f620eacf0b69fd917-e1576389272684.png'

const AUDIENCES = [
  {
    index: '01',
    title: 'Airbnb transformations',
    body: 'Turn an ordinary property into a stay with a clear architectural identity, memorable guest moments, and a stronger listing story.',
    image: HERO_IMAGE,
    position: 'center 58%',
  },
  {
    index: '02',
    title: 'Glamping and retreats',
    body: 'Shape the site, shelter, paths, shade, water, planting, and shared spaces as one coherent hospitality experience.',
    image: DETAIL_IMAGE,
    position: 'center',
  },
  {
    index: '03',
    title: 'Off-grid living systems',
    body: 'Coordinate shelter with solar, water, passive cooling, food growing, waste, and maintenance before separate vendors create conflicts.',
    image: INTERIOR_IMAGE,
    position: 'center',
  },
  {
    index: '04',
    title: 'Land and real-estate vision',
    body: 'Translate a parcel, floor plan, listing, or rough sketch into a buyer-facing 3D concept that people can understand and desire.',
    image: HERO_IMAGE,
    position: 'center 35%',
  },
]

const BUILD_TYPES = [
  ['Domes', 'Efficient envelopes for immersive stays, gathering spaces, and compact off-grid programs.'],
  ['Vaults', 'Curved spans that create shade, airflow, spatial drama, and a clear architectural signature.'],
  ['Hyper roofs', 'Lightweight roof concepts shaped around rain, sun, ventilation, and adaptable outdoor living.'],
  ['Curved cabins', 'Small-footprint hospitality structures designed around views, privacy, climate, and repeatable delivery.'],
  ['Natural interiors', 'Mineral plaster, timber, filtered light, clean air, and tactile surfaces that improve how a place feels.'],
  ['Living systems', 'Water, planting, shade, food, solar, ventilation, and maintenance integrated into the property plan.'],
]

const PROCESS = [
  {
    number: '01',
    title: 'Audit the opportunity',
    body: 'Review the land, property, listing, plans, climate, constraints, audience, and likely business case before spending heavily.',
  },
  {
    number: '02',
    title: 'Create the concept',
    body: 'Build one coherent direction for architecture, landscape, utilities, materials, guest experience, and 3D presentation.',
  },
  {
    number: '03',
    title: 'Assemble specialists',
    body: 'Identify the appropriate architect, engineer, fabricators, trades, suppliers, and local labor for the approved direction.',
  },
  {
    number: '04',
    title: 'Coordinate delivery',
    body: 'Track scope, bids, dependencies, procurement, design intent, progress, and handoffs while qualified professionals own regulated work.',
  },
]

const FIELD_NOTES = [
  {
    label: 'JAPANESE BIOPHILIA',
    title: 'When leaves become a source of light',
    body: 'A house can use trees, reflected light, roof form, and ventilation as active parts of the interior experience.',
  },
  {
    label: 'LIVING AIR',
    title: 'The building should breathe before it performs',
    body: 'Clean materials, humidity control, passive airflow, planting, and maintenance belong in the first concept—not the last repair.',
  },
  {
    label: 'HOSPITALITY',
    title: 'Why memorable stays are designed as systems',
    body: 'The structure, arrival, shade, water, sleep, bathing, landscape, and story must reinforce one another.',
  },
]

export default function StudioHome() {
  return (
    <div className="ia-home overflow-hidden bg-ia-cream text-ia-ink">
      <section id="studio" className="relative min-h-[100svh] bg-ia-cave text-ia-paper">
        <div
          className="ia-hero-image absolute inset-0 bg-cover"
          style={{ backgroundImage: `url(${HERO_IMAGE})`, backgroundPosition: 'center 54%' }}
          role="img"
          aria-label="Curved biophilic house surrounded by a dense forest"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,8,.18)_0%,rgba(7,12,8,.08)_30%,rgba(7,12,8,.78)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-ia-cave/70 to-transparent" />

        <div className="relative z-10 flex min-h-[100svh] flex-col justify-end px-5 pb-8 pt-28 sm:px-8 md:px-12 md:pb-12 lg:px-16 xl:px-24">
          <div className="mx-auto w-full max-w-[1540px]">
            <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.2em] text-ia-paper/[0.80]">
              Infinite Architecture — Puerto Vallarta
            </p>
            <h1 className="max-w-[12ch] font-display text-[clamp(4.35rem,12vw,12rem)] font-normal uppercase leading-[0.8] tracking-[-0.055em] text-ia-paper">
              Build places people remember.
            </h1>

            <div className="mt-7 grid gap-7 border-t border-white/30 pt-6 md:grid-cols-[minmax(0,1.5fr)_minmax(18rem,.7fr)] md:items-end">
              <p className="max-w-3xl font-editorial text-[clamp(1.35rem,2.25vw,2.4rem)] leading-[1.08] text-ia-paper">
                Biophilic concepts, 3D visualization, and coordinated delivery for Airbnbs,
                glamping retreats, and off-grid living.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
                <a
                  href="#start"
                  className="group inline-flex min-h-12 items-center justify-center gap-3 bg-ia-paper px-6 py-3 text-sm font-medium text-ia-ink transition-colors hover:bg-ia-mist"
                >
                  Start a concept
                  <ArrowUpRight
                    size={17}
                    className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
                <a
                  href="#build-types"
                  className="inline-flex min-h-12 items-center justify-center gap-3 border border-white/[0.45] px-6 py-3 text-sm font-medium text-ia-paper transition-colors hover:bg-white/10"
                >
                  Explore build types
                  <ArrowDownRight size={17} />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute right-5 top-28 z-10 hidden max-w-[12rem] border-l border-white/[0.35] pl-4 text-xs leading-relaxed text-white/[0.70] lg:block">
          Concept visualization placeholder. Inspiration credit: Hiroshi Nakamura &amp; NAP,
          House of Glittering Leaves.
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[.7fr_1.3fr] lg:items-start">
          <div className="flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
            <span className="h-px w-8 bg-ia-ink/[0.35]" />
            The studio
          </div>
          <div>
            <p className="font-editorial text-[clamp(2.2rem,5vw,5.5rem)] leading-[0.98] tracking-[-0.025em] text-ia-ink">
              One point of coordination for architecture, landscape, utilities, guest experience,
              and the people who make it real.
            </p>
            <div className="mt-10 grid gap-6 border-t border-ia-line pt-8 text-sm leading-relaxed text-ia-ink/[0.70] md:grid-cols-2">
              <p>
                Infinite Architecture turns land, listings, existing properties, and rough ideas
                into a clear concept before owners commit to disconnected purchases and crews.
              </p>
              <p>
                We coordinate the design intent and specialist team. Licensed architects,
                engineers, permit professionals, and regulated trades remain responsible for the
                work that requires their credentials.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="projects" className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-14 flex flex-col gap-6 border-b border-ia-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                Selected worlds
              </p>
              <h2 className="max-w-[12ch] font-display text-[clamp(3.2rem,7.5vw,8rem)] font-normal uppercase leading-[0.85] tracking-[-0.045em]">
                What can this property become?
              </h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-ia-ink/[0.65]">
              The images are temporary design references, not completed Infinite Architecture
              projects. They will be replaced by original concepts and verified work.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-12">
            {AUDIENCES.map((item, index) => (
              <article
                key={item.title}
                className={`group relative min-h-[30rem] overflow-hidden bg-ia-cave text-ia-paper ${
                  index === 0 || index === 3 ? 'lg:col-span-7' : 'lg:col-span-5'
                }`}
              >
                <div
                  className="absolute inset-0 bg-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  style={{ backgroundImage: `url(${item.image})`, backgroundPosition: item.position }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/[0.85] via-black/[0.15] to-black/5" />
                <div className="relative z-10 flex min-h-[30rem] flex-col justify-between p-6 md:p-8">
                  <span className="text-xs tracking-[0.18em] text-white/[0.75]">{item.index}</span>
                  <div className="max-w-xl">
                    <h3 className="font-editorial text-[clamp(2.15rem,4vw,4.25rem)] leading-[0.94]">
                      {item.title}
                    </h3>
                    <p className="mt-4 max-w-lg text-sm leading-relaxed text-white/[0.75]">{item.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ia-leaf px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-40 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <p className="mb-8 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-paper/[0.60]">
            The problem we coordinate away
          </p>
          <p className="max-w-[15ch] font-editorial text-[clamp(2.7rem,6.5vw,7.5rem)] leading-[0.93] tracking-[-0.025em]">
            Most projects are sold as separate products. A memorable place has to work as one
            living system.
          </p>
          <div className="mt-14 grid gap-px border border-white/20 bg-white/20 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ['Shelter', 'Structure, shade, rain, privacy, views, and thermal comfort.'],
              ['Life support', 'Water, power, ventilation, food, waste, and maintenance.'],
              ['Landscape', 'Slope, planting, paths, habitat, arrival, and outdoor rooms.'],
              ['Business', 'Guest experience, listing story, phasing, costs, and operations.'],
            ].map(([title, body]) => (
              <div key={title} className="bg-ia-leaf p-6 md:p-8">
                <h3 className="font-editorial text-3xl">{title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-ia-paper/[0.65]">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="build-types" className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-10 lg:grid-cols-[.7fr_1.3fr]">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                Build types
              </p>
              <h2 className="font-display text-[clamp(3.4rem,7vw,8rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
                Forms for a changing climate.
              </h2>
              <Link
                href="/build-systems"
                className="group mt-8 inline-flex items-center gap-3 border-b border-ia-ink pb-1 text-sm font-medium"
              >
                Open the build library
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="border-t border-ia-line">
              {BUILD_TYPES.map(([title, body], index) => (
                <Link
                  key={title}
                  href="/build-systems"
                  className="group grid gap-4 border-b border-ia-line py-6 transition-colors hover:bg-ia-cream md:grid-cols-[4rem_.75fr_1.25fr_auto] md:items-center md:px-4"
                >
                  <span className="text-xs tracking-[0.16em] text-ia-ink/[0.45]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="font-editorial text-[clamp(2rem,3.5vw,3.7rem)] leading-none">{title}</h3>
                  <p className="max-w-xl text-sm leading-relaxed text-ia-ink/[0.60]">{body}</p>
                  <ArrowUpRight
                    size={20}
                    className="transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="process" className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-14 grid gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                How it works
              </p>
              <h2 className="font-display text-[clamp(3.4rem,7vw,8rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
                From idea to coordinated delivery.
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-relaxed text-ia-ink/[0.65] lg:justify-self-end">
              The first paid step is a bounded site and concept audit. It creates enough clarity to
              decide whether a full concept package and coordinated build are justified.
            </p>
          </div>

          <div className="grid gap-px border border-ia-line bg-ia-line md:grid-cols-2 xl:grid-cols-4">
            {PROCESS.map((step) => (
              <article key={step.number} className="min-h-[23rem] bg-ia-paper p-7 md:p-8">
                <div className="flex h-full flex-col justify-between">
                  <span className="text-xs tracking-[0.18em] text-ia-ink/[0.45]">{step.number}</span>
                  <div>
                    <h3 className="font-editorial text-4xl leading-[0.98]">{step.title}</h3>
                    <p className="mt-5 text-sm leading-relaxed text-ia-ink/[0.60]">{step.body}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="climate" className="bg-ia-cave px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
          <div>
            <div className="mb-6 flex items-center gap-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-paper/[0.55]">
              <MapPin size={14} />
              Puerto Vallarta field context
            </div>
            <h2 className="max-w-[11ch] font-display text-[clamp(3.4rem,7vw,8rem)] font-normal uppercase leading-[0.84] tracking-[-0.05em]">
              Build for heat, rain, humidity, and change.
            </h2>
            <p className="mt-8 max-w-2xl font-editorial text-[clamp(1.45rem,2.5vw,2.4rem)] leading-[1.12] text-ia-paper/[0.80]">
              Climate is not a page added after the architecture. It is one of the materials the
              project is made from.
            </p>
          </div>

          <div className="grid gap-px border border-white/[0.15] bg-white/[0.15] sm:grid-cols-2">
            {[
              [Sun, 'Shade + heat', 'Orient openings, roofs, outdoor rooms, and planting around real solar exposure.'],
              [Droplets, 'Rain + water', 'Plan capture, overflow, drainage, storage, access, and maintenance as one system.'],
              [Wind, 'Air + humidity', 'Use cross-ventilation, stack effect, fans, materials, and mold prevention intentionally.'],
              [Leaf, 'Planting + habitat', 'Select living systems for climate, guest use, shade, food, resilience, and upkeep.'],
            ].map(([Icon, title, body]) => {
              const ClimateIcon = Icon as typeof Sun
              return (
                <article key={String(title)} className="bg-ia-cave p-6 md:p-7">
                  <ClimateIcon size={22} className="text-ia-water" />
                  <h3 className="mt-8 font-editorial text-3xl">{String(title)}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ia-paper/[0.55]">{String(body)}</p>
                </article>
              )
            })}
          </div>
        </div>
      </section>

      <section className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-12 lg:grid-cols-[.65fr_1.35fr]">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                3D concept studio
              </p>
              <Compass size={38} strokeWidth={1.25} />
            </div>
            <div>
              <h2 className="max-w-[13ch] font-editorial text-[clamp(2.7rem,6vw,6.6rem)] leading-[0.93] tracking-[-0.03em]">
                Send a plan, listing, sketch, or parcel. Receive a vision people can see before it
                exists.
              </h2>
              <div className="mt-10 grid gap-6 border-t border-ia-line pt-8 text-sm leading-relaxed text-ia-ink/[0.65] md:grid-cols-2">
                <p>
                  The concept package can include site strategy, spatial direction, exterior and
                  interior mood, 3D massing, selected renders, living-system notes, and budget
                  categories.
                </p>
                <p>
                  For real-estate agents and hospitality owners, the same work can become a
                  buyer-facing story, listing presentation, campaign page, or optional interactive
                  walkthrough.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-ia-cream px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="mb-12 flex flex-col gap-6 border-b border-ia-line pb-8 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="mb-4 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                Field notes
              </p>
              <h2 className="font-display text-[clamp(3.2rem,7vw,7.5rem)] font-normal uppercase leading-[0.85] tracking-[-0.045em]">
                Better ways to live.
              </h2>
            </div>
            <Link href="/field-notes" className="group inline-flex items-center gap-3 text-sm font-medium">
              Read the journal
              <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-px border border-ia-line bg-ia-line lg:grid-cols-3">
            {FIELD_NOTES.map((note) => (
              <Link
                key={note.title}
                href="/field-notes"
                className="group min-h-[24rem] bg-ia-paper p-7 transition-colors hover:bg-ia-mist md:p-8"
              >
                <div className="flex h-full flex-col justify-between">
                  <span className="text-[0.65rem] font-medium tracking-[0.18em] text-ia-ink/[0.45]">
                    {note.label}
                  </span>
                  <div>
                    <h3 className="font-editorial text-[clamp(2rem,3vw,3.4rem)] leading-[0.98]">
                      {note.title}
                    </h3>
                    <p className="mt-5 text-sm leading-relaxed text-ia-ink/[0.60]">{note.body}</p>
                    <ArrowUpRight
                      size={18}
                      className="mt-7 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-ia-earth px-5 py-24 text-ia-paper sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto grid max-w-[1540px] gap-12 lg:grid-cols-[.7fr_1.3fr]">
          <div className="flex items-start gap-3 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-paper/[0.60]">
            <span className="mt-2 h-px w-8 bg-ia-paper/50" />
            The coordination role
          </div>
          <div>
            <p className="font-editorial text-[clamp(2.5rem,5.5vw,6rem)] leading-[0.94] tracking-[-0.025em]">
              You should not have to become an architect, engineer, horticulturist, solar designer,
              procurement manager, and site coordinator just to create one good place.
            </p>
            <p className="mt-9 max-w-2xl text-sm leading-relaxed text-ia-paper/[0.72]">
              Infinite Architecture holds the concept and coordinates the moving pieces. The goal is
              not to replace specialists. The goal is to help the right specialists work toward the
              same property vision.
            </p>
          </div>
        </div>
      </section>

      <section id="start" className="bg-ia-paper px-5 py-24 sm:px-8 md:px-12 md:py-36 lg:px-16 xl:px-24">
        <div className="mx-auto max-w-[1540px]">
          <div className="grid gap-12 lg:grid-cols-[.72fr_1.28fr]">
            <div>
              <p className="mb-5 text-[0.68rem] font-medium uppercase tracking-[0.18em] text-ia-ink/[0.55]">
                Start a concept
              </p>
              <h2 className="font-display text-[clamp(3.6rem,8vw,8.8rem)] font-normal uppercase leading-[0.82] tracking-[-0.055em]">
                Tell us what the place should become.
              </h2>
              <div className="mt-8 flex items-center gap-3 text-sm text-ia-ink/[0.60]">
                <MapPin size={16} />
                Puerto Vallarta + selected remote collaborations
              </div>
            </div>
            <div className="border-t border-ia-line pt-8 lg:border-l lg:border-t-0 lg:pl-12 lg:pt-0">
              <ProjectIntake />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
