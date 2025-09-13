"use client";

import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useUser } from "../../../context/Context";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

export default function Page() {
  const {
    getLeetcodeState,
    leetcodeState,
    getLeetcodeProblems,
    leetcodeProblems,
    getLeetcodeHeatmap,
    leetcodeHeatmap,
  } = useUser();

  useEffect(() => {
    getLeetcodeState();
    getLeetcodeHeatmap();
    getLeetcodeProblems();
  }, []);

  // Pie chart data derived from leetcodeState
  const pieData = useMemo(() => {
    const base = leetcodeState?.[0]?.acSubmissionNum || [];
    const map = { All: 0, Easy: 0, Medium: 0, Hard: 0 };
    base.forEach((item) => {
      const key = item.difficulty || item.key || "All";
      if (map.hasOwnProperty(key)) map[key] = Number(item.count) || 0;
    });

    return [
      { name: "Easy", value: map.Easy },
      { name: "Medium", value: map.Medium },
      { name: "Hard", value: map.Hard },
    ];
  }, [leetcodeState]);

  const COLORS = ["#4ade80", "#f59e0b", "#fb7185"];

  // Pagination for problems (10 per page)
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const totalPages = Math.max(
    1,
    Math.ceil((leetcodeProblems?.length || 0) / ITEMS_PER_PAGE)
  );

  useEffect(() => {
    setPage(1);
  }, [leetcodeProblems]);

  const visibleProblems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return leetcodeProblems?.slice(start, start + ITEMS_PER_PAGE) || [];
  }, [leetcodeProblems, page]);

  const heatColor = (v) => {
    if (!v || v === 0) return "bg-gray-200 dark:bg-gray-700";
    if (v <= 1) return "bg-green-100 dark:bg-green-900";
    if (v <= 3) return "bg-green-300 dark:bg-green-700";
    if (v <= 6) return "bg-green-500 dark:bg-green-600";
    return "bg-green-700 dark:bg-green-400";
  };

  return (
    <div className="px-4 py-6 pb-40 min-h-screen bg-transparent text-gray-900 dark:text-gray-100">
      <div className="mx-auto lg:w-[70%] md:w-[80%] sm:w-[95%]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            alt="LeetCode Logo"
            width={50}
            height={50}
          />
          <div>
            <h1 className="text-2xl font-extrabold">LeetCode Stats</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              contribution & solved problems
            </p>
          </div>
        </div>

        {/* Main row: left stats + right pie chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6 items-start">
          {/* Left: stats list */}
          <div className="space-y-4">
            {leetcodeState?.[0] ? (
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
                <h2 className="text-lg font-semibold mb-3">Overview</h2>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Total (All)</span>
                    <span>
                      {leetcodeState[0].acSubmissionNum?.find(
                        (s) => s.difficulty === "All"
                      )?.count ?? "-"}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Points</span>
                    <span>{leetcodeState[0].point ?? "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Ranking</span>
                    <span>{leetcodeState[0].ranking ?? "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Star Rating</span>
                    <span>{leetcodeState[0].starRating ?? "-"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Username</span>
                    <a
                      href={leetcodeState[0]?.profileUrl}
                      className="font-bold text-[#FFA116] hover:underline transition-colors"
                    >
                      <span>{leetcodeState[0].username ?? "-"}</span>
                    </a>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
                Loading stats...
              </div>
            )}

            {/* Heatmap below stats */}
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="font-semibold mb-3">Heatmap</h3>
              <div className="flex flex-wrap gap-1">
                {leetcodeHeatmap && leetcodeHeatmap.length > 0 ? (
                  leetcodeHeatmap.map((h, idx) => (
                    <div
                      key={idx}
                      className={`w-7 h-7 flex items-center justify-center rounded-sm ${heatColor(
                        h.submissions
                      )} text-xs text-gray-800 dark:text-gray-100`}
                      title={`${h.date.slice(0, 15)}: ${
                        h.submissions
                      } submissions`}
                    />
                  ))
                ) : (
                  <p className="text-sm text-gray-500">No heatmap data</p>
                )}
              </div>
            </div>
          </div>

          {/* Right: Pie chart */}
          <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm h-full flex flex-col">
            <h3 className="font-semibold mb-3">Solved by Difficulty</h3>
            <div className="flex-1 flex items-center justify-center min-h-[200px]">
              {pieData && pieData.reduce((s, i) => s + i.value, 0) > 0 ? (
                <ResponsiveContainer width="100%" height={260}>
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={80}
                      paddingAngle={3}
                      label
                    >
                      {pieData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend verticalAlign="bottom" />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <p className="text-sm text-gray-500">No solved problems yet</p>
              )}
            </div>
          </div>
        </div>

        {/* Problems list with pagination */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Solved Problems</h3>
            <div className="text-sm text-gray-500">
              Showing {visibleProblems.length} of{" "}
              {leetcodeProblems?.length ?? 0}
            </div>
          </div>

          <div className="space-y-3">
            {visibleProblems.map((problem, idx) => (
              <div
                key={problem.titleSlug + idx}
                className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700"
              >
                <div>
                  <a
                    href={problem.titleSlug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline text-[#FFA116]"
                  >
                    {problem.title}
                  </a>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-bold text-green-500">Solved On:</span>{" "}
                    {problem.solvedOn
                      ? problem.solvedOn
                          .slice(0, 10)
                          .split("-")
                          .reverse()
                          .join("-")
                      : "-"}
                  </div>
                </div>

                <div className="ml-4">
                  <a
                    href={problem.titleSlug}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm
    hover:bg-[#FFA116] hover:border-[#FFA116] hover:text-white hover:shadow-md cursor-pointer transition-all duration-200"
                  >
                    Try It
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination controls */}
          <div className="mt-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 
             disabled:opacity-50 cursor-pointer 
             hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Prev
              </button>

              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 
             disabled:opacity-50 cursor-pointer 
             hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200"
              >
                Next
              </button>
            </div>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i + 1)}
                  className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer 
      transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
      ${page === i + 1 ? "bg-gray-200 dark:bg-gray-700 font-semibold" : ""}`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
