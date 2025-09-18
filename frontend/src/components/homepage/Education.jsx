"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";

function Education() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getEducation, education } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getEducation().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getEducation]);

  return (
    <section ref={ref} className="w-full px-6 py-12 bg-transparent">
      <div className="max-w-5xl mx-auto">
        {!loading && (
        <div className="pb-6">
          <h2 className="text-3xl md:text-3xl text-center mb-4 text-[var(--heading-color)]">
            Educations
          </h2>
          <div className="w-50 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 animate-gradient-x" />
        </div>
      )}

        {!loading && education.length === 0 && (
          <p className="text-center text-[var(--subheading-color)]">
            No education data found.
          </p>
        )}

        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              className="card shadow-sm hover:shadow-lg transition-transform transition-shadow duration-300 p-6 flex flex-col rounded-lg h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <h3 className="text-xl font-semibold text-[var(--heading-color)]">
                {edu.degree}
              </h3>
              <h5 className="text-md font-medium mt-2 text-[var(--accent-color)]">
                {edu.institute}
              </h5>
              <p className="text-sm mt-3 flex-1 text-[var(--subheading-color)]">
                {edu.description}
              </p>
              <div className="flex items-center gap-2 mt-4 text-sm font-medium text-[var(--accent-color)]">
                <Calendar size={16} />
                <span>
                  {edu.startYear} - {edu.endYear}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Education;