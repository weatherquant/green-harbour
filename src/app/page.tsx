"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  BatteryCharging,
  ChevronRight,
  Circle,
  MapPin,
} from "lucide-react";

import NemMap from "@/components/NemMap";
import PerformanceChart from "@/components/PerformanceChart";
import { assets, opportunities } from "@/lib/demo-data";

const periods = ["1D", "1M", "QTR", "YTD", "1Y", "ALL"];

export default function Home() {
  const [period, setPeriod] = useState("YTD");

  const nav = assets.reduce(
    (sum, asset) => sum + asset.value,
    0
  );

  const totalMW = assets.reduce(
    (sum, asset) => sum + asset.powerMW,
    0
  );

  const totalMWh = assets.reduce(
    (sum, asset) => sum + asset.capacityMWh,
    0
  );

  const revenue = assets.reduce(
    (sum, asset) => sum + asset.revenueLTM,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-6 lg:px-10">
          <div>
            <div className="text-sm font-semibold tracking-[0.22em]">
              GREEN HARBOUR
            </div>
            <div className="mt-1 text-[9px] tracking-[0.28em] text-neutral-600">
              ENERGY
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-xs text-neutral-500 md:flex">
            <button className="text-white">Portfolio</button>
            <button>Assets</button>
            <button>Opportunities</button>
            <button>Market</button>
          </nav>

          <div className="flex items-center gap-2 text-[10px] tracking-[0.16em] text-neutral-500">
            <Circle className="h-2 w-2 fill-white text-white" />
            DEMO
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">
        <section className="mb-14">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <p className="eyebrow">AUSTRALIAN BATTERY INFRASTRUCTURE</p>

              <h1 className="mt-5 max-w-4xl text-4xl font-medium tracking-[-0.04em] md:text-6xl">
                Portfolio
                <span className="text-neutral-600"> performance.</span>
              </h1>
            </div>

            <div className="text-left lg:text-right">
              <p className="text-xs text-neutral-600">PORTFOLIO NAV</p>
              <p className="mt-2 text-3xl font-medium">
                ${nav.toFixed(1)}m
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-px overflow-hidden rounded-3xl border border-white/10 bg-white/10 lg:grid-cols-[0.72fr_1.28fr]">
          <div className="bg-[#070707] p-7 md:p-9">
            <p className="eyebrow">YTD RETURN</p>

            <div className="mt-6 flex items-start gap-3">
              <span className="text-6xl font-medium tracking-[-0.06em] md:text-7xl">
                14.8
              </span>
              <span className="mt-2 text-xl text-neutral-500">%</span>
            </div>

            <div className="mt-8 border-t border-white/10 pt-6">
              <div className="flex justify-between">
                <span className="metric-label">Benchmark</span>
                <span className="text-sm">11.2%</span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="metric-label">Alpha</span>
                <span className="text-sm">+3.6%</span>
              </div>

              <div className="mt-4 flex justify-between">
                <span className="metric-label">MOIC</span>
                <span className="text-sm">1.42x</span>
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-2">
              {periods.map((item) => (
                <button
                  key={item}
                  onClick={() => setPeriod(item)}
                  className={`rounded-full px-3 py-1.5 text-[10px] transition ${
                    period === item
                      ? "bg-white text-black"
                      : "text-neutral-600 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-[#070707] p-7 md:p-9">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="eyebrow">PERFORMANCE</p>
                <p className="mt-2 text-sm text-neutral-500">
                  Green Harbour vs portfolio benchmark
                </p>
              </div>

              <div className="hidden items-center gap-5 text-[10px] text-neutral-500 sm:flex">
                <span className="flex items-center gap-2">
                  <span className="h-px w-5 bg-white" />
                  Portfolio
                </span>
                <span className="flex items-center gap-2">
                  <span className="h-px w-5 bg-neutral-600" />
                  Benchmark
                </span>
              </div>
            </div>

            <PerformanceChart />
          </div>
        </section>

        <section className="my-14 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-4">
          {[
            ["ASSETS", `${assets.length}`],
            ["CAPACITY", `${totalMW} MW`],
            ["STORAGE", `${totalMWh} MWh`],
            ["LTM REVENUE", `$${revenue.toFixed(1)}m`],
          ].map(([label, value]) => (
            <div key={label} className="bg-black p-6 md:p-8">
              <p className="metric-label">{label}</p>
              <p className="mt-3 text-2xl tracking-[-0.03em]">{value}</p>
            </div>
          ))}
        </section>

        <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          <NemMap />

          <div className="overflow-hidden rounded-3xl border border-white/10">
            <div className="flex items-center justify-between border-b border-white/10 px-6 py-6">
              <div>
                <p className="eyebrow">OWNED ASSETS</p>
                <h2 className="mt-2 text-xl">Portfolio holdings</h2>
              </div>

              <BatteryCharging className="h-5 w-5 text-neutral-600" />
            </div>

            <div>
              {assets.map((asset) => (
                <button
                  key={asset.id}
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-5 border-b border-white/10 px-6 py-5 text-left transition hover:bg-white/[0.035] last:border-0 md:grid-cols-[1.5fr_.55fr_.55fr_.55fr_auto]"
                >
                  <div>
                    <p className="text-sm">{asset.name}</p>
                    <p className="mt-1 flex items-center gap-1 text-[10px] text-neutral-600">
                      <MapPin className="h-3 w-3" />
                      {asset.location}
                    </p>
                  </div>

                  <div className="hidden md:block">
                    <p className="metric-label">VALUE</p>
                    <p className="mt-1 text-sm">${asset.value}m</p>
                  </div>

                  <div className="hidden md:block">
                    <p className="metric-label">YTD</p>
                    <p className="mt-1 text-sm">{asset.ytdReturn}%</p>
                  </div>

                  <div className="hidden md:block">
                    <p className="metric-label">ALPHA</p>
                    <p className="mt-1 text-sm">
                      +{(asset.ytdReturn - asset.benchmarkReturn).toFixed(1)}%
                    </p>
                  </div>

                  <ChevronRight className="h-4 w-4 text-neutral-700 transition group-hover:translate-x-1 group-hover:text-white" />
                </button>
              ))}
            </div>
          </div>
        </section>

        <section className="mt-20">
          <div className="mb-7 flex items-end justify-between">
            <div>
              <p className="eyebrow">PIPELINE</p>
              <h2 className="mt-3 text-3xl tracking-[-0.04em]">
                Investment opportunities
              </h2>
            </div>

            <p className="hidden text-xs text-neutral-600 md:block">
              $31.4m potential investment
            </p>
          </div>

          <div className="overflow-hidden rounded-3xl border border-white/10">
            {opportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                className="group grid w-full grid-cols-[1fr_auto] items-center border-b border-white/10 px-6 py-6 text-left transition hover:bg-white/[0.035] last:border-0 md:grid-cols-[1.5fr_.55fr_.55fr_.55fr_auto]"
              >
                <div>
                  <p className="text-sm">{opportunity.name}</p>
                  <p className="mt-1 text-[10px] text-neutral-600">
                    {opportunity.location}
                  </p>
                </div>

                <div className="hidden md:block">
                  <p className="metric-label">SIZE</p>
                  <p className="mt-1 text-sm">
                    {opportunity.powerMW} / {opportunity.capacityMWh}
                  </p>
                </div>

                <div className="hidden md:block">
                  <p className="metric-label">STAGE</p>
                  <p className="mt-1 text-sm">{opportunity.stage}</p>
                </div>

                <div className="hidden md:block">
                  <p className="metric-label">IND. IRR</p>
                  <p className="mt-1 text-sm">{opportunity.indicativeIRR}%</p>
                </div>

                <ArrowUpRight className="h-4 w-4 text-neutral-700 transition group-hover:text-white" />
              </button>
            ))}
          </div>
        </section>

        <footer className="mt-20 flex flex-col justify-between gap-4 border-t border-white/10 py-8 text-[10px] tracking-[0.12em] text-neutral-700 sm:flex-row">
          <span>GREEN HARBOUR ENERGY</span>
          <span>INVESTMENT PLATFORM · DEMONSTRATION DATA</span>
        </footer>
      </div>
    </main>
  );
}