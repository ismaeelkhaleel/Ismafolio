"use client";
import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

function Education({ education }) {
  return (
    <section className="w-full px-6 py-12 bg-transparent transition-colors duration-500">
      <div className="max-w-5xl mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Education
        </motion.h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="gradient-border"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="inner-card p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {edu.degree}
                </h3>
                <h5 className="text-md font-medium mt-2 text-blue-600 dark:text-blue-400">
                  {edu.institute}
                </h5>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-3 flex-1">
                  {edu.description}
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
                  <Calendar size={16} />
                  <span>
                    {edu.startYear} - {edu.endYear}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;