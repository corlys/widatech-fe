"use client";

import { useState, useEffect } from "react";
import {
  selectRevenues,
  selectStatus,
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

export default function Graph() {
  const dispatch = useAppDispatch();
  const revenuesSelector = useAppSelector(selectRevenues);
  const statusSelector = useAppSelector(selectStatus);

  const [revenueType, setRevenueType] = useState<
    "daily" | "weekly" | "monthly"
  >("daily");

  useEffect(() => {
    void dispatch(fetchRevenues(revenueType));
  }, [dispatch, revenueType]);

  useEffect(() => {
    console.log(revenuesSelector);
  }, [revenuesSelector]);

  return (
    <div className="container flex min-h-screen flex-col items-center justify-between gap-4 py-8 text-[#405D72]">
      <div className="h-[500px] w-1/2">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={revenuesSelector}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis scale="log" domain={["auto", "auto"]} />
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
      <div className="mx-auto flex items-center justify-between">
        <button onClick={() => setRevenueType("daily")}>daily</button>
        <button onClick={() => setRevenueType("weekly")}>weekly</button>
        <button onClick={() => setRevenueType("monthly")}>monthly</button>
      </div>
    </div>
  );
}
