"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/Context";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

function Blogs() {
  const { getBlogs, blogs } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getBlogs().finally(() => setLoading(false));
  }, []);

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      {!loading && (
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 heading-gradient">
          Latest Blogs
        </h2>
      )}

      {!loading && blogs.length === 0 && (
        <p className="text-center text-[var(--subheading-color)]">No Blog data found.</p>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog, index) => (
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
              <p className="text-[var(--subheading-color)] line-clamp-3">{blog.content}</p>
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

      <div className="flex justify-center mt-10">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-[var(--border-hover)] font-medium transition-opacity duration-300 hover:opacity-80"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default Blogs;