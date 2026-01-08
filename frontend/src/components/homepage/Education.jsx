"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, GraduationCap, BookOpen } from "lucide-react";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";

function Education() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getEducation, education } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched && !education) {
      setLoading(true);
      getEducation().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getEducation]);

  return (
    <section ref={ref} className="w-full px-6 py-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        {!loading && (
          <div className="pb-12">
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-center mb-4 text-[var(--heading-color)]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              Education
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

        {!education && (
          <p className="text-center text-lg text-[var(--subheading-color)]">
            No education data found.
          </p>
        )}

        <div className="flex flex-wrap justify-center gap-8 items-stretch">
          {education?.map((edu, index) => (
            <motion.div
              key={index}
              className="card shadow-lg hover:shadow-2xl rounded-2xl flex flex-col overflow-hidden border border-[var(--border-color)] hover:border-emerald-400 group transition-all duration-300 w-full sm:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-md"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Content Container */}
              <div className="flex flex-col flex-1">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-emerald-400 to-purple-500 rounded-lg flex items-center justify-center shadow-md flex-shrink-0 transition-transform duration-300">
                      <GraduationCap size={20} className="text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-[var(--heading-color)] group-hover:text-emerald-500 transition-colors duration-300 leading-tight">
                      {edu.degree}
                    </h3>
                  </div>

                  <div className="flex items-start gap-2 mb-3">
                    <BookOpen
                      size={16}
                      className="text-purple-500 mt-0.5 flex-shrink-0"
                    />
                    <h5 className="text-sm font-semibold text-purple-600">
                      {edu.institute}
                    </h5>
                  </div>

                  <p className="text-sm leading-relaxed text-[var(--subheading-color)] mb-3">
                    {edu.description}
                  </p>
                </div>

                {/* Duration Badge - Bottom */}
                <div className="pt-3 border-t border-[var(--border-color)]">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50  rounded-lg border border-emerald-200">
                      <Calendar size={16} className="text-emerald-600" />
                      <p className="text-sm font-medium !text-emerald-600">
                        {edu.startYear} - {edu.endYear}
                      </p>
                    </div>
                  </div>
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
