"use client";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

type PerformancePoint = {
  month: string;
  actual: number;
  underwriting: number;
  benchmark: number;
};

type AssetPerformanceChartProps = {
  actualReturn: number;
  underwrittenReturn: number;
  benchmarkReturn: number;
  assetId: string;
};

const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
];

const assetProfiles: Record<string, number[]> = {
  sunshine: [0, 0.09, 0.18, 0.29, 0.39, 0.52, 0.64, 0.75, 0.88, 1],
  western: [0, 0.08, 0.19, 0.28, 0.4, 0.5, 0.62, 0.74, 0.87, 1],
  darling: [0, 0.11, 0.2, 0.31, 0.43, 0.52, 0.65, 0.76, 0.9, 1],
  murray: [0, 0.1, 0.2, 0.3, 0.39, 0.5, 0.61, 0.73, 0.86, 1],
  limestone: [0, 0.08, 0.17, 0.27, 0.38, 0.48, 0.59, 0.71, 0.85, 1],
  pilbara: [0, 0.12, 0.21, 0.33, 0.45, 0.55, 0.66, 0.78, 0.9, 1],
  darwin: [0, 0.1, 0.2, 0.32, 0.42, 0.54, 0.65, 0.77, 0.89, 1],
};

const underwritingProfile = [
  0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 1,
];

const benchmarkProfile = [
  0, 0.09, 0.19, 0.29, 0.39, 0.49, 0.6, 0.71, 0.84, 1,
];

function createSeries(
  assetId: string,
  actualReturn: number,
  underwrittenReturn: number,
  benchmarkReturn: number
): PerformancePoint[] {
  const actualProfile =
    assetProfiles[assetId] ?? underwritingProfile;

  return monthLabels.map((month, index) => ({
    month,
    actual: Number(
      (100 + actualReturn * actualProfile[index]).toFixed(1)
    ),
    underwriting: Number(
      (
        100 +
        underwrittenReturn * underwritingProfile[index]
      ).toFixed(1)
    ),
    benchmark: Number(
      (
        100 +
        benchmarkReturn * benchmarkProfile[index]
      ).toFixed(1)
    ),
  }));
}

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
  }>;
  label?: string;
}) {
  if (!active || !payload?.length) {
    return null;
  }

  return (
    <div className="rounded-xl border border-[#d9ddd6] bg-white px-4 py-3 shadow-lg">
      <p className="mb-2 text-[8px] font-medium tracking-[0.12em] text-[#858b84]">
        {label}
      </p>

      {payload.map((item) => (
        <div
          key={item.name}
          className="flex min-w-[145px] items-center justify-between gap-5 py-0.5"
        >
          <span className="text-[9px] capitalize text-[#737b74]">
            {item.name}
          </span>

          <span className="text-[10px] font-medium text-[#1c211d]">
            {item.value.toFixed(1)}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AssetPerformanceChart({
  actualReturn,
  underwrittenReturn,
  benchmarkReturn,
  assetId,
}: AssetPerformanceChartProps) {
  const data = createSeries(
    assetId,
    actualReturn,
    underwrittenReturn,
    benchmarkReturn
  );

  const allValues = data.flatMap((point) => [
    point.actual,
    point.underwriting,
    point.benchmark,
  ]);

  const minimum = Math.floor(Math.min(...allValues) - 2);
  const maximum = Math.ceil(Math.max(...allValues) + 2);

  return (
    <div className="mt-9">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-[8px] tracking-[0.14em] text-[#858b84]">
          CUMULATIVE PERFORMANCE · INDEX = 100
        </p>

        <div className="flex flex-wrap items-center gap-5 text-[8px] tracking-[0.08em] text-[#747c75]">
          <span className="flex items-center gap-2">
            <span className="h-[2px] w-5 bg-[#176044]" />
            ACTUAL
          </span>

          <span className="flex items-center gap-2">
            <span className="w-5 border-t border-dashed border-[#83968a]" />
            UNDERWRITING
          </span>

          <span className="flex items-center gap-2">
            <span className="w-5 border-t border-dotted border-[#b3bbb5]" />
            BENCHMARK
          </span>
        </div>
      </div>

      <div className="h-[285px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 8,
              right: 10,
              bottom: 0,
              left: -18,
            }}
          >
            <CartesianGrid
              vertical={false}
              stroke="#e5e9e5"
              strokeDasharray="2 4"
            />

            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 9,
                fill: "#8a918b",
              }}
              dy={8}
            />

            <YAxis
              domain={[minimum, maximum]}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 9,
                fill: "#8a918b",
              }}
              width={42}
            />

            <Tooltip
              content={<ChartTooltip />}
              cursor={{
                stroke: "#ccd4ce",
                strokeWidth: 1,
              }}
            />

            <Line
              type="monotone"
              dataKey="benchmark"
              name="Benchmark"
              stroke="#b3bbb5"
              strokeWidth={1.5}
              strokeDasharray="2 5"
              dot={false}
              activeDot={{
                r: 3,
                strokeWidth: 0,
              }}
            />

            <Line
              type="monotone"
              dataKey="underwriting"
              name="Underwriting"
              stroke="#83968a"
              strokeWidth={1.75}
              strokeDasharray="6 5"
              dot={false}
              activeDot={{
                r: 3,
                strokeWidth: 0,
              }}
            />

            <Line
              type="monotone"
              dataKey="actual"
              name="Actual"
              stroke="#176044"
              strokeWidth={2.75}
              dot={false}
              activeDot={{
                r: 4,
                fill: "#176044",
                stroke: "#ffffff",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}