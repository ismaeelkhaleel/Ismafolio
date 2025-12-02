"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useUser } from "../../../context/Context";
import Image from "next/image";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import Loader from "../../../components/buttons/Loader"; // make sure the path is correct

export default function GfgPage() {
  const { getGfgStats, gfgState, getGfgProblems, gfgProblems } = useUser();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!gfgState || !gfgProblems) {
      setLoading(true);
      Promise.all([getGfgStats(), getGfgProblems()]).finally(() =>
        setLoading(false)
      );
    }
  }, [getGfgStats, getGfgProblems, gfgState, gfgProblems]);

  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("All");

  const filteredProblems = useMemo(() => {
    if (!gfgProblems) return [];
    if (filter === "All") return gfgProblems;
    return gfgProblems.filter(
      (p) => p.level?.toLowerCase() === filter.toLowerCase()
    );
  }, [gfgProblems, filter]);

  const totalPages = Math.max(
    1,
    Math.ceil((filteredProblems?.length || 0) / ITEMS_PER_PAGE)
  );

  const visibleProblems = useMemo(() => {
    const start = (page - 1) * ITEMS_PER_PAGE;
    return filteredProblems.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProblems, page]);

  useEffect(() => setPage(1), [filter]);

  const pieData = useMemo(() => {
    if (!gfgProblems) return [];
    return [
      { name: "Basic", value: gfgProblems.filter((p) => p.level?.toLowerCase() === "basic").length },
      { name: "Easy", value: gfgProblems.filter((p) => p.level?.toLowerCase() === "easy").length },
      { name: "Medium", value: gfgProblems.filter((p) => p.level?.toLowerCase() === "medium").length },
      { name: "Hard", value: gfgProblems.filter((p) => p.level?.toLowerCase() === "hard").length },
    ];
  }, [gfgProblems]);

  const COLORS = ["#22c55e", "#16a34a", "#facc15", "#f43f5e"];

  const getPaginationNumbers = () => {
    if (totalPages <= 1) return [1];
    const pages = [1];
    if (page - 1 > 1) pages.push(page - 1);
    if (page !== 1 && page !== totalPages) pages.push(page);
    if (page + 1 < totalPages) pages.push(page + 1);
    if (totalPages > 1) pages.push(totalPages);
    return [...new Set(pages)].sort((a, b) => a - b);
  };

  // 🔹 Show loader for the whole page
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-40 min-h-screen bg-transparent text-gray-900 dark:text-gray-100">
      <div className="mx-auto lg:w-[70%] md:w-[85%] sm:w-[95%]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
            alt="GFG Logo"
            width={50}
            height={50}
          />
          <div>
            <h1 className="text-2xl font-extrabold">GFG Stats</h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              contribution & solved problems
            </p>
          </div>
        </div>

        {/* Stats and Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Stats */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm space-y-4">
            {gfgState?.[0] ? (
              <div className="space-y-2">
                <h3 className="text-xl font-bold">Overview</h3>
                <div className="flex justify-between">
                  <span className="font-medium">Coding Score</span>
                  <span>{gfgState[0].codingScore ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Current Streak</span>
                  <span>{gfgState[0].currentStreak ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Max Streak</span>
                  <span>{gfgState[0].maxStreak ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Institute Rank</span>
                  <span>{gfgState[0].instituteRank ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Problems Solved</span>
                  <span>{gfgState[0].totalProblemsSolved ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">POTD Solved</span>
                  <span>{gfgState[0].potdSolved ?? "-"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Username</span>
                  <a
                    href={gfgState[0]?.profileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-green-600 hover:text-green-700 transition-colors"
                  >
                    {gfgState[0].username ?? "-"}
                  </a>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500">No stats found</p>
            )}
          </div>

          {/* Pie Chart */}
          <div className="p-6 rounded-2xl bg-white dark:bg-gray-800 shadow-sm flex flex-col items-center justify-center">
            <h3 className="font-semibold mb-2">Solved by Difficulty</h3>
            <div className="w-full h-60">
              {pieData.reduce((s, i) => s + i.value, 0) > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      dataKey="value"
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
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

        {/* Problems Section */}
        <div className="p-4 rounded-2xl bg-white dark:bg-gray-800 shadow-sm">
          {/* Filters */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <h3 className="font-semibold">Solved Problems</h3>
            <div className="flex gap-2">
              {["All", "Basic", "Easy", "Medium", "Hard"].map((opt) => (
                <button
                  key={opt}
                  onClick={() => setFilter(opt)}
                  className={`px-3 py-1 rounded-md border text-sm transition-all duration-200 cursor-pointer
                    ${
                      filter === opt
                        ? "bg-green-600 text-white"
                        : "bg-transparent hover:bg-gray-200 dark:hover:bg-gray-700"
                    }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Problems List */}
          <div className="space-y-3">
            {visibleProblems.length > 0 ? (
              visibleProblems.map((problem, idx) => (
                <div
                  key={problem.titleSlug + idx}
                  className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-700"
                >
                  <div>
                    <a
                      href={`${problem.titleSlug}/0`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-green-600 hover:text-green-700 hover:underline transition-colors"
                    >
                      {problem.title}
                    </a>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-bold">Difficulty:</span>{" "}
                      <span className="capitalize">{problem.level ?? "-"}</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <a
                      href={`${problem.titleSlug}/0`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-3 py-1.5 rounded-md border border-gray-300 dark:border-gray-600 shadow-sm
                        hover:bg-green-600 hover:text-white hover:shadow-md cursor-pointer transition-all duration-200"
                    >
                      Try It
                    </a>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-500">No problems found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
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

            <div className="flex gap-2 flex-wrap justify-center">
              {getPaginationNumbers().map((num) => (
                <button
                  key={`page-${num}`}
                  onClick={() => setPage(num)}
                  className={`px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 cursor-pointer 
                    transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700
                    ${
                      page === num
                        ? "bg-gray-200 dark:bg-gray-700 font-semibold"
                        : ""
                    }`}
                >
                  {num}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}