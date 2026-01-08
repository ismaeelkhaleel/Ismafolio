"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";

function Experience() {
  const [expanded, setExpanded] = useState({});
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getExperience, experience } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched && !experience) {
      setLoading(true);
      getExperience().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getExperience]);

  const toggleExpand = (index) => {
    setExpanded((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  return (
    <section ref={ref} className="w-full py-16 px-6 md:px-8 bg-transparent">
      {!loading && (
        <div className="pb-12">
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--heading-color)]"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Work Experience
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

      {!experience && (
        <p className="text-center text-lg text-[var(--subheading-color)]">
          No Experience data found.
        </p>
      )}

      <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {experience?.map((exp, index) => {
          const isLong = exp.description.length > 120;
          return (
            <motion.div
              key={index}
              className="card shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl p-6 flex flex-col h-full border border-[var(--border-color)] hover:border-emerald-400 group relative overflow-hidden"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -8 }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />
              
              <div className="relative z-10 flex flex-col h-full">
                {/* Company Badge */}
                <div className="inline-flex items-center gap-2 mb-3">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-400/20 via-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">💼</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[var(--heading-color)] group-hover:text-emerald-500 transition-colors duration-300 leading-tight">
                      {exp.jobTitle}
                    </h3>
                  </div>
                </div>

                {/* Company Name */}
                <h4 className="text-lg font-semibold text-[var(--subheading-color)] mb-3">
                  {exp.companyName}
                </h4>

                {/* Date Range */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gradient-to-r from-emerald-400/20 via-purple-500/20 to-pink-500/20 text-xs font-medium text-[var(--text-color)]">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span>
                      {exp.startDate?.slice(0, 10).replaceAll("-", "/")} - {exp.endDate ? exp.endDate?.slice(0, 10).replaceAll("-", "/") : "Present"}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm leading-relaxed mb-4 flex-1 text-[var(--text-color)]">
                  {expanded[index] || !isLong
                    ? exp.description
                    : exp.description.slice(0, 120) + "..."}
                  {isLong && (
                    <button
                      onClick={() => toggleExpand(index)}
                      className="ml-2 font-semibold hover:underline transition-colors text-[var(--border-hover)] cursor-pointer inline-flex items-center gap-1"
                    >
                      {expanded[index] ? (
                        <>
                          Show less
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                          </svg>
                        </>
                      ) : (
                        <>
                          Read more
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </p>

                {/* Location */}
                <div className="flex items-center gap-2 mt-auto pt-3 border-t border-[var(--border-color)]">
                  <svg className="w-4 h-4 text-[var(--subheading-color)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <p className="text-sm font-medium text-[var(--subheading-color)]">
                    {exp.location}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;