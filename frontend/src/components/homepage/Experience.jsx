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
    <section ref={ref} className="py-12 px-4 md:px-8 bg-transparent">
      {!loading && (
        <div className="pb-6">
          <h2 className="text-3xl md:text-3xl text-center mb-4 text-[var(--heading-color)]">
            Experiences
          </h2>
          <div className="w-54 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 animate-gradient-x" />
        </div>
      )}

      {!experience && (
        <p className="text-center text-[var(--subheading-color)]">
          No Experience data found.
        </p>
      )}

      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        { experience?.map((exp, index) => {
          const isLong = exp.description.length > 120;
          return (
            <motion.div
              key={index}
              className="card shadow-sm hover:shadow-lg transition-transform transition-shadow duration-300 rounded-2xl p-6 flex flex-col h-full"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold mb-1">{exp.jobTitle}</h3>
              <h4 className="text-lg font-medium mb-2">{exp.companyName}</h4>
              <p className="text-sm mb-3">
                {exp.startDate?.slice(0, 10).replaceAll("-", "/")} -{" "}
                {exp.endDate ? exp.endDate?.slice(0, 10).replaceAll("-", "/"):"Present"}
              </p>
              <p className="text-sm leading-relaxed mb-3 flex-1">
                {expanded[index] || !isLong
                  ? exp.description
                  : exp.description.slice(0, 120) + "..."}
                {isLong && (
                  <button
                    onClick={() => toggleExpand(index)}
                    className="ml-2 font-semibold hover:underline transition-colors text-[var(--border-hover)] cursor-pointer"
                  >
                    {expanded[index] ? "less" : "more"}
                  </button>
                )}
              </p>
              <p className="text-sm italic">📍 {exp.location}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

export default Experience;