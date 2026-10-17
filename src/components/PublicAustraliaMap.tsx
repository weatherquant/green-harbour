"use client";

import Link from "next/link";
import australiaMap from "@/data/australia-map.json";
import { assets, opportunities } from "@/lib/demo-data";

type MapPoint = {
  id: string;
  name: string;
  location: string;
  lon: number;
  lat: number;
  type: "asset" | "opportunity";
  status: string;
  href?: string;
  powerMW: number;
  capacityMWh: number;
  labelDx?: number;
  labelDy?: number;
  anchor?: "start" | "end";
};

/*
 * Approximate presentation coordinates.
 * Replace with exact project coordinates when available.
 */
const points: MapPoint[] = [
  {
    id: "pilbara",
    name: "Pilbara BESS",
    location: "Pilbara, WA",
    lon: 118.6,
    lat: -20.8,
    type: "asset",
    status: "Operating",
    href: "/assets/pilbara",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: 12,
    labelDy: -8,
    anchor: "start",
  },
  {
    id: "darwin",
    name: "Darwin BESS",
    location: "Darwin, NT",
    lon: 130.85,
    lat: -12.46,
    type: "asset",
    status: "Operating",
    href: "/assets/darwin",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: 12,
    labelDy: 2,
    anchor: "start",
  },
  {
    id: "sunshine",
    name: "Sunshine BESS",
    location: "South East Queensland",
    lon: 153.05,
    lat: -27.47,
    type: "asset",
    status: "Operating",
    href: "/assets/sunshine",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: -10,
    anchor: "end",
  },
  {
    id: "western",
    name: "Western BESS",
    location: "Darling Downs, QLD",
    lon: 151.3,
    lat: -27.55,
    type: "asset",
    status: "Operating",
    href: "/assets/western",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: 14,
    anchor: "end",
  },
  {
    id: "darling",
    name: "Darling BESS",
    location: "Western Sydney, NSW",
    lon: 150.85,
    lat: -33.8,
    type: "asset",
    status: "Operating",
    href: "/assets/darling",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: 15,
    anchor: "end",
  },
  {
    id: "murray",
    name: "Murray BESS",
    location: "Northern Victoria",
    lon: 145.4,
    lat: -36.3,
    type: "asset",
    status: "Operating",
    href: "/assets/murray",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: 15,
    anchor: "end",
  },
  {
    id: "limestone",
    name: "Limestone BESS",
    location: "South Australia",
    lon: 140.75,
    lat: -37.4,
    type: "asset",
    status: "Operating",
    href: "/assets/limestone",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: 15,
    anchor: "end",
  },

  // Opportunities
  {
    id: "riverina",
    name: "Riverina",
    location: "Riverina, NSW",
    lon: 146.4,
    lat: -34.8,
    type: "opportunity",
    status: "For Sale",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: 12,
    labelDy: -8,
    anchor: "start",
  },
  {
    id: "darling-downs-storage",
    name: "Darling Downs",
    location: "Darling Downs, QLD",
    lon: 150.4,
    lat: -27.8,
    type: "opportunity",
    status: "Development",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: -12,
    labelDy: 29,
    anchor: "end",
  },
  {
    id: "hunter",
    name: "Hunter",
    location: "Hunter Valley, NSW",
    lon: 151.2,
    lat: -32.7,
    type: "opportunity",
    status: "Construction",
    powerMW: 5,
    capacityMWh: 20,
    labelDx: 12,
    labelDy: -10,
    anchor: "start",
  },
];

const GEO = {
  minLon: 112,
  maxLon: 154,
  minLat: -44.5,
  maxLat: -9.5,
};

const SVG = {
  left: 55,
  right: 845,
  top: 35,
  bottom: 580,
};

const LONGITUDE_SCALE = 0.88;

function project(lon: number, lat: number) {
  const rawX =
    SVG.left +
    ((lon - GEO.minLon) / (GEO.maxLon - GEO.minLon)) *
      (SVG.right - SVG.left);

  const centreX = (SVG.left + SVG.right) / 2;

  const x =
    centreX + (rawX - centreX) * LONGITUDE_SCALE;

  const y =
    SVG.top +
    ((GEO.maxLat - lat) / (GEO.maxLat - GEO.minLat)) *
      (SVG.bottom - SVG.top);

  return { x, y };
}

export default function PublicAustraliaMap() {
  return (
    <div className="relative h-[610px] w-full">
      <svg
        viewBox="0 0 900 620"
        className="absolute inset-0 h-full w-full"
        role="img"
        aria-label="Green Harbour Energy Australian investment footprint"
      >
        {/* Geography */}
        {australiaMap.map((state) => (
          <path
            key={state.code}
            d={state.path ?? ""}
            fill="#dfe7e1"
            stroke="#aebdb3"
            strokeWidth="1.15"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        ))}

        {/* Portfolio + opportunity markers */}
        {points.map((point) => {
          const { x, y } = project(point.lon, point.lat);
          const operating = point.type === "asset";

          const marker = (
            <g className="group cursor-pointer">
              <circle
                cx={x}
                cy={y}
                r="14"
                fill="transparent"
              />

              <circle
                cx={x}
                cy={y}
                r="9"
                fill="#176044"
                opacity={operating ? "0.10" : "0.06"}
              />

              {operating ? (
                <>
                  <circle
                    cx={x}
                    cy={y}
                    r="6"
                    fill="#ffffff"
                  />
                  <circle
                    cx={x}
                    cy={y}
                    r="4"
                    fill="#176044"
                  />
                </>
              ) : (
                <circle
                  cx={x}
                  cy={y}
                  r="5"
                  fill="#f7f7f2"
                  stroke="#176044"
                  strokeWidth="2"
                />
              )}

              {/* Permanent asset/opportunity label */}
              <text
                x={x + (point.labelDx ?? 12)}
                y={y + (point.labelDy ?? -8)}
                textAnchor={point.anchor ?? "start"}
                fill={operating ? "#29473a" : "#64756b"}
                fontSize="9"
                fontWeight={operating ? "600" : "500"}
                letterSpacing="0.4"
              >
                {point.name}
              </text>
            </g>
          );

          if (point.href) {
            return (
              <Link key={point.id} href={point.href}>
                {marker}
              </Link>
            );
          }

          return <g key={point.id}>{marker}</g>;
        })}
      </svg>

      {/* Hover cards */}
      {points.map((point) => {
        const { x, y } = project(point.lon, point.lat);
        const openLeft = x > 610;

        const card = (
          <>
            <span className="block h-8 w-8 rounded-full" />

            <span
              className={[
                "pointer-events-none absolute top-1/2 w-[195px]",
                "-translate-y-1/2 rounded-xl",
                "border border-[#d8ded9] bg-[#fafbf8]/95 p-4",
                "opacity-0 shadow-[0_12px_35px_rgba(20,40,30,0.12)]",
                "backdrop-blur-md transition-all duration-200",
                "group-hover:opacity-100",
                openLeft
                  ? "right-8 group-hover:-translate-x-1"
                  : "left-8 group-hover:translate-x-1",
              ].join(" ")}
            >
              <span className="block text-[8px] font-semibold tracking-[0.14em] text-[#176044]">
                {point.type === "asset"
                  ? "OPERATING ASSET"
                  : "OPPORTUNITY"}
              </span>

              <span className="mt-2 block text-[13px] font-semibold text-[#171a17]">
                {point.name}
              </span>

              <span className="mt-1 block text-[9px] text-[#747d76]">
                {point.location}
              </span>

              <span className="mt-3 block border-t border-[#e3e7e3] pt-3 text-[10px] text-[#515a53]">
                {point.powerMW} MW · {point.capacityMWh} MWh
              </span>

              <span className="mt-2 block text-[9px] text-[#747d76]">
                {point.status}
              </span>

              {point.type === "asset" && (
                <span className="mt-3 block text-[8px] font-semibold tracking-[0.1em] text-[#176044]">
                  VIEW INVESTMENT →
                </span>
              )}
            </span>
          </>
        );

        const style = {
          left: `${(x / 900) * 100}%`,
          top: `${(y / 620) * 100}%`,
        };

        if (point.href) {
          return (
            <Link
              key={`hover-${point.id}`}
              href={point.href}
              className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
              style={style}
            >
              {card}
            </Link>
          );
        }

        return (
          <div
            key={`hover-${point.id}`}
            className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
            style={style}
          >
            {card}
          </div>
        );
      })}

      {/* Legend */}
      <div className="absolute bottom-0 left-1/2 flex -translate-x-1/2 items-center gap-7 whitespace-nowrap text-[8px] tracking-[0.12em] text-[#737e76]">
        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[#176044]" />
          OPERATING ASSET
        </span>

        <span className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full border-[1.5px] border-[#176044] bg-[#f7f7f2]" />
          OPPORTUNITY
        </span>
      </div>
    </div>
  );
}