"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { Github, Code2, ExternalLink, ArrowRight } from "lucide-react";

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
              Featured Projects
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

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              className="card shadow-lg hover:shadow-2xl rounded-2xl flex flex-col overflow-hidden h-full border border-[var(--border-color)] hover:border-emerald-400 group transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Image Container */}
              <div className="relative w-full h-48 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Quick Actions on Hover */}
                <div className="absolute inset-0 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={`/projects/details/${project._id}-${project.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="p-3 dark:bg-black/90 bg-white/90 backdrop-blur-sm rounded-full hover:bg-emerald-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                    title="View Details"
                  >
                    <Code2 size={20} />
                  </a>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 dark:bg-black/90 bg-white/90 backdrop-blur-sm rounded-full hover:bg-gray-800 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                    title="View Code"
                  >
                    <Github size={20} />
                  </a>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 dark:bg-black/90 bg-white/90 backdrop-blur-sm rounded-full hover:bg-pink-500 hover:text-white transition-all duration-300 shadow-lg transform hover:scale-110"
                      title="Live Demo"
                    >
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
              </div>

              {/* Content Container */}
              <div className="flex flex-col flex-1">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-[var(--heading-color)] mb-4 group-hover:text-emerald-500 transition-colors duration-300">
                    {project.title}
                  </h3>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span
                        key={idx}
                        className="inline-block text-xs font-medium px-3 py-1.5 rounded-lg border border-emerald-200 bg-emerald-50/50 text-emerald-700 hover:bg-grey hover:border-emerald-300 transition-all duration-200 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50/50 text-purple-700 cursor-default">
                        +{project.techStack.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Action Links - Bottom */}
                <div className="flex items-center gap-3 pt-4 border-t border-[var(--border-color)]">
                  <a
                    href={`/projects/details/${project._id}-${project.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 text-sm font-medium text-emerald-500 hover:text-emerald-600 transition-colors"
                  >
                    <Code2 size={16} />
                    Details
                  </a>

                  <span className="text-[var(--border-color)]">•</span>

                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium text-[var(--subheading-color)] hover:text-gray-800 transition-colors"
                  >
                    <Github size={16} />
                    Code
                  </a>

                  {project.liveUrl && (
                    <>
                      <span className="text-[var(--border-color)]">•</span>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
                      >
                        <ExternalLink size={16} />
                        Live
                      </a>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}

        {projects?.length > 3 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/projects"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Projects
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </Link>
          </motion.div>
        )}
      </div>
    </section>
  );
}

export default Projects;
