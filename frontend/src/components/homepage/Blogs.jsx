"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/Context";
import Link from "next/link";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

function truncateHTML(html = "", maxLength = 150) {
  if (!html) return "";

  const text = html.replace(/<[^>]*>/g, "");
  return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
}

function Blogs() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { blogs } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  // useEffect(() => {
  //   if (inView && !fetched) {
  //     setLoading(true);
  //     getBlogs().finally(() => setLoading(false));
  //     setFetched(true);
  //   }
  // }, [inView, fetched, getBlogs]);

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
              Latest Blogs
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
          {blogs?.slice(0, 3).map((blog, index) => (
            <motion.div
              key={blog._id}
              className="card shadow-lg hover:shadow-2xl rounded-2xl flex flex-col overflow-hidden h-full border border-[var(--border-color)] hover:border-purple-400 group transition-all duration-300"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              {/* Content Container */}
              <div className="flex flex-col flex-1">
                <div className="flex-1">
                  {/* Date Badge */}
                  <div className="flex items-center gap-2 mb-4 text-sm text-[var(--subheading-color)]">
                    <Calendar size={16} className="text-purple-500" />
                    <span>
                      {new Date(blog.createdAt).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </span>
                    <span className="text-[var(--border-color)]">•</span>
                    <Clock size={16} className="text-emerald-500" />
                    <span>5 min read</span>
                  </div>

                  <h3 className="text-2xl font-bold text-[var(--heading-color)] mb-4 group-hover:text-purple-500 transition-colors duration-300 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Blog Excerpt */}
                  <div
                    className="text-[var(--subheading-color)] text-sm leading-relaxed line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{
                      __html: truncateHTML(blog.content, 150),
                    }}
                  />

                  {/* Categories/Tags - if available */}
                  {blog.category && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      <span className="inline-block text-xs font-medium px-3 py-1.5 rounded-lg border border-purple-200 bg-purple-50/50 text-purple-700 hover:bg-purple-500 hover:text-white hover:border-purple-500 transition-all duration-200 cursor-default">
                        {blog.category}
                      </span>
                    </div>
                  )}
                </div>

                {/* Read More Link - Bottom */}
                <div className="pt-4 border-t border-[var(--border-color)]">
                  <Link
                    href={`/blogs/details/${blog._id}-${blog.title
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                    className="flex items-center gap-2 text-sm font-medium text-purple-500 hover:text-purple-600 transition-colors group"
                  >
                    Read More
                    <ArrowRight
                      size={16}
                      className="group-hover:translate-x-1 transition-transform duration-300"
                    />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Button */}
        {blogs?.length > 3 && (
          <motion.div
            className="flex justify-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <Link
              href="/blogs"
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
            >
              View All Blogs
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

export default Blogs;