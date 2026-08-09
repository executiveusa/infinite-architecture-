export type EvidenceStatus =
  "Conceptual" | "Scenario estimate" | "Local estimate" | "Verified quote";

export type Hotspot = {
  id: string;
  label: string;
  x: number;
  y: number;
  summary: string;
  independence: string;
  cost: string;
  maintenance: string;
  professional: string;
  status: EvidenceStatus;
};

export type Concept = {
  slug: string;
  name: string;
  number: string;
  premise: string;
  scale: string;
  use: string;
  image: string;
  alt: string;
  investment: string;
  gridTarget: string;
  shelter: string;
  description: string;
  hotspots: Hotspot[];
};

export const SHARED_HOTSPOTS: Record<string, Omit<Hotspot, "x" | "y">> = {
  solar: {
    id: "solar",
    label: "Solar array",
    summary:
      "Photovoltaic panels turn sunlight into electricity for planned household and guest loads.",
    independence:
      "Reduces utility purchases while a grid or generator connection can remain as defined backup.",
    cost: "Upfront system cost rises with array, inverter and battery size; payback depends on real loads and tariffs.",
    maintenance:
      "Keep panels clear, inspect wiring and plan for inverter and battery replacement.",
    professional:
      "A qualified electrical designer and installer must size, protect and commission the system.",
    status: "Conceptual",
  },
  water: {
    id: "water",
    label: "Rainwater capture",
    summary:
      "Roof catchment, gutters and a first-flush route move seasonal rain toward protected storage.",
    independence:
      "Can reduce purchased or trucked water, but storage, treatment and a dry-season backup still matter.",
    cost: "Roof area, rainfall, tank size, excavation and treatment determine the installed cost.",
    maintenance:
      "Clean roof and gutters, service first-flush devices, inspect tanks and test treated water.",
    professional:
      "Local plumbing, potable-water and drainage requirements must be verified for the site.",
    status: "Conceptual",
  },
  shade: {
    id: "shade",
    label: "Passive shade + ventilation",
    summary:
      "Orientation, deep overhangs and cross-ventilation reduce heat before mechanical cooling is added.",
    independence:
      "Lower cooling loads make a smaller energy system more realistic and preserve comfort during outages.",
    cost: "Often shifts budget into better orientation, roof geometry, openings and exterior shade rather than equipment.",
    maintenance:
      "Keep air paths clear and maintain fans, screens, shutters and exterior shading elements.",
    professional:
      "Comfort performance must be checked against site orientation, wind, humidity and enclosure design.",
    status: "Conceptual",
  },
  foodscape: {
    id: "foodscape",
    label: "Layered foodscape",
    summary:
      "Fruit trees, support species, shrubs, herbs, roots, climbers and groundcovers occupy different layers and times.",
    independence:
      "Builds partial food production, shade, biomass and habitat; it does not imply complete food independence.",
    cost: "Phased planting can begin small, but irrigation establishment, soil work and ongoing skilled management need budgets.",
    maintenance:
      "Successional systems require observation, pruning, chop-and-drop biomass and seasonal replanting.",
    professional:
      "Use locally experienced agroforestry and landscape practitioners; verify species and water requirements.",
    status: "Conceptual",
  },
  wastewater: {
    id: "wastewater",
    label: "Wastewater strategy",
    summary:
      "A site-appropriate septic, biodigester or treatment-and-reuse path is reserved before the layout is fixed.",
    independence:
      "Separates wastewater planning from municipal sewer assumptions while retaining safe service access.",
    cost: "Soils, slope, occupancy, discharge rules and treatment level can materially change capital cost.",
    maintenance:
      "Inspection, desludging, pumps and treatment components require an explicit operating plan.",
    professional:
      "Design, permits and discharge or reuse approval belong to qualified local specialists and authorities.",
    status: "Conceptual",
  },
  storage: {
    id: "storage",
    label: "Storage + critical loads",
    summary:
      "Battery and utility space protects essential loads such as refrigeration, communications, pumps and lighting.",
    independence:
      "Keeps selected services operating when the grid is unavailable rather than promising unlimited autonomy.",
    cost: "More backup duration means more batteries, enclosure, controls and eventual replacement cost.",
    maintenance:
      "Monitor state of health, temperature and alerts; keep equipment dry, ventilated and serviceable.",
    professional:
      "Electrical, ventilation, fire and manufacturer requirements must be designed and inspected.",
    status: "Conceptual",
  },
};

const pin = (
  id: keyof typeof SHARED_HOTSPOTS,
  x: number,
  y: number,
): Hotspot => ({
  ...SHARED_HOTSPOTS[id],
  x,
  y,
});

export const CONCEPTS: Concept[] = [
  {
    slug: "casa-semilla",
    name: "Casa Semilla",
    number: "01",
    premise:
      "Start small. Plan the systems once. Expand when demand is proven.",
    scale: "35–55 m² · one guest stay",
    use: "Starter rental or compact residence",
    image: "/images/concepts/casa-semilla.webp",
    alt: "AI-generated concept of a compact tropical cabin with solar panels, rainwater collection and layered foodscape",
    investment: "Modeled after site + scope review",
    gridTarget: "Reduced dependence with defined backup",
    shelter: "Panelized or lightweight hybrid shell",
    description:
      "A phased entry concept for an owner who wants one memorable unit before committing the whole property.",
    hotspots: [
      pin("solar", 55, 27),
      pin("water", 68, 61),
      pin("shade", 31, 48),
      pin("foodscape", 83, 74),
      pin("wastewater", 91, 49),
    ],
  },
  {
    slug: "agua-alta",
    name: "Agua Alta",
    number: "02",
    premise:
      "Make shade, water and slope part of the architecture—not late-stage fixes.",
    scale: "70–110 m² · premium one-unit stay",
    use: "Hillside residence or premium rental",
    image: "/images/concepts/agua-alta.webp",
    alt: "AI-generated hillside concept with solar roof, rainwater cistern, drainage and productive tropical planting",
    investment: "Modeled after site + scope review",
    gridTarget: "High resilience with utility or generator backup",
    shelter: "Engineered curved or lightweight hybrid shell",
    description:
      "A higher-value hillside concept organized around rain, erosion, passive comfort and a strong guest view.",
    hotspots: [
      pin("solar", 60, 25),
      pin("water", 13, 70),
      pin("shade", 43, 44),
      pin("foodscape", 74, 73),
      pin("storage", 91, 42),
      pin("wastewater", 88, 62),
    ],
  },
  {
    slug: "bosque-vivo",
    name: "Bosque Vivo",
    number: "03",
    premise:
      "Let shared infrastructure and a productive landscape connect every stay.",
    scale: "4–6 units · shared hospitality systems",
    use: "Nature-stay cluster or retreat",
    image: "/images/concepts/bosque-vivo.webp",
    alt: "AI-generated nature-stay cluster with shared solar canopy, water storage and productive food forest",
    investment: "Modeled after site + scope review",
    gridTarget: "Shared resilient systems with planned backup",
    shelter: "Mixed compact cabins + shared pavilion",
    description:
      "A phased hospitality cluster where shared utilities, foodscape and guest experience form one property system.",
    hotspots: [
      pin("solar", 45, 37),
      pin("water", 49, 55),
      pin("shade", 72, 43),
      pin("foodscape", 61, 70),
      pin("storage", 58, 47),
      pin("wastewater", 81, 77),
    ],
  },
];

export const getConcept = (slug: string) =>
  CONCEPTS.find((concept) => concept.slug === slug);

export const COMPARISON_ROWS = [
  [
    "Electricity",
    "Utility connection and monthly dependence",
    "Efficiency first, solar, storage and defined backup",
  ],
  [
    "Water",
    "Municipal or trucked supply as the default",
    "Capture, storage, treatment and backup supply",
  ],
  [
    "Cooling",
    "Mechanical cooling sized after the form is fixed",
    "Orientation, shade and ventilation reduce the load first",
  ],
  [
    "Wastewater",
    "Standard solution selected late",
    "Site-appropriate path reserved before layout is fixed",
  ],
  [
    "Landscape",
    "Decorative planting that consumes inputs",
    "Productive layers that provide food, shade and biomass",
  ],
  [
    "Food",
    "Fully externally supplied",
    "Partial on-site production with realistic expectations",
  ],
  [
    "Expansion",
    "Utilities redesigned when the property grows",
    "Capacity and service routes planned for phases",
  ],
  [
    "Resilience",
    "Single-source dependence",
    "Multiple systems with explicit maintenance and backup",
  ],
  [
    "Ten-year cost",
    "Build cost plus recurring utilities",
    "Capital systems plus modeled operating and replacement cost",
  ],
];
