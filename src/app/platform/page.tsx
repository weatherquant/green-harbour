"use client";

import { useState } from "react";
import {
  ArrowUpRight,
  ChevronRight,
  Circle,
  MapPin,
  Moon,
  Sun,
} from "lucide-react";

import NemMap from "@/components/NemMap";
import PerformanceChart from "@/components/PerformanceChart";
import { assets, opportunities } from "@/lib/demo-data";

const periods = ["1D", "1M", "QTR", "YTD", "1Y", "3Y", "ALL"];

export default function Home() {
  const [period, setPeriod] = useState("YTD");
  const [dark, setDark] = useState(false);

  const nav = assets.reduce((sum, asset) => sum + asset.value, 0);
  const totalMW = assets.reduce((sum, asset) => sum + asset.powerMW, 0);
  const totalMWh = assets.reduce(
    (sum, asset) => sum + asset.capacityMWh,
    0
  );
  const revenue = assets.reduce(
    (sum, asset) => sum + asset.revenueLTM,
    0
  );
  const revenueBudget = assets.reduce(
    (sum, asset) => sum + asset.revenueBudget,
    0
  );

  const portfolioReturn = 14.8;
  const benchmarkReturn = 11.2;
  const underwritingReturn = 13.1;

  return (
    <main className={`app ${dark ? "dark" : ""}`}>
      <header className="border-b border-theme">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-5 lg:px-10">
          <div>
            <div className="text-[13px] font-semibold tracking-[0.2em]">
              GREEN HARBOUR
            </div>
            <div className="mt-1 text-[8px] tracking-[0.3em] text-muted">
              ENERGY
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-[11px] text-muted md:flex">
            <button className="text-[var(--text)]">
              Portfolio
            </button>
            <button className="transition hover:text-[var(--text)]">
              Assets
            </button>
            <button className="transition hover:text-[var(--text)]">
              Opportunities
            </button>
            <button className="transition hover:text-[var(--text)]">
              Market
            </button>
          </nav>

          <div className="flex items-center gap-4">
            <div className="hidden items-center gap-2 text-[9px] tracking-[0.14em] text-muted sm:flex">
              <Circle className="h-1.5 w-1.5 fill-[var(--accent)] text-[var(--accent)]" />
              DEMO
            </div>

            <button
              type="button"
              onClick={() => setDark((current) => !current)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-theme surface transition hover:border-[var(--border-strong)]"
              aria-label={
                dark ? "Switch to light mode" : "Switch to dark mode"
              }
            >
              {dark ? (
                <Sun className="h-3.5 w-3.5" />
              ) : (
                <Moon className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">
        {/* PAGE HEADING */}
        <section className="mb-9 flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div>
            <p className="eyebrow">
              AUSTRALIAN BATTERY INFRASTRUCTURE
            </p>

            <h1 className="mt-4 text-4xl font-medium tracking-[-0.045em] md:text-6xl">
              Portfolio
              <span className="text-muted"> overview.</span>
            </h1>
          </div>

          <div className="lg:text-right">
            <p className="metric-label">PORTFOLIO VALUE</p>
            <p className="mt-2 text-3xl tracking-[-0.04em]">
              ${nav.toFixed(1)}m
            </p>
          </div>
        </section>

        {/* MAP / PORTFOLIO HERO */}
        <section className="grid overflow-hidden rounded-2xl border border-theme lg:grid-cols-[1.35fr_.65fr]">
          <div className="min-h-[470px] border-b border-theme lg:border-b-0 lg:border-r">
            <NemMap />
          </div>

          <div className="surface flex flex-col justify-between p-7 md:p-9">
            <div>
              <p className="eyebrow">PORTFOLIO RETURN</p>

              <div className="mt-5 flex items-start gap-2">
                <span className="text-6xl font-medium tracking-[-0.065em]">
                  {portfolioReturn.toFixed(1)}
                </span>
                <span className="mt-2 text-lg text-muted">%</span>
              </div>

              <p className="mt-2 text-[11px] text-muted">
                Year to date
              </p>

              <div className="mt-8 border-t border-theme pt-6">
                <div className="flex items-center justify-between">
                  <span className="metric-label">
                    UNDERWRITTEN
                  </span>
                  <span className="text-sm">
                    {underwritingReturn.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="metric-label">
                    BENCHMARK
                  </span>
                  <span className="text-sm">
                    {benchmarkReturn.toFixed(1)}%
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="metric-label">
                    VS UNDERWRITING
                  </span>
                  <span className="text-sm text-positive">
                    +
                    {(
                      portfolioReturn - underwritingReturn
                    ).toFixed(1)}
                    %
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-7 border-t border-theme pt-7">
              <div>
                <p className="metric-label">ASSETS</p>
                <p className="mt-2 text-xl">{assets.length}</p>
              </div>

              <div>
                <p className="metric-label">CAPACITY</p>
                <p className="mt-2 text-xl">{totalMW} MW</p>
              </div>

              <div>
                <p className="metric-label">STORAGE</p>
                <p className="mt-2 text-xl">
                  {totalMWh} MWh
                </p>
              </div>

              <div>
                <p className="metric-label">DURATION</p>
                <p className="mt-2 text-xl">4.0 hrs</p>
              </div>
            </div>
          </div>
        </section>

        {/* PERFORMANCE */}
        <section className="mt-14">
          <div className="mb-7 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="eyebrow">
                INVESTMENT PERFORMANCE
              </p>
              <h2 className="mt-3 text-3xl tracking-[-0.04em]">
                Portfolio performance
              </h2>
            </div>

            <div className="flex flex-wrap gap-1">
              {periods.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setPeriod(item)}
                  className={`rounded-full px-3 py-1.5 text-[9px] transition ${
                    period === item
                      ? "bg-[var(--text)] text-[var(--bg)]"
                      : "text-muted hover:text-[var(--text)]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-theme surface">
            <div className="grid border-b border-theme md:grid-cols-3">
              <div className="p-6 md:border-r md:border-theme">
                <p className="metric-label">GREEN HARBOUR</p>
                <p className="mt-2 text-2xl">
                  {portfolioReturn.toFixed(1)}%
                </p>
              </div>

              <div className="border-t border-theme p-6 md:border-r md:border-t-0">
                <p className="metric-label">UNDERWRITTEN</p>
                <p className="mt-2 text-2xl">
                  {underwritingReturn.toFixed(1)}%
                </p>
              </div>

              <div className="border-t border-theme p-6 md:border-t-0">
                <p className="metric-label">BENCHMARK</p>
                <p className="mt-2 text-2xl">
                  {benchmarkReturn.toFixed(1)}%
                </p>
              </div>
            </div>

            <div className="p-6 md:p-8">
              <div className="mb-2 flex flex-wrap gap-5 text-[9px] text-muted">
                <span className="flex items-center gap-2">
                  <span className="h-[2px] w-5 bg-[var(--chart-primary)]" />
                  Green Harbour
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[var(--chart-underwriting)]" />
                  Underwriting
                </span>

                <span className="flex items-center gap-2">
                  <span className="h-px w-5 bg-[var(--chart-benchmark)]" />
                  Benchmark
                </span>
              </div>

              <PerformanceChart />
            </div>
          </div>
        </section>

        {/* ECONOMIC SUMMARY */}
        <section className="my-14 grid grid-cols-2 overflow-hidden rounded-2xl border border-theme md:grid-cols-4">
          <div className="surface p-6 md:p-7">
            <p className="metric-label">PORTFOLIO VALUE</p>
            <p className="mt-3 text-xl tracking-[-0.03em]">
              ${nav.toFixed(1)}m
            </p>
          </div>

          <div className="surface border-l border-theme p-6 md:p-7">
            <p className="metric-label">LTM REVENUE</p>
            <p className="mt-3 text-xl tracking-[-0.03em]">
              ${revenue.toFixed(2)}m
            </p>
          </div>

          <div className="surface border-l border-theme p-6 md:p-7">
            <p className="metric-label">VS REVENUE PLAN</p>
            <p className="mt-3 text-xl tracking-[-0.03em] text-positive">
              +
              {(
                (revenue / revenueBudget - 1) *
                100
              ).toFixed(1)}
              %
            </p>
          </div>

          <div className="surface border-l border-theme p-6 md:p-7">
            <p className="metric-label">INVESTED CAPACITY</p>
            <p className="mt-3 text-xl tracking-[-0.03em]">
              {totalMW} MW
            </p>
          </div>
        </section>

        {/* OWNED ASSETS */}
        <section>
          <div className="mb-6">
            <p className="eyebrow">OWNED PORTFOLIO</p>
            <h2 className="mt-3 text-3xl tracking-[-0.04em]">
              Assets
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-theme surface">
            <div className="hidden grid-cols-[1.55fr_.55fr_.65fr_.55fr_.55fr_auto] border-b border-theme px-6 py-3 md:grid">
              <span className="metric-label">ASSET</span>
              <span className="metric-label">REGION</span>
              <span className="metric-label">SIZE</span>
              <span className="metric-label">YTD</span>
              <span className="metric-label">VS UW</span>
              <span />
            </div>

            {assets.map((asset) => {
              const variance =
                asset.ytdReturn - asset.underwrittenReturn;

              return (
                <button
                  key={asset.id}
                  type="button"
                  className="group grid w-full grid-cols-[1fr_auto] items-center gap-4 border-b border-theme px-6 py-5 text-left transition hover:bg-[var(--soft)] last:border-0 md:grid-cols-[1.55fr_.55fr_.65fr_.55fr_.55fr_auto]"
                >
                  <div>
                    <p className="text-[13px] font-medium">
                      {asset.name}
                    </p>

                    <p className="mt-1 flex items-center gap-1 text-[9px] text-muted">
                      <MapPin className="h-2.5 w-2.5" />
                      {asset.location}
                    </p>
                  </div>

                  <div className="hidden text-xs md:block">
                    {asset.region}
                  </div>

                  <div className="hidden text-xs md:block">
                    {asset.powerMW} MW / {asset.capacityMWh} MWh
                  </div>

                  <div className="hidden text-xs md:block">
                    {asset.ytdReturn.toFixed(1)}%
                  </div>

                  <div
                    className={`hidden text-xs md:block ${
                      variance >= 0
                        ? "text-positive"
                        : "text-negative"
                    }`}
                  >
                    {variance >= 0 ? "+" : ""}
                    {variance.toFixed(1)}%
                  </div>

                  <ChevronRight className="h-3.5 w-3.5 text-muted transition group-hover:translate-x-1 group-hover:text-[var(--text)]" />
                </button>
              );
            })}
          </div>
        </section>

        {/* OPPORTUNITIES */}
        <section className="mt-20">
          <div className="mb-6 flex items-end justify-between">
            <div>
              <p className="eyebrow">INVESTMENT PIPELINE</p>
              <h2 className="mt-3 text-3xl tracking-[-0.04em]">
                Opportunities
              </h2>
            </div>

            <p className="hidden text-[10px] text-muted md:block">
              Screening opportunities · demonstration data
            </p>
          </div>

          <div className="grid gap-3 lg:grid-cols-3">
            {opportunities.map((opportunity) => (
              <button
                key={opportunity.id}
                type="button"
                className="group rounded-2xl border border-theme surface p-6 text-left transition hover:-translate-y-0.5 hover:border-[var(--border-strong)]"
              >
                <div className="flex items-start justify-between">
                  <span className="rounded-full border border-theme px-2.5 py-1 text-[8px] tracking-[0.12em] text-muted">
                    {opportunity.stage.toUpperCase()}
                  </span>

                  <ArrowUpRight className="h-4 w-4 text-muted transition group-hover:text-[var(--text)]" />
                </div>

                <h3 className="mt-8 text-lg font-medium tracking-[-0.025em]">
                  {opportunity.name}
                </h3>

                <p className="mt-1 text-[10px] text-muted">
                  {opportunity.location}
                </p>

                <div className="mt-7 grid grid-cols-3 border-t border-theme pt-5">
                  <div>
                    <p className="metric-label">SIZE</p>
                    <p className="mt-2 text-xs">
                      {opportunity.powerMW} MW
                    </p>
                  </div>

                  <div>
                    <p className="metric-label">STORAGE</p>
                    <p className="mt-2 text-xs">
                      {opportunity.capacityMWh} MWh
                    </p>
                  </div>

                  <div>
                    <p className="metric-label">IND. IRR</p>
                    <p className="mt-2 text-xs">
                      {opportunity.indicativeIRR.toFixed(1)}%
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>

        <footer className="mt-20 flex flex-col justify-between gap-4 border-t border-theme py-8 text-[8px] tracking-[0.15em] text-muted sm:flex-row">
          <span>GREEN HARBOUR ENERGY</span>
          <span>
            INVESTMENT PLATFORM · DEMONSTRATION DATA
          </span>
        </footer>
      </div>
    </main>
  );
}