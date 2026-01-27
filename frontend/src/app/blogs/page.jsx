"use client";
import React from "react";
import { useUser } from "../../context/Context";
import Link from "next/link";
import { motion } from "framer-motion";
function truncateHTML(html, maxLength = 250) {
  if (!html) return "";

  // 1. HTML tags ko hatane ke liye Regex (Server-safe)
  const plainText = html.replace(/<[^>]*>?/gm, "");

  // 2. Length check karein
  if (plainText.length <= maxLength) {
    return plainText;
  }

  // 3. Truncate karein
  return plainText.slice(0, maxLength) + "...";
}
function Blogs() {
  const { blogs } = useUser();

  return (
    // Blogs.jsx
    <section className="max-w-6xl mx-auto px-4 py-12 pb-40">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-500">
        All Blogs
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog, index) => (
          <motion.div
            key={blog._id}
            className="card shadow-sm hover:shadow-lg transition-transform transition-shadow duration-300 rounded-2xl border p-5 flex flex-col justify-between h-full"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            whileHover={{ scale: 1.03 }}
          >
            <div>
              <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
              <p
                className="text-sm mb-3"
                style={{ color: "var(--subheading-color)" }}
              >
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div
                className="text-[var(--text-color)] line-clamp-3"
                dangerouslySetInnerHTML={{
                  __html: truncateHTML(blog.content, 250),
                }}
              />
            </div>
            <Link
              href={`/blogs/details/${blog._id}-${blog.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="mt-4 inline-block text-sm text-[var(--border-hover)] font-medium transition-colors duration-300 hover:opacity-80 hover:underline"
            >
              Read More →
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
