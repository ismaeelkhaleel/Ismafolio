"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

function Experience({ experience }) {
  const [expanded, setExpanded] = useState({});

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section className="py-12 px-4 md:px-8 bg-transparent transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-600 dark:text-emerald-500">
        Experience
      </h2>

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {experience.map((exp, index) => {
          const isLong = exp.description.length > 120;

          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white dark:bg-white/10 dark:backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                {exp.jobTitle}
              </h2>
              <h3 className="text-lg text-indigo-600 dark:text-indigo-400 font-medium mb-2">
                {exp.companyName}
              </h3>

              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {exp.startDate.slice(0, 10).replaceAll("-", "/")} &nbsp;-&nbsp;
                {exp.endDate.slice(0, 10).replaceAll("-", "/")}
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed mb-3">
                {expanded[index] || !isLong
                  ? exp.description
                  : exp.description.slice(0, 120) + "..."}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 text-indigo-600 dark:text-indigo-400 font-semibold hover:underline"
                  >
                    {expanded[index] ? "less" : "more"}
                  </button>
                )}
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 italic">
                📍 {exp.location}
              </p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;