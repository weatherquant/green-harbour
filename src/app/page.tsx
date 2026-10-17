import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  BatteryCharging,
  Map,
  ShieldCheck,
} from "lucide-react";

import PublicHeader from "@/components/PublicHeader";
import PublicAustraliaMap from "@/components/PublicAustraliaMap";
import { assets, opportunities } from "@/lib/demo-data";

export default function Home() {
  const totalMW = assets.reduce((sum, asset) => sum + asset.powerMW, 0);
  const totalMWh = assets.reduce(
    (sum, asset) => sum + asset.capacityMWh,
    0
  );

  return (
    <main className="min-h-screen bg-[#f7f7f2] text-[#161914]">
      <PublicHeader />

      {/* HERO */}
      <section className="relative overflow-hidden pt-[78px]">
        <div className="absolute -right-32 -top-28 h-[430px] w-[650px] rotate-[-12deg] rounded-[100%] bg-[#dce8df] opacity-70 blur-3xl" />

        <div className="mx-auto grid min-h-[760px] max-w-[1500px] lg:grid-cols-[0.78fr_1.22fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 lg:px-10">
            <p className="text-[9px] tracking-[0.22em] text-[#657168]">
              AUSTRALIAN BATTERY INFRASTRUCTURE
            </p>

            <h1 className="mt-7 max-w-[640px] text-5xl font-medium leading-[0.98] tracking-[-0.055em] md:text-7xl">
              Investing in the
              <span className="block text-[#66736a]">
                infrastructure
              </span>
              behind Australia&apos;s
              <span className="block text-[#174735]">
                energy transition.
              </span>
            </h1>

            <p className="mt-8 max-w-[510px] text-[15px] leading-7 text-[#626960]">
              Green Harbour Energy invests in distributed battery infrastructure across 
              Australian electricity markets, combining disciplined investment underwriting 
              with active asset ownership.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="#strategy"
                className="flex items-center gap-3 rounded-full bg-[#173f32] px-5 py-3 text-[10px] font-medium tracking-[0.08em] text-white"
              >
                OUR STRATEGY
                <ArrowRight className="h-3 w-3" />
              </a>

              <Link
                href="/platform"
                className="flex items-center gap-3 rounded-full border border-[#cbd0c9] bg-white px-5 py-3 text-[10px] font-medium tracking-[0.08em]"
              >
                INVESTOR PLATFORM
              </Link>
            </div>

            <div className="mt-16 grid max-w-[520px] grid-cols-3 border-t border-[#d7dad4] pt-7">
              <div>
                <p className="text-2xl tracking-[-0.04em]">
                  {assets.length}
                </p>
                <p className="mt-1 text-[8px] tracking-[0.15em] text-[#7c837c]">
                  ASSETS
                </p>
              </div>

              <div>
                <p className="text-2xl tracking-[-0.04em]">
                  {totalMW} MW
                </p>
                <p className="mt-1 text-[8px] tracking-[0.15em] text-[#7c837c]">
                  CAPACITY
                </p>
              </div>

              <div>
                <p className="text-2xl tracking-[-0.04em]">
                  {totalMWh} MWh
                </p>
                <p className="mt-1 text-[8px] tracking-[0.15em] text-[#7c837c]">
                  STORAGE
                </p>
              </div>
            </div>
          </div>

          <div className="relative flex items-center justify-center px-4 lg:px-0">
            <PublicAustraliaMap />
          </div>
        </div>
      </section>

      {/* STRATEGY */}
      <section
        id="strategy"
        className="border-y border-[#d9ddd6] bg-white"
      >
        <div className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10">
          <div className="grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
            <div>
              <p className="text-[9px] tracking-[0.2em] text-[#758078]">
                INVESTMENT STRATEGY
              </p>

              <h2 className="mt-5 text-4xl tracking-[-0.045em]">
                Small assets.
                <br />
                Institutional discipline.
              </h2>
            </div>

            <div className="grid gap-px overflow-hidden rounded-2xl border border-[#daddd7] bg-[#daddd7] md:grid-cols-2">
              {[
                {
                  icon: BatteryCharging,
                  title: "Distributed BESS",
                  text: "Targeted investment in smaller-scale battery assets across the National Electricity Market.",
                },
                {
                  icon: Map,
                  title: "Regional diversification",
                  text: "Portfolio construction across NEM regions to diversify market and operating exposures.",
                },
                {
                  icon: BarChart3,
                  title: "Investment discipline",
                  text: "Asset-level underwriting, performance attribution and active comparison against the investment case.",
                },
                {
                  icon: ShieldCheck,
                  title: "Active ownership",
                  text: "Ongoing oversight of asset economics, operating performance, valuation and investment risk.",
                },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="bg-[#fafaf7] p-8">
                  <Icon className="h-5 w-5 text-[#315b49]" />

                  <h3 className="mt-8 text-lg font-medium">
                    {title}
                  </h3>

                  <p className="mt-3 max-w-sm text-[12px] leading-6 text-[#717770]">
                    {text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PORTFOLIO */}
      <section
        id="portfolio"
        className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10"
      >
        <div className="mb-10 flex items-end justify-between">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#758078]">
              PORTFOLIO
            </p>

            <h2 className="mt-4 text-4xl tracking-[-0.045em]">
              Australian battery infrastructure
            </h2>
          </div>

          <Link
            href="/platform"
            className="hidden items-center gap-2 text-[10px] font-medium text-[#315b49] md:flex"
          >
            VIEW INVESTMENT PLATFORM
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="overflow-hidden rounded-2xl border border-[#d9ddd6] bg-white">
          {assets.map((asset) => (
            <Link
              key={asset.id}
              href={`/assets/${asset.id}`}
              className="group grid grid-cols-[1fr_auto] items-center border-b border-[#e1e3de] px-6 py-6 transition hover:bg-[#f1f4ef] last:border-0 md:grid-cols-[1.4fr_.5fr_.6fr_.5fr_auto]"
            >
              <div>
                <p className="text-[13px] font-medium">
                  {asset.name}
                </p>
                <p className="mt-1 text-[9px] text-[#858b84]">
                  {asset.location}
                </p>
              </div>

              <div className="hidden md:block">
                <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                  REGION
                </p>
                <p className="mt-1 text-xs">{asset.region}</p>
              </div>

              <div className="hidden md:block">
                <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                  CONFIGURATION
                </p>
                <p className="mt-1 text-xs">
                  {asset.powerMW} MW / {asset.capacityMWh} MWh
                </p>
              </div>

              <div className="hidden md:block">
                <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                  STATUS
                </p>
                <p className="mt-1 text-xs">{asset.status}</p>
              </div>

              <ArrowRight className="h-4 w-4 text-[#929890] transition group-hover:translate-x-1 group-hover:text-[#173f32]" />
            </Link>
          ))}
        </div>
      </section>

      {/* APPROACH */}
      <section
        id="approach"
        className="bg-[#16382d] text-white"
      >
        <div className="mx-auto grid max-w-[1500px] gap-16 px-6 py-24 lg:grid-cols-2 lg:px-10">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-[#a8c0b4]">
              ACTIVE OWNERSHIP
            </p>

            <h2 className="mt-5 max-w-xl text-4xl leading-tight tracking-[-0.045em] md:text-5xl">
              Investment performance,
              not operational noise.
            </h2>
          </div>

          <div className="flex items-end">
            <p className="max-w-xl text-[14px] leading-7 text-[#c7d5ce]">
              Green Harbour evaluates each asset through the economics of
              ownership: invested capital, revenue, cash yield, valuation,
              return and performance relative to underwriting. Operational
              information matters where it explains investment outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* OPPORTUNITIES */}
      <section
        id="opportunities"
        className="mx-auto max-w-[1500px] px-6 py-24 lg:px-10"
      >
        <p className="text-[9px] tracking-[0.2em] text-[#758078]">
          INVESTMENT PIPELINE
        </p>

        <div className="mt-4 flex items-end justify-between">
          <h2 className="text-4xl tracking-[-0.045em]">
            Selected opportunities
          </h2>
        </div>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {opportunities.map((opportunity) => (
            <div
              key={opportunity.id}
              className="rounded-2xl border border-[#d9ddd6] bg-white p-7"
            >
              <span className="rounded-full bg-[#edf1ec] px-3 py-1.5 text-[8px] tracking-[0.12em] text-[#637068]">
                {(opportunity.stage ?? "Opportunity").toUpperCase()}
              </span>

              <h3 className="mt-9 text-xl font-medium">
                {opportunity.name}
              </h3>

              <p className="mt-2 text-[10px] text-[#858b84]">
                {opportunity.location}
              </p>

              <div className="mt-8 grid grid-cols-3 border-t border-[#e0e3de] pt-5">
                <div>
                  <p className="text-[8px] tracking-[0.13em] text-[#858b84]">
                    SIZE
                  </p>
                  <p className="mt-2 text-xs">
                    {opportunity.powerMW} MW
                  </p>
                </div>

                <div>
                  <p className="text-[8px] tracking-[0.13em] text-[#858b84]">
                    STORAGE
                  </p>
                  <p className="mt-2 text-xs">
                    {opportunity.capacityMWh} MWh
                  </p>
                </div>

                <div>
                  <p className="text-[8px] tracking-[0.13em] text-[#858b84]">
                    IND. IRR
                  </p>
                  <p className="mt-2 text-xs text-[#176044]">
                    {opportunity.indicativeIRR.toFixed(1)}%
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-[#d9ddd6]">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 px-6 py-10 text-[9px] tracking-[0.12em] text-[#777e77] sm:flex-row lg:px-10">
          <span>GREEN HARBOUR ENERGY</span>
          <span>
            AUSTRALIAN BATTERY INFRASTRUCTURE INVESTMENT
          </span>
        </div>
      </footer>
    </main>
  );
}