"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  return (
    <section className="py-16 px-6 bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500">
        Skills
      </h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 rounded-xl shadow-md bg-white/10 dark:bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500 transition"
          >
            {/* Skill Icon */}
            {skill.icon && (
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Skill Name */}
            <h3 className="text-lg font-semibold text-emerald-400">
              {skill.name}
            </h3>

            {/* Level */}
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {skill.level}
            </p>

            {/* Rating Stars */}
            <div className="flex mt-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <span
                  key={i}
                  className={`h-3 w-3 rounded-full mx-0.5 ${
                    i < skill.rating
                      ? "bg-emerald-500"
                      : "bg-gray-400 dark:bg-gray-600"
                  }`}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;