"use client";

import { useEffect, useMemo, useState } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ReferenceLine,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

type Region = "QLD1" | "NSW1" | "VIC1" | "SA1" | "TAS1";
type Range = "24H" | "7D";

type PricePoint = [string, number];

type PriceResult = {
    name: string;
    columns?: {
        region?: string;
    };
    data: PricePoint[];
};

type PriceSeries = {
    network_code: string;
    metric: string;
    unit: string;
    interval: string;
    results: PriceResult[];
};

type ApiResponse = {
    version: string;
    created_at: string;
    success: boolean;
    data: PriceSeries[];
};

type ChartPoint = {
    timestamp: string;
    price: number;
};

const regions: { value: Region; label: string }[] = [
    { value: "QLD1", label: "Queensland" },
    { value: "NSW1", label: "New South Wales" },
    { value: "VIC1", label: "Victoria" },
    { value: "SA1", label: "South Australia" },
    { value: "TAS1", label: "Tasmania" },
];

function formatPrice(value: number) {
    const rounded = Math.round(value);

    if (Math.abs(rounded) >= 1000) {
        return `$${rounded.toLocaleString()}`;
    }

    return `$${rounded}`;
}

function formatTime(timestamp: string) {
    return new Intl.DateTimeFormat("en-AU", {
        hour: "numeric",
        hour12: true,
    }).format(new Date(timestamp));
}

function formatDateTime(timestamp: string) {
    return new Intl.DateTimeFormat("en-AU", {
        day: "numeric",
        month: "short",
        hour: "numeric",
        hour12: true,
    }).format(new Date(timestamp));
}

type Props = {
    defaultRegion?: Region;
};

export default function MarketPriceChart({
    defaultRegion = "QLD1",
}: Props) {
    const [region, setRegion] = useState<Region>(defaultRegion);
    const [range, setRange] = useState<Range>("24H");
    const [response, setResponse] = useState<ApiResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let active = true;

        async function loadPrices() {
            try {
                setLoading(true);

                const res = await fetch("/api/market-prices");

                if (!res.ok) {
                    throw new Error("Unable to load market prices");
                }

                const json: ApiResponse = await res.json();

                if (active) {
                    setResponse(json);
                    setError(null);
                }
            } catch {
                if (active) {
                    setError("Market price data is currently unavailable.");
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        }

        loadPrices();

        return () => {
            active = false;
        };
    }, []);

    const allRegionData = useMemo<ChartPoint[]>(() => {
        const priceSeries = response?.data?.find(
            (series) => series.metric === "price"
        );

        const result = priceSeries?.results?.find(
            (item) =>
                item.columns?.region === region ||
                item.name === `price_${region}`
        );

        if (!result) return [];

        return result.data.map(([timestamp, price]) => ({
            timestamp,
            price,
        }));
    }, [response, region]);

    const chartData = useMemo(() => {
        if (range === "7D") {
            return allRegionData;
        }

        return allRegionData.slice(-24);
    }, [allRegionData, range]);

    const statistics = useMemo(() => {
        if (chartData.length === 0) return null;

        const prices = chartData.map((point) => point.price);
        const current = prices[prices.length - 1];
        const average =
            prices.reduce((total, price) => total + price, 0) / prices.length;

        return {
            current,
            average,
            high: Math.max(...prices),
            low: Math.min(...prices),
            timestamp: chartData[chartData.length - 1].timestamp,
        };
    }, [chartData]);

    const selectedRegion =
        regions.find((item) => item.value === region)?.label ?? region;

    return (
        <section className="rounded-2xl border border-[#d9ddd6] bg-white p-7 lg:p-10">
            <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                <div>
                    <div className="flex items-center gap-3">
                        <p className="text-[8px] font-medium tracking-[0.16em] text-[#758078]">
                            MARKET CONTEXT
                        </p>

                        <span className="rounded-full bg-[#edf3ef] px-2.5 py-1 text-[7px] font-medium tracking-[0.1em] text-[#176044]">
                            UPDATED HOURLY
                        </span>
                    </div>

                    <h2 className="mt-3 text-[27px] font-medium tracking-[-0.04em] text-[#151915]">
                        Wholesale electricity price
                    </h2>

                    <p className="mt-2 text-[10px] text-[#737b74]">
                        NEM regional spot price · AUD/MWh
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex rounded-full border border-[#d9ddd6] p-1">
                        {(["24H", "7D"] as Range[]).map((item) => (
                            <button
                                key={item}
                                type="button"
                                onClick={() => setRange(item)}
                                className={`rounded-full px-3 py-2 text-[8px] font-medium tracking-[0.08em] transition ${range === item
                                        ? "bg-[#173f32] text-white"
                                        : "text-[#7c847d] hover:text-[#173f32]"
                                    }`}
                            >
                                {item}
                            </button>
                        ))}
                    </div>

                    <select
                        value={region}
                        onChange={(event) =>
                            setRegion(event.target.value as Region)
                        }
                        className="rounded-full border border-[#d9ddd6] bg-white px-4 py-2.5 text-[9px] font-medium text-[#394139] outline-none"
                    >
                        {regions.map((item) => (
                            <option key={item.value} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {loading && (
                <div className="flex h-[220px] items-center justify-center text-[10px] text-[#8a928b]">
                    Loading market prices…
                </div>
            )}

            {error && (
                <div className="flex h-[220px] items-center justify-center text-[10px] text-[#8a928b]">
                    {error}
                </div>
            )}

            {!loading && !error && chartData.length > 0 && (
                <>
                    <div className="mt-8 h-[220px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={chartData}
                                margin={{
                                    top: 10,
                                    right: 12,
                                    bottom: 0,
                                    left: -5,
                                }}
                            >
                                <CartesianGrid
                                    vertical={false}
                                    stroke="#e6e9e5"
                                    strokeDasharray="2 4"
                                />

                                <XAxis
                                    dataKey="timestamp"
                                    axisLine={false}
                                    tickLine={false}
                                    minTickGap={range === "24H" ? 45 : 60}
                                    tickFormatter={
                                        range === "24H"
                                            ? formatTime
                                            : formatDateTime
                                    }
                                    tick={{
                                        fontSize: 8,
                                        fill: "#899089",
                                    }}
                                />

                                <YAxis
                                    width={65}
                                    axisLine={false}
                                    tickLine={false}
                                    tickFormatter={(value) =>
                                        Math.abs(Number(value)) >= 1000
                                            ? `$${(Number(value) / 1000).toFixed(0)}k`
                                            : `$${Math.round(Number(value))}`
                                    }
                                    tick={{
                                        fontSize: 8,
                                        fill: "#899089",
                                    }}
                                />

                                <ReferenceLine
                                    y={0}
                                    stroke="#aeb6af"
                                    strokeWidth={1}
                                />

                                <Tooltip
                                    labelFormatter={(label) =>
                                        formatDateTime(String(label))
                                    }
                                    formatter={(value) => [
                                        `${formatPrice(Number(value))}/MWh`,
                                        selectedRegion,
                                    ]}
                                    contentStyle={{
                                        border: "1px solid #d9ddd6",
                                        borderRadius: "12px",
                                        fontSize: "10px",
                                    }}
                                />

                                <Line
                                    type="monotone"
                                    dataKey="price"
                                    stroke="#176044"
                                    strokeWidth={2}
                                    dot={false}
                                    activeDot={{
                                        r: 3,
                                        fill: "#176044",
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {statistics && (
                        <div className="mt-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e0e4df] bg-[#e0e4df] lg:grid-cols-4">
                            <PriceMetric
                                label="CURRENT"
                                value={`${formatPrice(statistics.current)}/MWh`}
                            />

                            <PriceMetric
                                label={range === "24H" ? "24H AVG" : "7D AVG"}
                                value={`${formatPrice(statistics.average)}/MWh`}
                            />

                            <PriceMetric
                                label={range === "24H" ? "24H HIGH" : "7D HIGH"}
                                value={`${formatPrice(statistics.high)}/MWh`}
                            />

                            <PriceMetric
                                label={range === "24H" ? "24H LOW" : "7D LOW"}
                                value={`${formatPrice(statistics.low)}/MWh`}
                            />
                        </div>
                    )}

                    <div className="mt-5 flex flex-col justify-between gap-2 border-t border-[#e4e7e3] pt-5 sm:flex-row sm:items-center">
                        <p className="text-[8px] text-[#9aa09a]">
                            {selectedRegion} · NEM regional reference price
                        </p>

                        <p className="text-[8px] text-[#9aa09a]">
                            {statistics
                                ? `Latest observation ${formatDateTime(
                                    statistics.timestamp
                                )}`
                                : ""}
                            {" · "}Source: Open Electricity
                        </p>
                    </div>
                </>
            )}
        </section>
    );
}

function PriceMetric({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <div className="bg-white px-5 py-4">
            <p className="text-[7px] tracking-[0.14em] text-[#8a928b]">
                {label}
            </p>

            <p className="mt-2 text-[18px] font-medium tracking-[-0.035em] text-[#171b17]">
                {value}
            </p>
        </div>
    );
}