"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";

function Projects() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getProjects, projects } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getProjects().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getProjects]);

  return (
    <section ref={ref} className="w-full px-6 py-12 bg-transparent">
      <div className="max-w-6xl mx-auto">
        {!loading && (
          <h2 className="text-3xl md:text-3xl text-center mb-12 text-[var(--heading-color)]">
            Projects
          </h2>
        )}

        {!loading && projects.length === 0 && (
          <p className="text-center text-[var(--subheading-color)]">
            No projects data found.
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              className="card shadow-sm hover:shadow-lg transition-transform transition-shadow duration-300 rounded-2xl flex flex-col overflow-hidden h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ scale: 1.03 }}
            >
              <div className="relative w-full overflow-hidden">
                <motion.img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="flex flex-col flex-1 justify-between pt-3">
                <h3 className="text-xl font-semibold text-[var(--heading-color)]">
                  {project.title}
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-[var(--tag-bg)] text-[var(--tag-text)]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5">
                  <motion.a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full block text-center px-6 py-1 rounded-lg font-medium shadow-lg relative overflow-hidden text-white bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500"
                  >
                    View Code
                  </motion.a>
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