"use client";

import Link from "next/link";
import australiaMap from "@/data/australia-map.json";
import { assets } from "@/lib/demo-data";

type PortfolioPoint = {
  id: string;
  lon: number;
  lat: number;
};

const points: PortfolioPoint[] = [
  { id: "pilbara", lon: 118.6, lat: -20.8 },
  { id: "darwin", lon: 130.85, lat: -12.46 },
  { id: "sunshine", lon: 153.05, lat: -27.47 },
  { id: "western", lon: 151.3, lat: -27.55 },
  { id: "darling", lon: 150.85, lat: -33.8 },
  { id: "murray", lon: 145.4, lat: -36.3 },
  { id: "limestone", lon: 140.75, lat: -37.4 },
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

export default function NemMap() {
  return (
    <div className="nem-map relative h-full min-h-[470px] overflow-hidden">
      {/* Heading */}
      <div className="absolute left-7 top-7 z-20">
        <p className="eyebrow">PORTFOLIO FOOTPRINT</p>

        <h2 className="mt-2 text-lg font-medium tracking-[-0.02em]">
          Australian Battery Portfolio
        </h2>
      </div>

      {/* Map */}
      <div className="absolute inset-x-[5%] bottom-[9%] top-[18%]">
        <div className="relative h-full w-full">
          <svg
            viewBox="0 0 900 620"
            preserveAspectRatio="xMidYMid meet"
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="Green Harbour Energy Australian battery portfolio"
          >
            {/* Geography */}
            {australiaMap.map((state) => (
              <path
                key={state.code}
                d={state.path ?? ""}
                fill="#eef1ed"
                stroke="#bdc8c0"
                strokeWidth="1.1"
                strokeLinejoin="round"
                vectorEffect="non-scaling-stroke"
              />
            ))}

            {/* Asset markers */}
            {points.map((point) => {
              const asset = assets.find(
                (item) => item.id === point.id
              );

              if (!asset) return null;

              const { x, y } = project(point.lon, point.lat);

              return (
                <Link
                  key={point.id}
                  href={`/assets/${point.id}`}
                >
                  <g className="cursor-pointer">
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
                      opacity="0.10"
                    />

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
                  </g>
                </Link>
              );
            })}
          </svg>

          {/* Hover cards */}
          {points.map((point) => {
            const asset = assets.find(
              (item) => item.id === point.id
            );

            if (!asset) return null;

            const { x, y } = project(point.lon, point.lat);
            const openLeft = x > 610;

            return (
              <Link
                key={`hover-${point.id}`}
                href={`/assets/${point.id}`}
                className="group absolute z-20 -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${(x / 900) * 100}%`,
                  top: `${(y / 620) * 100}%`,
                }}
              >
                <span className="block h-8 w-8 rounded-full" />

                <span
                  className={[
                    "pointer-events-none absolute top-1/2 w-[205px]",
                    "-translate-y-1/2 rounded-xl",
                    "border border-[#d8ded9] bg-white/95 p-4",
                    "opacity-0 shadow-[0_12px_35px_rgba(20,40,30,0.12)]",
                    "backdrop-blur-md transition-all duration-200",
                    "group-hover:opacity-100",
                    openLeft
                      ? "right-8 group-hover:-translate-x-1"
                      : "left-8 group-hover:translate-x-1",
                  ].join(" ")}
                >
                  <span className="block text-[8px] font-semibold tracking-[0.14em] text-[#176044]">
                    OPERATING ASSET
                  </span>

                  <span className="mt-2 block text-[13px] font-semibold text-[#171a17]">
                    {asset.name}
                  </span>

                  <span className="mt-1 block text-[9px] text-[#747d76]">
                    {asset.location}
                  </span>

                  <span className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-[#e3e7e3] pt-3">
                    <span>
                      <span className="block text-[7px] tracking-[0.12em] text-[#899089]">
                        SIZE
                      </span>

                      <span className="mt-1 block text-[11px] text-[#171b17]">
                        {asset.powerMW} MW
                      </span>
                    </span>

                    <span>
                      <span className="block text-[7px] tracking-[0.12em] text-[#899089]">
                        STORAGE
                      </span>

                      <span className="mt-1 block text-[11px] text-[#171b17]">
                        {asset.capacityMWh} MWh
                      </span>
                    </span>

                    <span>
                      <span className="block text-[7px] tracking-[0.12em] text-[#899089]">
                        VALUE
                      </span>

                      <span className="mt-1 block text-[11px] text-[#171b17]">
                        ${asset.value}m
                      </span>
                    </span>

                    <span>
                      <span className="block text-[7px] tracking-[0.12em] text-[#899089]">
                        YTD RETURN
                      </span>

                      <span className="mt-1 block text-[11px] text-[#176044]">
                        {asset.ytdReturn.toFixed(1)}%
                      </span>
                    </span>
                  </span>

                  <span className="mt-3 block text-[8px] font-semibold tracking-[0.1em] text-[#176044]">
                    VIEW INVESTMENT →
                  </span>
                </span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 left-7 text-[8px] tracking-[0.14em] text-muted">
        {assets.length} OWNED ASSETS · 35 MW · 140 MWH
      </div>
    </div>
  );
}