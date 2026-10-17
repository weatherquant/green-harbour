"use client";

import { useMemo, useState } from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type Range = "24H" | "7D" | "30D";

type Props = {
  assetId: string;
};

const profiles: Record<string, number> = {
  sunshine: 1.08,
  western: 0.94,
  darling: 1.01,
  murray: 0.88,
  limestone: 0.76,
  pilbara: 0.98,
  darwin: 0.96,
};

function make24Hours(multiplier: number) {
  return Array.from({ length: 24 }, (_, hour) => {
    let power = 0;

    if (hour >= 1 && hour <= 4) {
      power = -(2.5 + ((hour * 0.7) % 2));
    } else if (hour >= 7 && hour <= 9) {
      power = 2.8 + ((hour * 0.6) % 2);
    } else if (hour >= 11 && hour <= 14) {
      power = -(3.1 + ((hour * 0.4) % 1.6));
    } else if (hour >= 17 && hour <= 20) {
      power = 3.4 + ((hour * 0.5) % 1.5);
    }

    return {
      time: `${String(hour).padStart(2, "0")}:00`,
      power: Number((power * multiplier).toFixed(1)),
    };
  });
}

function makeDays(days: number, multiplier: number) {
  return Array.from({ length: days }, (_, index) => {
    const swing =
      Math.sin(index * 0.85) * 0.7 +
      Math.cos(index * 0.37) * 0.35;

    return {
      time: `D${index + 1}`,
      power: Number((swing * 4.2 * multiplier).toFixed(1)),
    };
  });
}

export default function RecentAssetPerformance({ assetId }: Props) {
  const [range, setRange] = useState<Range>("24H");

  const multiplier = profiles[assetId] ?? 1;

  const data = useMemo(() => {
    if (range === "24H") return make24Hours(multiplier);
    if (range === "7D") return makeDays(7, multiplier);
    return makeDays(30, multiplier);
  }, [range, multiplier]);

  const metrics = {
    "24H": {
      discharged: 8.7 * multiplier,
      charged: 11.2 * multiplier,
      revenue: 1840 * multiplier,
      availability: 99.4,
    },
    "7D": {
      discharged: 61.4 * multiplier,
      charged: 73.8 * multiplier,
      revenue: 12780 * multiplier,
      availability: 99.2,
    },
    "30D": {
      discharged: 258 * multiplier,
      charged: 309 * multiplier,
      revenue: 54820 * multiplier,
      availability: 98.9,
    },
  }[range];

  return (
    <section className="rounded-2xl border border-[#d9ddd6] bg-white p-7 lg:p-10">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div>
          <p className="text-[8px] font-medium tracking-[0.16em] text-[#758078]">
            RECENT ASSET PERFORMANCE
          </p>

          <h2 className="mt-3 text-[27px] font-medium tracking-[-0.04em] text-[#151915]">
            Recent operation
          </h2>

          <p className="mt-2 max-w-[560px] text-[10px] leading-5 text-[#737b74]">
            Recent charging and discharging activity and associated
            economic performance.
          </p>
        </div>

        <div className="flex rounded-full border border-[#d9ddd6] p-1">
          {(["24H", "7D", "30D"] as Range[]).map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setRange(item)}
              className={`rounded-full px-4 py-2 text-[8px] font-medium tracking-[0.1em] transition ${
                range === item
                  ? "bg-[#173f32] text-white"
                  : "text-[#7c847d] hover:text-[#173f32]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-[#e0e4df] bg-[#e0e4df] lg:grid-cols-4">
        <Metric
          label="DISCHARGED"
          value={`${metrics.discharged.toFixed(1)} MWh`}
        />
        <Metric
          label="CHARGED"
          value={`${metrics.charged.toFixed(1)} MWh`}
        />
        <Metric
          label="REVENUE"
          value={`$${Math.round(metrics.revenue).toLocaleString()}`}
        />
        <Metric
          label="AVAILABILITY"
          value={`${metrics.availability.toFixed(1)}%`}
        />
      </div>

      <div className="mt-9">
        <div className="flex items-center justify-between">
          <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
            CHARGE / DISCHARGE
          </p>

          <p className="text-[8px] tracking-[0.1em] text-[#9aa09a]">
            MW
          </p>
        </div>

        <div className="mt-5 h-[270px]">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={data}
              margin={{
                top: 10,
                right: 10,
                bottom: 0,
                left: -20,
              }}
            >
              <CartesianGrid
                vertical={false}
                stroke="#e6e9e5"
                strokeDasharray="2 4"
              />

              <XAxis
                dataKey="time"
                axisLine={false}
                tickLine={false}
                minTickGap={25}
                tick={{
                  fontSize: 8,
                  fill: "#899089",
                }}
              />

              <YAxis
                domain={[-5, 5]}
                axisLine={false}
                tickLine={false}
                tick={{
                  fontSize: 8,
                  fill: "#899089",
                }}
              />

              <Tooltip
                formatter={(value) => [
                  `${Number(value).toFixed(1)} MW`,
                  "Power",
                ]}
                contentStyle={{
                  border: "1px solid #d9ddd6",
                  borderRadius: "12px",
                  fontSize: "10px",
                }}
              />

              <Area
                type="monotone"
                dataKey="power"
                stroke="#176044"
                fill="#dce9e2"
                strokeWidth={2}
              />

              <Bar
                dataKey="power"
                fill="#176044"
                opacity={0.18}
                barSize={range === "24H" ? 8 : undefined}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-4 flex gap-6 text-[8px] tracking-[0.08em] text-[#8b928c]">
          <span>+ DISCHARGING</span>
          <span>− CHARGING</span>
        </div>
      </div>

      <p className="mt-7 border-t border-[#e4e7e3] pt-5 text-[8px] leading-4 text-[#9aa09a]">
        Illustrative operating data pending connection to asset telemetry.
      </p>
    </section>
  );
}

function Metric({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="bg-white px-5 py-5 lg:px-6">
      <p className="text-[7px] tracking-[0.14em] text-[#8a928b]">
        {label}
      </p>

      <p className="mt-3 text-[20px] font-medium tracking-[-0.035em] text-[#171b17]">
        {value}
      </p>
    </div>
  );
}