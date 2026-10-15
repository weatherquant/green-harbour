"use client";

import { assets } from "@/lib/demo-data";

export default function NemMap() {
  return (
    <div className="relative h-[430px] overflow-hidden rounded-3xl border border-white/10 bg-[#080808]">
      <div className="absolute left-6 top-6 z-10">
        <p className="eyebrow">PORTFOLIO FOOTPRINT</p>
        <h3 className="mt-2 text-xl font-medium">Australian NEM</h3>
      </div>

      <div className="absolute inset-x-[12%] bottom-[7%] top-[16%]">
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-0 h-full w-full"
          preserveAspectRatio="none"
        >
          <path
            d="M64 5
               C73 11 78 21 76 31
               C75 39 80 47 78 57
               C76 66 69 75 62 82
               C56 88 48 91 39 87
               C31 83 28 76 27 69
               C34 68 40 65 45 61
               C51 55 54 47 55 38
               C56 27 58 15 64 5Z"
            fill="rgba(255,255,255,0.025)"
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.7"
          />

          <path
            d="M55 38 C62 39 69 39 76 36"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />

          <path
            d="M45 61 C55 62 66 61 78 57"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />

          <path
            d="M39 87 C43 78 45 69 45 61"
            fill="none"
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="0.5"
          />
        </svg>

        {assets.map((asset) => (
          <div
            key={asset.id}
            className="group absolute"
            style={{
              left: `${asset.mapX}%`,
              top: `${asset.mapY}%`,
            }}
          >
            <div className="relative">
              <div className="absolute -inset-3 animate-pulse rounded-full bg-white/10" />
              <div className="relative h-3 w-3 rounded-full border border-black bg-white" />

              <div className="pointer-events-none absolute left-5 top-1/2 w-max -translate-y-1/2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <div className="rounded-xl border border-white/10 bg-black/90 px-3 py-2 backdrop-blur">
                  <p className="text-xs font-medium text-white">
                    {asset.name}
                  </p>
                  <p className="mt-1 text-[10px] text-neutral-500">
                    {asset.powerMW} MW / {asset.capacityMWh} MWh
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-5 left-6 flex gap-6 text-[10px] uppercase tracking-[0.18em] text-neutral-600">
        <span>QLD</span>
        <span>NSW</span>
        <span>VIC</span>
        <span>SA</span>
      </div>
    </div>
  );
}