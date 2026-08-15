"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, ChevronDown } from "lucide-react";

type Core = "EPS" | "XPS" | "Cement board" | "Fiber cement";

const CORE_DATA: Record<Core, {why:string; watch:string; ideas:string[]}> = {
  EPS: { why:"Cost-first lightweight core for rendered garden forms.", watch:"Impact, fire strategy, UV exposure and coating compatibility.", ideas:["Garden divider","Raised planter shell","Curved privacy screen"] },
  XPS: { why:"Moisture-resistant foam core with higher compressive strength than typical EPS.", watch:"Smooth skins can need manufacturer-specified preparation before coating.", ideas:["Wet-zone divider","Outdoor bench form","Planter enclosure"] },
  "Cement board": { why:"A familiar mineral-faced substrate for compatible cementitious finishes.", watch:"Heavier than foam; framing, fasteners, joints and exterior rating matter.", ideas:["Privacy wall","Outdoor kitchen surround","Utility screen"] },
  "Fiber cement": { why:"Durable thin exterior panel useful where a robust sheet material is preferred.", watch:"Cutting, edge treatment, fastening and movement joints follow the board maker's system.", ideas:["Facade screen","Garden room skin","Equipment enclosure"] },
};

const ADHESIVES = [
  {name:"SikaTack Panel", kind:"Elastic panel adhesive", use:"Large panel-to-substructure bonds where movement must be accommodated.", ideas:["Ventilated facade panel","Exterior screen panel","Panelized garden feature"], href:"https://mex.sika.com/es/construccion/adhesivos/para-paneles-de-fachadas/sikatack-panel.html", status:"Manufacturer documented"},
  {name:"Sikadur-31 Normal", kind:"Rigid 2-part structural epoxy", use:"Rigid connections between compatible construction substrates; useful at localized structural details rather than as a generic foam adhesive.", ideas:["Steel bracket to concrete","Rigid precast repair","Localized structural connection"], href:"https://mex.sika.com/es/construccion/adhesivos/estructural/sikadur-31-normal.html", status:"Manufacturer documented"},
  {name:"MAPEI Adesilex PG1 / PG2", kind:"Rigid 2-part structural epoxy", use:"Structural bonding and repair involving compatible concrete, masonry, stone and steel reinforcement applications.", ideas:["Steel plate reinforcement","Concrete element repair","Rigid masonry connection"], href:"https://www.mapei.com/mx/es-mx/productos-y-soluciones/lista-de-productos/detalles-del-producto/adesilex-pg1", status:"Manufacturer documented"},
  {name:"Foam-compatible construction adhesive", kind:"System-dependent", use:"EPS/XPS attachment only when the exact adhesive is explicitly approved for the foam, substrate and exterior assembly.", ideas:["EPS test panel","XPS mock-up","Lightweight decorative form"], href:"", status:"Product verification required"},
];

const LAYERS = [
  ["Finish", "Texture, color and weather-facing character."],
  ["Base coat", "Compatible polymer-modified cementitious skin."],
  ["AR mesh", "Alkali-resistant fiberglass reinforcement embedded in the base coat."],
  ["Panel core", "Creates surface and volume without conventional masonry mass."],
  ["Attachment", "Compatible adhesive plus specified mechanical fastening."],
  ["Frame", "Carries panel and environmental loads toward the supports."],
  ["Posts + footing", "Primary resistance to wind and overturning for a freestanding divider."],
];

export default function PanelSystemsFieldNote(){
  const [core,setCore]=useState<Core>("EPS");
  const [layer,setLayer]=useState(3);
  const info=CORE_DATA[core];
  return <main className="min-h-screen bg-ia-cream text-ia-ink">
    <header className="px-5 pb-14 pt-32 sm:px-8 md:px-12 lg:px-16 xl:px-24">
      <div className="mx-auto max-w-[1540px]">
        <Link href="/field-notes" className="inline-flex items-center gap-2 text-xs uppercase tracking-[.16em] text-ia-ink/55"><ArrowLeft size={14}/> Field Notes</Link>
        <p className="mt-12 text-[.68rem] font-semibold uppercase tracking-[.2em] text-ia-ink/50">Shelter + construction · pre-prototype</p>
        <h1 className="mt-5 max-w-[11ch] font-display text-[clamp(3.8rem,9vw,9rem)] uppercase leading-[.82] tracking-[-.055em]">Build mass without the mass.</h1>
        <p className="mt-8 max-w-2xl font-editorial text-[clamp(1.4rem,2.5vw,2.5rem)] leading-[1.06]">A visual field note on lightweight panels, reinforced mineral skins and the bonds that hold the assembly together.</p>
      </div>
    </header>

    <section className="px-5 pb-24 sm:px-8 md:px-12 lg:px-16 xl:px-24"><div className="mx-auto max-w-[1540px] border-t border-ia-line pt-8">
      <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div><p className="text-xs uppercase tracking-[.16em] text-ia-ink/45">01 · Choose the core</p><div className="mt-5 flex flex-wrap gap-2">{(Object.keys(CORE_DATA) as Core[]).map(x=><button key={x} onClick={()=>setCore(x)} aria-pressed={core===x} className={`min-h-12 border px-4 text-sm ${core===x?"bg-ia-ink text-ia-paper":"border-ia-line"}`}>{x}</button>)}</div><h2 className="mt-8 font-editorial text-4xl">{core}</h2><p className="mt-3 max-w-lg text-sm leading-relaxed text-ia-ink/65">{info.why}</p><p className="mt-5 max-w-lg border-l border-ia-line pl-4 text-sm text-ia-ink/55"><b>Watch:</b> {info.watch}</p></div>
        <div><p className="text-xs uppercase tracking-[.16em] text-ia-ink/45">Tap the assembly</p><div className="mt-5 border-t border-ia-line">{LAYERS.map((x,i)=><button key={x[0]} onClick={()=>setLayer(i)} className="grid w-full grid-cols-[3rem_1fr_auto] items-center border-b border-ia-line py-4 text-left"><span className="text-xs text-ia-ink/35">0{i+1}</span><span className="font-editorial text-2xl">{i===3?core:x[0]}</span><ChevronDown size={16} className={layer===i?"rotate-180":""}/>{layer===i&&<span className="col-start-2 mt-2 max-w-xl text-sm leading-relaxed text-ia-ink/60">{x[1]}</span>}</button>)}</div></div>
      </div>
    </div></section>

    <section className="bg-ia-leaf px-5 py-20 text-ia-paper sm:px-8 md:px-12 lg:px-16 xl:px-24"><div className="mx-auto max-w-[1540px]">
      <p className="text-xs uppercase tracking-[.16em] text-ia-paper/50">02 · What could this become?</p><h2 className="mt-4 max-w-[10ch] font-display text-[clamp(3.2rem,7vw,7rem)] uppercase leading-[.85]">Start with a form.</h2><div className="mt-10 grid gap-px bg-white/20 md:grid-cols-3">{info.ideas.map((idea,i)=><article key={idea} className="min-h-52 bg-ia-leaf p-6"><span className="text-xs text-ia-paper/40">0{i+1}</span><h3 className="mt-16 font-editorial text-3xl">{idea}</h3><p className="mt-2 text-xs text-ia-paper/50">Concept use · not an engineered specification</p></article>)}</div>
    </div></section>

    <section className="px-5 py-24 sm:px-8 md:px-12 lg:px-16 xl:px-24"><div className="mx-auto max-w-[1540px]">
      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]"><div><p className="text-xs uppercase tracking-[.16em] text-ia-ink/45">03 · Adhesives</p><h2 className="mt-4 max-w-[9ch] font-editorial text-[clamp(3rem,6vw,6rem)] leading-[.92]">Strong is not one thing.</h2><p className="mt-5 max-w-md text-sm leading-relaxed text-ia-ink/60">Choose the bond by what must move, what must stay rigid, and what the manufacturer documents for the actual substrates.</p></div><div className="border-t border-ia-line">{ADHESIVES.map(a=><details key={a.name} className="group border-b border-ia-line py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4"><div><span className="text-[.62rem] uppercase tracking-[.14em] text-ia-ink/40">{a.kind}</span><h3 className="mt-1 font-editorial text-3xl">{a.name}</h3></div><ChevronDown className="group-open:rotate-180"/></summary><div className="mt-5 grid gap-5 md:grid-cols-2"><div><p className="text-sm leading-relaxed text-ia-ink/65">{a.use}</p><p className="mt-3 text-xs uppercase tracking-[.12em] text-ia-ink/40">{a.status}</p>{a.href&&<a href={a.href} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4">Manufacturer source <ArrowUpRight size={14}/></a>}</div><div><p className="text-xs uppercase tracking-[.14em] text-ia-ink/40">Example forms</p><ul className="mt-3 space-y-2 text-sm">{a.ideas.map(x=><li key={x}>— {x}</li>)}</ul></div></div></details>)}</div></div>
    </div></section>

    <section className="bg-ia-paper px-5 py-20 sm:px-8 md:px-12 lg:px-16 xl:px-24"><div className="mx-auto max-w-[1540px] grid gap-8 lg:grid-cols-2"><h2 className="max-w-[11ch] font-editorial text-[clamp(2.8rem,5vw,5.5rem)] leading-[.92]">The frame carries the wall. The skin makes it feel solid.</h2><div className="max-w-xl text-sm leading-relaxed text-ia-ink/65"><p>This is research, not a construction approval. Freestanding walls require project-specific consideration of height, wind, soil, footing, fire, moisture, fasteners and local requirements.</p><p className="mt-5"><b>Evidence state:</b> panel concept researched; complete EPS/XPS assembly not yet verified as a finished system.</p></div></div></section>
  </main>;
}
