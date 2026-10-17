"use client";

import {
  Line,
  LineChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { performance } from "@/lib/demo-data";

export default function PerformanceChart() {
  return (
    <div className="h-[330px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={performance}
          margin={{ top: 15, right: 12, left: -20, bottom: 0 }}
        >
          <CartesianGrid
            stroke="var(--chart-grid)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted)",
              fontSize: 10,
            }}
          />

          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            axisLine={false}
            tickLine={false}
            tick={{
              fill: "var(--muted)",
              fontSize: 10,
            }}
          />

          <Tooltip
            contentStyle={{
              background: "var(--tooltip-bg)",
              border: "1px solid var(--border)",
              borderRadius: "10px",
              color: "var(--foreground)",
              boxShadow: "var(--tooltip-shadow)",
              fontSize: "12px",
            }}
          />

          <Line
            type="monotone"
            dataKey="portfolio"
            stroke="var(--chart-primary)"
            strokeWidth={2.4}
            dot={false}
            activeDot={{ r: 4 }}
          />

          <Line
            type="monotone"
            dataKey="underwriting"
            stroke="var(--chart-underwriting)"
            strokeWidth={1.5}
            strokeDasharray="2 4"
            dot={false}
          />

          <Line
            type="monotone"
            dataKey="benchmark"
            stroke="var(--chart-benchmark)"
            strokeWidth={1.3}
            strokeDasharray="7 6"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}