"use client";
import React, { useEffect } from "react";
import { useUser } from "../../context/Context";
import Link from "next/link";
import { motion } from "framer-motion";
function truncateHTML(html, maxLength = 250) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  let total = 0;

  function traverse(node) {
    if (total >= maxLength) return null;
    if (node.nodeType === Node.TEXT_NODE) {
      const remaining = maxLength - total;
      const text = node.textContent ? node.textContent.slice(0, remaining) : "";
      total += text.length;
      return document.createTextNode(text);
    }
    const el = node.cloneNode(false);
    node.childNodes.forEach((child) => {
      const newChild = traverse(child);
      if (newChild) el.appendChild(newChild);
    });
    return el;
  }

  const truncated = traverse(tmp);
  return truncated ? truncated.innerHTML : "";
}
function Blogs() {
  const { getBlogs, blogs } = useUser();

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  return (
    // Blogs.jsx
    <section className="max-w-6xl mx-auto px-4 py-12 pb-40">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-500">
        All Blogs
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
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
              <p className="text-sm mb-3" style={{ color: "var(--subheading-color)" }}>
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <div
                className="text-[var(--text-color)] line-clamp-3"
                dangerouslySetInnerHTML={{ __html: truncateHTML(blog.content, 250) }}
              />
            </div>
            <Link
              href={`/blogs/details/${blog._id}-${blog.title.toLowerCase().replace(/\s+/g, "-")}`}
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
