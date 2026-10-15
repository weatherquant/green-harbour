export type Region = "QLD1" | "NSW1" | "VIC1" | "SA1";

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
  irr: number;
  revenueLTM: number;
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
    irr: 16.7,
    revenueLTM: 1.61,
    status: "Operational",
    mapX: 70,
    mapY: 24,
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
    irr: 15.1,
    revenueLTM: 1.18,
    status: "Operational",
    mapX: 65,
    mapY: 31,
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
    irr: 15.4,
    revenueLTM: 1.09,
    status: "Operational",
    mapX: 72,
    mapY: 54,
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
    irr: 14.2,
    revenueLTM: 0.91,
    status: "Operational",
    mapX: 61,
    mapY: 69,
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
    irr: 12.9,
    revenueLTM: 0.61,
    status: "Operational",
    mapX: 43,
    mapY: 65,
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
    investment: 13.0,
    indicativeIRR: 14.6,
  },
];

export const performance = [
  { date: "Jan", portfolio: 100.0, benchmark: 100.0 },
  { date: "Feb", portfolio: 101.2, benchmark: 100.8 },
  { date: "Mar", portfolio: 103.1, benchmark: 102.0 },
  { date: "Apr", portfolio: 104.0, benchmark: 103.1 },
  { date: "May", portfolio: 106.4, benchmark: 104.4 },
  { date: "Jun", portfolio: 107.8, benchmark: 105.7 },
  { date: "Jul", portfolio: 109.9, benchmark: 107.0 },
  { date: "Aug", portfolio: 111.2, benchmark: 108.1 },
  { date: "Sep", portfolio: 113.0, benchmark: 109.8 },
  { date: "Oct", portfolio: 114.8, benchmark: 111.2 },
];