"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
          <div className="pb-6">
            <h2 className="text-3xl md:text-3xl text-center mb-4 text-[var(--heading-color)]">
              Projects
            </h2>
            <div className="w-40 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto mt-2 animate-gradient-x" />
          </div>
        )}

        {!projects && (
          <p className="text-center text-[var(--subheading-color)]">
            No projects data found.
          </p>
        )}

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.slice(0, 3).map((project, index) => (
            <motion.div
              key={index}
              className="card shadow-sm rounded-2xl flex flex-col overflow-hidden h-full"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <div className="relative w-full overflow-hidden">
                <motion.img
                  src={project.thumbnail}
                  alt={project.title}
                  className="object-cover transition-transform duration-500"
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
                      className="inline-block text-xs font-semibold px-3 py-1 rounded-full shadow-sm transition"
                      style={{
                        backgroundColor: "var(--tag-bg)",
                        color: "var(--heading-color)",
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="mt-5 flex gap-3">
                  <a
                    href={`/projects/details/${project._id}-${project.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-2 rounded-lg font-medium shadow-lg text-white bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 transition-opacity duration-200"
                  >
                    Detail
                  </a>
                  <a
                    href={project.githubUrl}
                    rel="noopener noreferrer"
                    className="flex-1 text-center px-6 py-2 rounded-lg font-medium shadow-lg text-white bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 transition-opacity duration-200"
                  >
                    Code
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center mt-10">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-[var(--border-hover)] font-medium transition-opacity duration-300 hover:opacity-80"
          >
            View All Projects <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Projects;