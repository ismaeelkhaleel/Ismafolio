"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Loader from "../buttons/Loader";

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getProjects, projects } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getProjects().finally(() => setLoading(false));
      console.log("Projects section visible → API call");
      setFetched(true);
    }
  }, [inView, fetched, getProjects]);
  return (
    <section
      ref={ref}
      className="w-full px-6 py-12 bg-transparent transition-colors duration-500"
    >
      <div className="max-w-6xl mx-auto">
        {!loading && (
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500">
            Projects
          </h2>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-center text-gray-500">No projects data found.</p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative z-10 rounded-2xl bg-white dark:bg-gray-900 shadow-lg flex flex-col overflow-hidden h-full border border-gray-200 dark:border-gray-700">
                {/* Thumbnail */}
                <div className="relative w-full h-48 overflow-hidden">
                  <motion.img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm flex-1">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {project.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="text-xs font-medium px-3 py-1 rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* Github Link */}
                  <div className="mt-5">
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full block text-center px-6 py-3 rounded-lg relative overflow-hidden font-medium shadow-lg"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 animate-gradient-x" />
                      <span className="relative z-10 text-white">
                        View Code
                      </span>
                    </motion.a>
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

export default Projects;
