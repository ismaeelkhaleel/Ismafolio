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
    <section ref={ref} className="bg-transparent">
      {!loading && (
        <div className="pb-6">
          <h2 className="text-3xl md:text-3xl text-center mb-4 text-[var(--heading-color)]">
            Skills
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 animate-gradient-x" />
        </div>
      )}

      {!skills && (
        <p className="text-center text-[var(--subheading-color)]">
          No skill data found.
        </p>
      )}

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 relative">
        {skills?.map((skill, index) => (
          <motion.div
            key={skill._id}
            className="card shadow-sm hover:shadow-lg transition-transform transition-shadow duration-300 min-w-[280px] max-w-[350px] w-full p-4 flex items-center gap-4"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
          >
            {skill.icon && (
              <div className="relative w-14 h-14 flex-shrink-0">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-[var(--heading-color)]">
                  {skill.name}
                </h3>
                <p className="text-sm text-[var(--subheading-color)]">
                  {skill.level}
                </p>
              </div>
              <div className="mt-2">
                <div className="w-full h-2 bg-[var(--progress-bg)] rounded-full">
                  <div
                    className="h-2 bg-[var(--subheading-color)] rounded-full"
                    style={{ width: `${(skill.rating / 10) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-[var(--text-color)] mt-1 block">
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
