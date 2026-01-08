"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getSkills, skills } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched && !skills) {
      setLoading(true);
      getSkills().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getSkills]);

  return (
    <section ref={ref} className="bg-transparent py-16">
      {!loading && (
        <div className="pb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--heading-color)]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Skills & Expertise
          </motion.h2>
          <motion.div 
            className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-3 shadow-lg"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </div>
      )}

      {!skills && (
        <p className="text-center text-lg text-[var(--subheading-color)]">
          No skill data found.
        </p>
      )}

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills?.map((skill, index) => (
          <motion.div
            key={skill._id}
            className="card shadow-lg hover:shadow-xl transition-all duration-300 p-6 rounded-2xl border border-[var(--border-color)] hover:border-emerald-400 group relative overflow-hidden"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ y: -8 }}
          >
            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
            
            <div className="relative z-10">
              {/* Icon and Title Row */}
              <div className="flex items-center gap-4 mb-4">
                {skill.icon && (
                  <div className="relative w-16 h-16 flex-shrink-0 p-2 rounded-xl bg-gradient-to-br from-emerald-400/10 via-purple-500/10 to-pink-500/10 group-hover:scale-110 transition-transform duration-300">
                    <Image
                      src={skill.icon}
                      alt={skill.name}
                      fill
                      className="object-contain p-1"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-[var(--heading-color)] mb-1 group-hover:text-emerald-500 transition-colors duration-300">
                    {skill.name}
                  </h3>
                  <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-gradient-to-r from-emerald-400/20 via-purple-500/20 to-pink-500/20 text-[var(--subheading-color)]">
                    {skill.level}
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-[var(--text-color)]">
                    Proficiency
                  </span>
                  <span className="text-sm font-bold text-[var(--subheading-color)]">
                    {skill.rating}/10
                  </span>
                </div>
                <div className="relative w-full h-3 bg-[var(--progress-bg)] rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 shadow-md"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${(skill.rating / 10) * 100}%` }}
                    transition={{ duration: 1, delay: index * 0.1 + 0.3, ease: "easeOut" }}
                    viewport={{ once: true }}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;