"use client";
import React, { useEffect } from "react";
import { useUser } from "../../context/Context";
import { motion } from "framer-motion";
import { Trophy, Star, Code2, Flame, Award, ExternalLink } from "lucide-react";
import Image from "next/image";

function Stats() {
  const { getLeetcodeState, leetcodeState, getGfgStats, gfgState } = useUser();

  useEffect(() => {
    if (!leetcodeState || !gfgState) {
      getGfgStats();
      getLeetcodeState();
    }
  }, []);

  return (
    <section className="w-full px-6 py-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <div className="pb-12">
          <motion.h2
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--heading-color)]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Coding Stats
          </motion.h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-3 shadow-lg"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-6 items-stretch">
          {/* LeetCode Card */}
          <motion.div
            className="card shadow-lg hover:shadow-xl rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[#FFA116] group transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] max-w-lg flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-[#FFA116] to-[#FFB84D] p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
                    alt="LeetCode"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">LeetCode</h3>
              </div>
            </div>

            {/* Content - Compact */}
            <div className="p-5 flex-1 flex flex-col">
              {leetcodeState && leetcodeState[0] ? (
                <>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="bg-gradient-to-br from-[#FFA116]/10 to-[#FFB84D]/10 rounded-xl p-3 border border-[#FFA116]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Rank
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {leetcodeState[0].ranking?.toLocaleString()}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFA116]/10 to-[#FFB84D]/10 rounded-xl p-3 border border-[#FFA116]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Code2 className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Solved
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {leetcodeState[0].acSubmissionNum[0].count}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFA116]/10 to-[#FFB84D]/10 rounded-xl p-3 border border-[#FFA116]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Rating
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {leetcodeState[0].starRating}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#FFA116]/10 to-[#FFB84D]/10 rounded-xl p-3 border border-[#FFA116]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Award className="w-4 h-4 text-[#FFA116]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Badges
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {leetcodeState[0].badges.length}
                      </p>
                    </div>
                  </div>

                  {/* Footer Links - Compact */}
                  <div className="flex gap-3 pt-4 border-t border-[var(--border-color)] mt-4">
                    <a
                      href="/leetcode/problems"
                      className="flex items-center gap-1 text-xs font-medium text-[#FFA116] hover:text-[#FFB84D] transition-colors"
                    >
                      Problems
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[var(--border-color)]">•</span>
                    <a
                      href={leetcodeState[0]?.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-[#FFA116] hover:text-[#FFB84D] transition-colors"
                    >
                      Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-[var(--subheading-color)]">
                    Loading stats...
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* GFG Card */}
          <motion.div
            className="card shadow-lg hover:shadow-xl rounded-2xl overflow-hidden border border-[var(--border-color)] hover:border-[#0F9D58] group transition-all duration-300 w-full sm:w-[calc(50%-0.75rem)] max-w-lg flex flex-col"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Header - Compact */}
            <div className="bg-gradient-to-r from-[#0F9D58] to-[#34A853] p-4">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-md">
                  <Image
                    src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
                    alt="GeeksforGeeks"
                    width={24}
                    height={24}
                  />
                </div>
                <h3 className="text-xl font-bold text-white">GeeksforGeeks</h3>
              </div>
            </div>

            {/* Content - Compact */}
            <div className="p-5 flex-1 flex flex-col">
              {gfgState && gfgState[0] ? (
                <>
                  <div className="grid grid-cols-2 gap-3 flex-1">
                    <div className="bg-gradient-to-br from-[#0F9D58]/10 to-[#34A853]/10 rounded-xl p-3 border border-[#0F9D58]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Code2 className="w-4 h-4 text-[#0F9D58]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Solved
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {gfgState[0].totalProblemsSolved}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F9D58]/10 to-[#34A853]/10 rounded-xl p-3 border border-[#0F9D58]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Star className="w-4 h-4 text-[#0F9D58]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Score
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {gfgState[0].codingScore}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F9D58]/10 to-[#34A853]/10 rounded-xl p-3 border border-[#0F9D58]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Trophy className="w-4 h-4 text-[#0F9D58]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Rank
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {gfgState[0].instituteRank}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F9D58]/10 to-[#34A853]/10 rounded-xl p-3 border border-[#0F9D58]/20">
                      <div className="flex items-center gap-1.5 mb-1">
                        <Flame className="w-4 h-4 text-[#0F9D58]" />
                        <span className="text-xs font-medium text-[var(--subheading-color)]">
                          Streak
                        </span>
                      </div>
                      <p className="text-xl font-bold text-[var(--heading-color)]">
                        {gfgState[0].currentStreak}
                      </p>
                    </div>

                    <div className="bg-gradient-to-br from-[#0F9D58]/10 to-[#34A853]/10 rounded-xl p-3 border border-[#0F9D58]/20 col-span-2">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-1.5 mb-1">
                            <Star className="w-4 h-4 text-[#0F9D58]" />
                            <span className="text-xs font-medium text-[var(--subheading-color)]">
                              Max Streak
                            </span>
                          </div>
                          <p className="text-lg font-bold text-[var(--heading-color)]">
                            {gfgState[0].maxStreak} days
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center gap-1.5 mb-1 justify-end">
                            <Code2 className="w-4 h-4 text-[#0F9D58]" />
                            <span className="text-xs font-medium text-[var(--subheading-color)]">
                              POTD
                            </span>
                          </div>
                          <p className="text-lg font-bold text-[var(--heading-color)]">
                            {gfgState[0].potdSolved}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Footer Links - Compact */}
                  <div className="flex gap-3 pt-4 border-t border-[var(--border-color)] mt-4">
                    <a
                      href="/geeksforgeek/problems"
                      className="flex items-center gap-1 text-xs font-medium text-[#0F9D58] hover:text-[#34A853] transition-colors"
                    >
                      Problems
                      <ExternalLink className="w-3 h-3" />
                    </a>
                    <span className="text-[var(--border-color)]">•</span>
                    <a
                      href={gfgState[0]?.profileUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 text-xs font-medium text-[#0F9D58] hover:text-[#34A853] transition-colors"
                    >
                      Profile
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-sm text-[var(--subheading-color)]">
                    Loading stats...
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Stats;
