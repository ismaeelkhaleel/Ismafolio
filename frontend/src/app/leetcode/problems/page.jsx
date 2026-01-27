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

export default function LeetcodeUI() {
  const { leetcodeHeatmap, leetcodeProblems, leetcodeState } = useUser();

  /* ------------------ PIE DATA ------------------ */
  const pieData = useMemo(() => {
    const base = leetcodeState?.[0]?.acSubmissionNum || [];
    const map = { Easy: 0, Medium: 0, Hard: 0 };

    base.forEach((item) => {
      if (map[item.difficulty] !== undefined) {
        map[item.difficulty] = Number(item.count) || 0;
      }
    });

    return [
      { name: "Easy", value: map.Easy },
      { name: "Medium", value: map.Medium },
      { name: "Hard", value: map.Hard },
    ];
  }, [leetcodeState]);

  const COLORS = ["#4ade80", "#f59e0b", "#fb7185"];

  /* ------------------ PAGINATION ------------------ */
  const ITEMS_PER_PAGE = 20;
  const [page, setPage] = useState(1);

  const totalPages = Math.max(
    1,
    Math.ceil((leetcodeProblems?.length || 0) / ITEMS_PER_PAGE),
  );

  useEffect(() => {
    setPage(1);
  }, [leetcodeProblems]);

  const visibleProblems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return leetcodeProblems?.slice(start, start + ITEMS_PER_PAGE) || [];
  }, [leetcodeProblems, page]);

  /* ------------------ HEATMAP COLOR ------------------ */
  const heatColor = (v) => {
    if (!v) return "bg-gray-200 dark:bg-gray-700";
    if (v <= 1) return "bg-green-100 dark:bg-green-900";
    if (v <= 3) return "bg-green-300 dark:bg-green-700";
    if (v <= 6) return "bg-green-500 dark:bg-green-600";
    return "bg-green-700 dark:bg-green-400";
  };
  return (
    <div className="px-4 py-6 pb-40 min-h-screen text-gray-900 dark:text-gray-100">
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

        {/* Overview + Pie */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
              <h2 className="font-semibold mb-3">Overview</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Total Solved</span>
                  <span>
                    {
                      leetcodeState?.[0]?.acSubmissionNum?.find(
                        (s) => s.difficulty === "All",
                      )?.count
                    }
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Ranking</span>
                  <span>{leetcodeState?.[0]?.ranking ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Points</span>
                  <span>{leetcodeState?.[0]?.point ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Star Rating</span>
                  <span>{leetcodeState?.[0]?.starRating ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span>Username</span>
                  <a
                    href={leetcodeState?.[0]?.profileUrl}
                    className="text-[#FFA116] font-semibold"
                  >
                    {leetcodeState?.[0]?.username}
                  </a>
                </div>
              </div>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
              <h3 className="font-semibold mb-3">Badges</h3>
              <div className="flex flex-wrap justify-center gap-4">
                {leetcodeState?.[0]?.badges &&
                leetcodeState[0].badges.length > 0 ? (
                  leetcodeState[0].badges.map((badge, idx) => (
                    <div key={idx} className="flex flex-col items-center w-30">
                      <img
                        src={badge.icon}
                        alt={badge.name}
                        className="w-20 h-20 mb-2"
                      />
                      <span className="text-xs text-center">
                        {badge.displayName}
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-gray-500 text-center">
                    No badges earned yet
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
            <h3 className="font-semibold mb-3">Solved by Difficulty</h3>
            <ResponsiveContainer width="100%" height={260}>
              <PieChart>
                <Pie
                  data={pieData}
                  dataKey="value"
                  innerRadius={50}
                  outerRadius={80}
                  label
                >
                  {pieData.map((_, i) => (
                    <Cell key={i} fill={COLORS[i]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Heatmap */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm mb-6">
          <h3 className="font-semibold mb-3">Heatmap</h3>
          <div className="flex flex-wrap gap-1">
            {leetcodeHeatmap?.map((h) => (
              <div
                key={h._id}
                className={`w-7 h-7 rounded-sm ${heatColor(h.submissions)}`}
              />
            ))}
          </div>
        </div>

        {/* Problems + Pagination */}
        <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold">Solved Problems</h3>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Showing {visibleProblems.length} of{" "}
              {leetcodeProblems?.length || 0}
            </span>
          </div>

          {/* Problem List */}
          <div className="space-y-4">
            {visibleProblems.map((p) => (
              <div
                key={p._id}
                className="flex justify-between items-center p-5 rounded-xl bg-gray-100 dark:bg-gray-900"
              >
                <div>
                  <h4 className="font-semibold text-base !text-[#FFA116]">
                    {p.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    <span className="font-semibold">Solved On:</span>{" "}
                    {new Date(p.solvedOn).toLocaleDateString("en-GB")}
                  </p>
                </div>

                <a
                  href={p.titleSlug}
                  target="_blank"
                  className="px-5 py-2 rounded-lg border font-medium text-gray-900 dark:text-gray-100 hover:shadow-sm hover:bg-[#FFA116] hover:border-none transition"
                >
                  Try It
                </a>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-between items-center mt-8">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Prev
            </button>

            <span className="text-sm text-gray-600 dark:text-gray-400">
              Page {page} of {totalPages}
            </span>

            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 rounded-lg border disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
