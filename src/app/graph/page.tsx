"use client";

import { useState, useEffect, useMemo } from "react";
import {
  selectRevenues,
  fetchRevenues,
} from "~/lib/features/revenue/revenueSlice";
import { useAppDispatch, useAppSelector } from "~/lib/hooks";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Button from "~/components/Button";

export default function Graph() {
  const dispatch = useAppDispatch();
  const revenuesSelector = useAppSelector(selectRevenues);

  const [minRevenue, maxRevenue] = useMemo(() => {
    if (revenuesSelector.length === 0) return [0, 100];
    const revenues = revenuesSelector.map((item) =>
      parseFloat(item.revenue.toString()),
    );
    console.log([Math.min(...revenues), Math.max(...revenues)], "maxmin");
    return [Math.min(...revenues), Math.max(...revenues)];
  }, [revenuesSelector]);

  const padding = (maxRevenue - minRevenue) * 0.1;

  const [revenueType, setRevenueType] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  useEffect(() => {
    void dispatch(fetchRevenues(revenueType));
  }, [dispatch, revenueType]);

  useEffect(() => {
    console.log(revenuesSelector);
  }, [revenuesSelector]);

  const formatXAxis = (value: string) => {
    const date = new Date(value);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  };

  return (
    <div className="container flex min-h-screen flex-col items-center justify-center gap-8 py-8 text-[#405D72]">
      <div className="h-[500px] w-full max-w-3xl">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={revenuesSelector}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tickFormatter={formatXAxis} />
            <YAxis
              reversed={false}
              domain={[Math.max(0, minRevenue - padding), maxRevenue + padding]}
            />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="flex gap-4">
        {["daily", "weekly", "monthly"].map((type) => (
          <Button
            key={type}
            onClick={() =>
              setRevenueType(type as "daily" | "weekly" | "monthly")
            }
          >
            {type}
          </Button>
        ))}
      </div>
    </div>
  );
}
