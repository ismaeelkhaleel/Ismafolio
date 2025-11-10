"use client";
import React, { useEffect } from "react";
import { useUser } from "../../context/Context";
import { motion } from "framer-motion";
import { Trophy, Star, Code2, Flame, User,Award } from "lucide-react";
import Image from "next/image";

function Stats() {
  const { getLeetcodeState, leetcodeState, getGfgStats, gfgState } = useUser();

  useEffect(() => {
    if (!leetcodeState || !gfgState) {
      getGfgStats();
      getLeetcodeState();
    }
  }, []);
 

  const cardClasses =
    "w-full md:flex-1 max-w-md h-[300px] rounded-2xl shadow-sm transition-transform transition-shadow duration-300 p-5 flex flex-col justify-between card";

  return (
    <section className="w-full flex flex-col items-center p-6">
      <div className="pb-6">
        <h2 className="text-3xl md:text-3xl text-center mb-4 text-[var(--heading-color)]">
          Stats
        </h2>
        <div className="w-30 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 animate-gradient-x" />
      </div>

      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-stretch gap-6">
        {/* LeetCode Card */}
        <motion.div className={cardClasses} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--heading-color)]">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                alt="LeetCode Logo"
                width={22}
                height={22}
              />
              LeetCode Stats
            </h2>
            {leetcodeState && leetcodeState[0] && (
              <div className="space-y-3 text-sm text-[var(--text-color)]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {leetcodeState[0].username}
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Rank: {leetcodeState[0].ranking}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Points: {leetcodeState[0].point}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Rating: {leetcodeState[0].starRating}
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Solved: {leetcodeState[0].acSubmissionNum[0].count}
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" /> Badges: {leetcodeState[0].badges.length}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <a href="/leetcode/problems" className="text-xs font-medium text-[#FFA116] hover:underline">
              View Problems
            </a>
            {leetcodeState && (
              <a href={leetcodeState[0]?.profileUrl} target="_blank" className="text-xs font-medium text-[#FFA116] hover:underline">
                View Profile
              </a>
            )}
          </div>
        </motion.div>

        {/* GFG Card */}
        <motion.div className={cardClasses} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div>
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2 text-[var(--heading-color)]">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                alt="GFG Logo"
                width={22}
                height={22}
              />
              GFG Stats
            </h2>
            {gfgState && gfgState[0] && (
              <div className="space-y-3 text-sm text-[var(--text-color)]">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" /> {gfgState[0].username}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Score: {gfgState[0].codingScore}
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="w-4 h-4" /> Rank: {gfgState[0].instituteRank}
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4" /> Monthly: {gfgState[0].monthlyScore}
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-4 h-4" /> Streak: {gfgState[0].currentStreak}
                </div>
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4" /> Solved: {gfgState[0].totalProblemsSolved}
                </div>
              </div>
            )}
          </div>
          <div className="flex gap-3 pt-4">
            <a href="/geeksforgeek/problems" className="text-xs font-medium text-[#0F9D58] hover:underline">
              View Problems
            </a>
            {gfgState && (
              <a href={gfgState[0]?.profileUrl} target="_blank" className="text-xs font-medium text-[#0F9D58] hover:underline">
                View Profile
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default Stats;
