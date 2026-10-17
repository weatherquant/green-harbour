"use client";

import { assets } from "@/lib/demo-data";

export default function NemMap() {
  return (
    <div className="nem-map">
      <div className="absolute left-7 top-7 z-20">
        <p className="eyebrow">PORTFOLIO FOOTPRINT</p>

        <h2 className="mt-2 text-lg font-medium tracking-[-0.02em]">
          National Electricity Market
        </h2>
      </div>

      <div className="absolute inset-x-[8%] bottom-[8%] top-[18%]">
        <svg
          viewBox="0 0 500 600"
          className="absolute inset-0 h-full w-full"
          aria-label="Stylised map of the Australian National Electricity Market"
        >
          {/* Queensland */}
          <path
            d="M280 35
               L355 62
               L395 118
               L382 190
               L347 246
               L274 240
               L264 158
               Z"
            className="map-land"
          />

          {/* New South Wales */}
          <path
            d="M274 240
               L347 246
               L385 294
               L365 362
               L283 371
               L252 322
               Z"
            className="map-land"
          />

          {/* Victoria */}
          <path
            d="M283 371
               L365 362
               L349 419
               L306 448
               L255 416
               Z"
            className="map-land"
          />

          {/* South Australia */}
          <path
            d="M171 276
               L252 322
               L283 371
               L255 416
               L184 397
               L149 347
               Z"
            className="map-land"
          />

          {/* Tasmania */}
          <path
            d="M296 486
               L337 478
               L353 513
               L326 548
               L294 529
               Z"
            className="map-land"
          />

          <text x="310" y="150" className="fill-[var(--muted)] text-[12px]">
            QLD
          </text>

          <text x="315" y="310" className="fill-[var(--muted)] text-[12px]">
            NSW
          </text>

          <text x="299" y="407" className="fill-[var(--muted)] text-[12px]">
            VIC
          </text>

          <text x="191" y="351" className="fill-[var(--muted)] text-[12px]">
            SA
          </text>

          <text x="315" y="518" className="fill-[var(--muted)] text-[12px]">
            TAS
          </text>
        </svg>

        {assets.map((asset) => (
          <button
            key={asset.id}
            className="asset-marker group"
            style={{
              left: `${asset.mapX}%`,
              top: `${asset.mapY}%`,
            }}
            aria-label={asset.name}
          >
            <span className="asset-marker-ring" />
            <span className="asset-marker-dot" />

            <span className="map-tooltip pointer-events-none absolute left-5 top-1/2 z-30 w-52 -translate-y-1/2 opacity-0 transition-all duration-200 group-hover:translate-x-1 group-hover:opacity-100">
              <span className="block text-left">
                <span className="block text-[8px] tracking-[0.16em] text-muted">
                  {asset.region}
                </span>

                <span className="mt-1 block text-sm font-medium">
                  {asset.name}
                </span>

                <span className="mt-4 grid grid-cols-2 gap-3">
                  <span>
                    <span className="metric-label block">SIZE</span>
                    <span className="mt-1 block text-[11px]">
                      {asset.powerMW} MW
                    </span>
                  </span>

                  <span>
                    <span className="metric-label block">STORAGE</span>
                    <span className="mt-1 block text-[11px]">
                      {asset.capacityMWh} MWh
                    </span>
                  </span>

                  <span>
                    <span className="metric-label block">VALUE</span>
                    <span className="mt-1 block text-[11px]">
                      ${asset.value}m
                    </span>
                  </span>

                  <span>
                    <span className="metric-label block">YTD RETURN</span>
                    <span className="mt-1 block text-[11px]">
                      {asset.ytdReturn.toFixed(1)}%
                    </span>
                  </span>
                </span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="absolute bottom-6 left-7 text-[8px] tracking-[0.14em] text-muted">
        OWNED ASSETS · DEMONSTRATION LOCATIONS
      </div>
    </div>
  );
}