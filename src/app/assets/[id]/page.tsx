import Link from "next/link";
import { notFound } from "next/navigation";
import {
    ArrowLeft,
    ArrowUpRight,
    BatteryCharging,
    FileText,
    MapPin,
    ShieldCheck,
    TrendingUp,
} from "lucide-react";

import AssetPerformanceChart from "@/components/AssetPerformanceChart";
import MarketPriceChart from "@/components/MarketPriceChart";
import RecentAssetPerformance from "@/components/RecentAssetPerformance";
import GreenHarbourLogo from "@/components/GreenHarbourLogo";
import { assets } from "@/lib/demo-data";

export const instant = false;

export function generateStaticParams() {
    return assets.map((asset) => ({
        id: asset.id,
    }));
}

type AssetPageProps = {
    params: Promise<{
        id: string;
    }>;
};

const assetImages: Record<string, string> = {
    sunshine: "/images/assets/sunshine.png",
    western: "/images/assets/western.png",
    darling: "/images/assets/darling.png",
    murray: "/images/assets/murray.png",
    limestone: "/images/assets/limestone.png",
    pilbara: "/images/assets/pilbara.png",
    darwin: "/images/assets/darwin.png",
};

export default async function AssetPage({
    params,
}: AssetPageProps) {
    const { id } = await params;

    const asset = assets.find((item) => item.id === id);

    if (!asset) {
        notFound();
    }

    const underwritingVariance =
        asset.ytdReturn - asset.underwrittenReturn;

    const valueCreation =
        asset.value - asset.investedCapital;

    const moic =
        asset.value / asset.investedCapital;

    const revenueVariance =
        (asset.revenueLTM / asset.revenueBudget - 1) * 100;

    const image =
        assetImages[asset.id] ?? "/images/assets/sunshine.png";

        const assetMarketRegion: Record<string, "QLD1" | "NSW1" | "VIC1" | "SA1" | "TAS1"> = {
    sunshine: "QLD1",
    western: "QLD1",
    darling: "NSW1",
    murray: "VIC1",
    limestone: "SA1",
};

const defaultMarketRegion = assetMarketRegion[asset.id] ?? "QLD1";

    return (
        <main className="min-h-screen bg-[#f7f7f2] text-[#161914]">
            <header className="border-b border-[#d9ddd6] bg-white">
                <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-6 lg:px-10">
                    <Link href="/" className="text-[#163d30]">
                        <GreenHarbourLogo />
                    </Link>

                    <Link
                        href="/platform"
                        className="flex items-center gap-2 text-[10px] tracking-[0.08em] text-[#667068] transition hover:text-[#173f32]"
                    >
                        <ArrowLeft className="h-3 w-3" />
                        PORTFOLIO
                    </Link>
                </div>
            </header>

            <div className="mx-auto max-w-[1400px] px-6 pb-24 pt-12 lg:px-10">
                {/* Asset identity */}
                <section className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
                    <div>
                        <div className="flex items-center gap-3">
                            <span className="rounded-full bg-[#e5eee8] px-3 py-1.5 text-[8px] font-medium tracking-[0.15em] text-[#176044]">
                                {asset.status.toUpperCase()}
                            </span>

                            <span className="text-[9px] tracking-[0.16em] text-[#758078]">
                                {asset.region}
                            </span>
                        </div>

                        <h1 className="mt-5 text-5xl font-medium tracking-[-0.05em] md:text-6xl">
                            {asset.name}
                        </h1>

                        <p className="mt-4 flex items-center gap-2 text-[11px] text-[#747b74]">
                            <MapPin className="h-3.5 w-3.5" />
                            {asset.location}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 rounded-full border border-[#d4d9d3] bg-white px-5 py-3 text-[11px]">
                        <BatteryCharging className="h-4 w-4 text-[#176044]" />
                        <span className="font-medium">
                            {asset.powerMW} MW
                        </span>
                        <span className="text-[#a1a7a1]">/</span>
                        <span className="font-medium">
                            {asset.capacityMWh} MWh
                        </span>
                    </div>
                </section>

                {/* Primary investment metrics */}
                <section className="mt-6 grid overflow-hidden rounded-2xl border border-[#d9ddd6] bg-white md:grid-cols-4">
                    {[
                        ["CURRENT VALUE", `$${asset.value.toFixed(1)}m`],
                        [
                            "INVESTED CAPITAL",
                            `$${asset.investedCapital.toFixed(1)}m`,
                        ],
                        [
                            "VALUE CREATED",
                            `${valueCreation >= 0 ? "+" : ""}$${valueCreation.toFixed(1)}m`,
                        ],
                        ["MOIC", `${moic.toFixed(2)}x`],
                    ].map(([label, value], index) => (
                        <div
                            key={label}
                            className={`px-7 py-8 lg:px-9 lg:py-9 ${index > 0
                                ? "border-t border-[#e0e3de] md:border-l md:border-t-0"
                                : ""
                                }`}
                        >
                            <p className="text-[8px] font-medium tracking-[0.16em] text-[#858b84]">
                                {label}
                            </p>

                            <p className="mt-4 text-3xl font-medium tracking-[-0.045em] lg:text-4xl">
                                {value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Return metrics */}
                <section className="mt-3 grid overflow-hidden rounded-2xl border border-[#d9ddd6] bg-white md:grid-cols-4">
                    {[
                        ["YTD RETURN", `${asset.ytdReturn.toFixed(1)}%`],
                        ["PROJECT IRR", `${asset.irr.toFixed(1)}%`],
                        ["LTM REVENUE", `$${asset.revenueLTM.toFixed(2)}m`],
                        [
                            "REVENUE VS PLAN",
                            `${revenueVariance >= 0 ? "+" : ""}${revenueVariance.toFixed(1)}%`,
                        ],
                    ].map(([label, value], index) => (
                        <div
                            key={label}
                            className={`px-7 py-7 lg:px-9 ${index > 0
                                ? "border-t border-[#e0e3de] md:border-l md:border-t-0"
                                : ""
                                }`}
                        >
                            <p className="text-[8px] font-medium tracking-[0.16em] text-[#858b84]">
                                {label}
                            </p>

                            <p
                                className={`mt-3 text-2xl font-medium tracking-[-0.04em] lg:text-3xl ${label === "REVENUE VS PLAN" &&
                                    revenueVariance >= 0
                                    ? "text-[#176044]"
                                    : ""
                                    }`}
                            >
                                {value}
                            </p>
                        </div>
                    ))}
                </section>

                {/* Performance */}
                <section className="mt-8">
                    {/* Investment performance + physical asset */}
                    <div className="grid items-start gap-6 lg:grid-cols-[1.15fr_.85fr]">
                        {/* Investment performance */}
                        <div className="rounded-2xl border border-[#d9ddd6] bg-white p-8 lg:p-10">
                            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
                                <div>
                                    <p className="text-[9px] font-medium tracking-[0.18em] text-[#758078]">
                                        INVESTMENT PERFORMANCE
                                    </p>

                                    <h2 className="mt-3 text-3xl tracking-[-0.035em]">
                                        Actual vs investment case
                                    </h2>
                                </div>

                                <div className="flex items-center gap-2 rounded-full bg-[#edf3ef] px-3 py-2 text-[9px] font-medium text-[#176044]">
                                    <TrendingUp className="h-3.5 w-3.5" />
                                    {underwritingVariance >= 0 ? "+" : ""}
                                    {underwritingVariance.toFixed(1)}pp vs underwriting
                                </div>
                            </div>

                            <div className="mt-10 grid grid-cols-3 gap-6 border-b border-[#e2e6e1] pb-9">
                                <div>
                                    <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                                        ACTUAL
                                    </p>
                                    <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">
                                        {asset.ytdReturn.toFixed(1)}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                                        UNDERWRITTEN
                                    </p>
                                    <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">
                                        {asset.underwrittenReturn.toFixed(1)}%
                                    </p>
                                </div>

                                <div>
                                    <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
                                        BENCHMARK
                                    </p>
                                    <p className="mt-2 text-3xl font-medium tracking-[-0.04em]">
                                        {asset.benchmarkReturn.toFixed(1)}%
                                    </p>
                                </div>
                            </div>

                            <AssetPerformanceChart
                                assetId={asset.id}
                                actualReturn={asset.ytdReturn}
                                underwrittenReturn={asset.underwrittenReturn}
                                benchmarkReturn={asset.benchmarkReturn}
                            />
                        </div>

                        {/* Physical asset */}
                        <div className="overflow-hidden rounded-2xl border border-[#d9ddd6] bg-white">
                            <div className="relative h-[220px] overflow-hidden bg-[#e4e9e4] lg:h-[250px]">
                                <img
                                    src={image}
                                    alt={`Representative battery energy storage infrastructure for ${asset.name}`}
                                    className="h-full w-full object-cover"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                                <div className="absolute bottom-5 left-5">
                                    <p className="text-[8px] font-medium tracking-[0.15em] text-white/70">
                                        ASSET
                                    </p>

                                    <p className="mt-1 text-lg font-medium text-white">
                                        {asset.name}
                                    </p>
                                </div>
                            </div>

                            <div className="p-7">
                                <p className="text-[8px] font-medium tracking-[0.16em] text-[#758078]">
                                    PHYSICAL INFRASTRUCTURE
                                </p>

                                <div className="mt-5 grid grid-cols-2 gap-5">
                                    <div>
                                        <p className="text-[8px] tracking-[0.12em] text-[#909790]">
                                            POWER
                                        </p>
                                        <p className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                                            {asset.powerMW} MW
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[8px] tracking-[0.12em] text-[#909790]">
                                            STORAGE
                                        </p>
                                        <p className="mt-2 text-2xl font-medium tracking-[-0.04em]">
                                            {asset.capacityMWh} MWh
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 border-t border-[#e2e6e1] pt-5">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] text-[#747d76]">
                                            Configuration
                                        </span>
                                        <span className="text-[10px] font-medium">
                                            4-hour BESS
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] text-[#747d76]">
                                            Status
                                        </span>
                                        <span className="text-[10px] font-medium text-[#176044]">
                                            {asset.status}
                                        </span>
                                    </div>

                                    <div className="mt-3 flex items-center justify-between">
                                        <span className="text-[10px] text-[#747d76]">
                                            Location
                                        </span>
                                        <span className="text-[10px] font-medium">
                                            {asset.region}
                                        </span>
                                    </div>
                                </div>

                                <p className="mt-6 text-[8px] leading-4 text-[#9aa09a]">
                                    Representative asset imagery
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Recent asset performance */}
                    <div className="mt-6">
                        <RecentAssetPerformance assetId={asset.id} />
                    </div>

                    {/* NEM market context */}
                    <div className="mt-6">
                        <MarketPriceChart defaultRegion={defaultMarketRegion} />
                    </div>
                </section>

                {/* Investment case / risk / reporting */}
                <section className="mt-8 grid gap-6 lg:grid-cols-3">
                    <div className="rounded-2xl border border-[#d9ddd6] bg-white p-8">
                        <TrendingUp className="h-5 w-5 text-[#176044]" />

                        <p className="mt-7 text-[9px] font-medium tracking-[0.16em] text-[#758078]">
                            INVESTMENT CASE
                        </p>

                        <h3 className="mt-3 text-xl font-medium">
                            Distributed storage with disciplined entry economics.
                        </h3>

                        <p className="mt-4 text-[11px] leading-6 text-[#6d756e]">
                            Investment performance is assessed against the original
                            underwriting case, with emphasis on revenue delivery,
                            capital value and realised economic performance.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#d9ddd6] bg-white p-8">
                        <ShieldCheck className="h-5 w-5 text-[#176044]" />

                        <p className="mt-7 text-[9px] font-medium tracking-[0.16em] text-[#758078]">
                            INVESTMENT RISK
                        </p>

                        <h3 className="mt-3 text-xl font-medium">
                            Asset risks monitored through an investment lens.
                        </h3>

                        <p className="mt-4 text-[11px] leading-6 text-[#6d756e]">
                            Availability, degradation, market exposure and operating
                            performance are monitored where they affect expected
                            cash flow, valuation or the investment case.
                        </p>
                    </div>

                    <div className="rounded-2xl border border-[#d9ddd6] bg-white p-8">
                        <FileText className="h-5 w-5 text-[#176044]" />

                        <p className="mt-7 text-[9px] font-medium tracking-[0.16em] text-[#758078]">
                            INVESTOR REPORTING
                        </p>

                        <h3 className="mt-3 text-xl font-medium">
                            Investment information in one place.
                        </h3>

                        <p className="mt-4 text-[11px] leading-6 text-[#6d756e]">
                            Valuation materials, investment reporting and relevant
                            asset documentation will be available to authorised
                            investors through the client platform.
                        </p>

                        <button
                            type="button"
                            className="mt-6 flex items-center gap-2 text-[9px] font-medium tracking-[0.1em] text-[#176044]"
                        >
                            VIEW DOCUMENTS
                            <ArrowUpRight className="h-3 w-3" />
                        </button>
                    </div>
                </section>
            </div>
        </main>
    );
}