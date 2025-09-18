"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Loader from "../buttons/Loader";

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getSkills, skills } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getSkills().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getSkills]);

  return (
    <section ref={ref} className="bg-transparent">
      {!loading && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500 dark:text-emerald-400">
          Skills
        </h2>
      )}
      {!loading && skills?.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No skill data found.
        </p>
      )}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 relative">
        {skills?.map((skill, index) => (
          <motion.div
            key={skill._id}
            className="relative flex items-center gap-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm dark:shadow-lg min-w-[280px] max-w-[350px] w-full hover:shadow-lg hover:border-emerald-400 transition-shadow duration-300 p-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            {/* Left Icon */}
            {skill.icon && (
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain filter dark:brightness-90"
                />
              </div>
            )}

            {/* Right Content */}
            <div className="flex flex-col flex-1">
              {/* Name + Level (Top Row) */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                  {skill.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {skill.level}
                </p>
              </div>

              {/* Rating bar (Bottom Row) */}
              <div className="mt-2">
                <div className="w-full h-2 bg-gray-200 dark:bg-zinc-700 rounded-full">
                  <div
                    className="h-2 bg-emerald-500 rounded-full"
                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 block">
                  {skill.rating}/10
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;
