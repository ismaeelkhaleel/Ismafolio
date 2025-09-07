"use client";
import React, { useEffect } from "react";
import { user } from "../../context/Context";
import Link from "next/link";

function Blogs() {
  const { getBlogs, blogs } = user();

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    // Blogs.jsx
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-500">
        All Blogs
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <div
            key={blog._id}
            className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between bg-white dark:bg-gray-900 hover:shadow-lg transition"
          >
            <div>
              <h3 className="text-xl font-semibold text-emerald-400 mb-2">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                {new Date(blog.createdAt).toLocaleDateString()}
              </p>
              <p className="text-gray-700 dark:text-gray-300 line-clamp-3">
                {blog.content}
              </p>
            </div>
            <Link
              href={`/blogs/details/${blog._id}-${blog.title
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="mt-4 inline-block text-sm text-emerald-500 hover:underline font-medium"
            >
              Read More →
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Blogs;
