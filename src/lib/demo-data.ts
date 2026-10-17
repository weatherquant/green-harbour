export type Region =
  | "QLD1"
  | "NSW1"
  | "VIC1"
  | "SA1"
  | "TAS1"
  | "WA"
  | "NT";

export type Asset = {
  id: string;
  name: string;
  location: string;
  region: Region;
  powerMW: number;
  capacityMWh: number;
  value: number;
  investedCapital: number;
  ytdReturn: number;
  benchmarkReturn: number;
  underwrittenReturn: number;
  irr: number;
  revenueLTM: number;
  revenueBudget: number;
  status: "Operational" | "Construction" | "Development";
  mapX: number;
  mapY: number;
};

export type Opportunity = {
  id: string;
  name: string;
  location: string;
  region: Region;
  powerMW: number;
  capacityMWh: number;
  stage: "For Sale" | "Development" | "Construction";
  investment: number;
  indicativeIRR: number;
};

export const assets: Asset[] = [
  {
    id: "sunshine",
    name: "Sunshine BESS",
    location: "South East Queensland",
    region: "QLD1",
    powerMW: 5,
    capacityMWh: 20,
    value: 9.8,
    investedCapital: 8.2,
    ytdReturn: 18.4,
    benchmarkReturn: 11.2,
    underwrittenReturn: 15.1,
    irr: 16.7,
    revenueLTM: 1.61,
    revenueBudget: 1.42,
    status: "Operational",
    mapX: 72,
    mapY: 22,
  },
  {
    id: "western",
    name: "Western BESS",
    location: "Darling Downs",
    region: "QLD1",
    powerMW: 5,
    capacityMWh: 20,
    value: 8.4,
    investedCapital: 7.5,
    ytdReturn: 14.6,
    benchmarkReturn: 11.2,
    underwrittenReturn: 13.7,
    irr: 15.1,
    revenueLTM: 1.18,
    revenueBudget: 1.11,
    status: "Operational",
    mapX: 66,
    mapY: 29,
  },
  {
    id: "darling",
    name: "Darling BESS",
    location: "Western Sydney",
    region: "NSW1",
    powerMW: 5,
    capacityMWh: 20,
    value: 8.7,
    investedCapital: 7.6,
    ytdReturn: 15.1,
    benchmarkReturn: 11.2,
    underwrittenReturn: 13.9,
    irr: 15.4,
    revenueLTM: 1.09,
    revenueBudget: 1.01,
    status: "Operational",
    mapX: 74,
    mapY: 51,
  },
  {
    id: "murray",
    name: "Murray BESS",
    location: "Northern Victoria",
    region: "VIC1",
    powerMW: 5,
    capacityMWh: 20,
    value: 8.1,
    investedCapital: 7.4,
    ytdReturn: 12.8,
    benchmarkReturn: 11.2,
    underwrittenReturn: 12.6,
    irr: 14.2,
    revenueLTM: 0.91,
    revenueBudget: 0.89,
    status: "Operational",
    mapX: 62,
    mapY: 66,
  },
  {
    id: "limestone",
    name: "Limestone BESS",
    location: "South Australia",
    region: "SA1",
    powerMW: 5,
    capacityMWh: 20,
    value: 7.6,
    investedCapital: 7.1,
    ytdReturn: 10.3,
    benchmarkReturn: 11.2,
    underwrittenReturn: 12.1,
    irr: 12.9,
    revenueLTM: 0.61,
    revenueBudget: 0.68,
    status: "Operational",
    mapX: 42,
    mapY: 62,
  },
  {
  id: "pilbara",
  name: "Pilbara BESS",
  location: "Pilbara, Western Australia",
  region: "WA",
  powerMW: 5,
  capacityMWh: 20,
  value: 9.2,
  investedCapital: 8.1,
  ytdReturn: 16.2,
  benchmarkReturn: 11.2,
  underwrittenReturn: 14.4,
  irr: 16.0,
  revenueLTM: 1.34,
  revenueBudget: 1.21,
  status: "Operational",
  mapX: 22,
  mapY: 42,
},
{
  id: "darwin",
  name: "Darwin BESS",
  location: "Darwin, Northern Territory",
  region: "NT",
  powerMW: 5,
  capacityMWh: 20,
  value: 8.9,
  investedCapital: 7.8,
  ytdReturn: 15.6,
  benchmarkReturn: 11.2,
  underwrittenReturn: 14.0,
  irr: 15.7,
  revenueLTM: 1.27,
  revenueBudget: 1.16,
  status: "Operational",
  mapX: 48,
  mapY: 19,
},
];

export const opportunities: Opportunity[] = [
  {
    id: "riverina",
    name: "Riverina Battery",
    location: "Riverina, NSW",
    region: "NSW1",
    powerMW: 5,
    capacityMWh: 20,
    stage: "For Sale",
    investment: 9.6,
    indicativeIRR: 17.2,
  },
  {
    id: "darling-downs",
    name: "Darling Downs Storage",
    location: "Darling Downs, QLD",
    region: "QLD1",
    powerMW: 5,
    capacityMWh: 20,
    stage: "Development",
    investment: 8.8,
    indicativeIRR: 15.8,
  },
  {
    id: "hunter",
    name: "Hunter BESS",
    location: "Hunter Valley, NSW",
    region: "NSW1",
    powerMW: 5,
    capacityMWh: 20,
    stage: "Construction",
    investment: 9.1,
    indicativeIRR: 14.6,
  }, 
];

export const performance = [
  { date: "Jan", portfolio: 100.0, benchmark: 100.0, underwriting: 100.0 },
  { date: "Feb", portfolio: 101.2, benchmark: 100.8, underwriting: 101.0 },
  { date: "Mar", portfolio: 103.1, benchmark: 102.0, underwriting: 102.5 },
  { date: "Apr", portfolio: 104.0, benchmark: 103.1, underwriting: 103.6 },
  { date: "May", portfolio: 106.4, benchmark: 104.4, underwriting: 105.1 },
  { date: "Jun", portfolio: 107.8, benchmark: 105.7, underwriting: 106.5 },
  { date: "Jul", portfolio: 109.9, benchmark: 107.0, underwriting: 108.1 },
  { date: "Aug", portfolio: 111.2, benchmark: 108.1, underwriting: 109.3 },
  { date: "Sep", portfolio: 113.0, benchmark: 109.8, underwriting: 111.2 },
  { date: "Oct", portfolio: 114.8, benchmark: 111.2, underwriting: 113.1 },
]