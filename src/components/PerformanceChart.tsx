"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { performance } from "@/lib/demo-data";

export default function PerformanceChart() {
  return (
    <div className="h-[310px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={performance}
          margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity={0.16} />
              <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid
            stroke="rgba(255,255,255,0.06)"
            vertical={false}
          />

          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#737373", fontSize: 11 }}
          />

          <YAxis
            domain={["dataMin - 2", "dataMax + 2"]}
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#737373", fontSize: 11 }}
          />

          <Tooltip
            contentStyle={{
              background: "#0a0a0a",
              border: "1px solid #262626",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

          <Area
            type="monotone"
            dataKey="portfolio"
            stroke="#ffffff"
            strokeWidth={2}
            fill="url(#portfolioFill)"
          />

          <Area
            type="monotone"
            dataKey="benchmark"
            stroke="#666666"
            strokeWidth={1.5}
            strokeDasharray="5 5"
            fill="transparent"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}