"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Loader from "../buttons/Loader";

function Education() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getEducation, education } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getEducation().finally(() => setLoading(false));
      console.log("Education section visible → API call");
      setFetched(true);
    }
  }, [inView, fetched, getEducation]);

  return (
    <section
      ref={ref}
      className="w-full px-6 py-12 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-5xl mx-auto">
        {!loading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500">
            Education
          </h2>
        )}

        {!loading && education.length === 0 && (
          <p className="text-center text-gray-500">No education data found.</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {education.map((edu, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="inner-card p-6 h-full flex flex-col border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300 bg-white dark:bg-gray-800">
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
