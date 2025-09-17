"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "../../context/Context";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10 text-emerald-500">
          Latest Blogs
        </h2>
      )}
      {!loading && projects.length === 0 && (
        <p className="text-center text-gray-500">No Blog data found.</p>
      )}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.slice(0, 3).map((blog) => (
          <div
            key={blog._id}
            className="rounded-2xl shadow-md border border-gray-200 dark:border-gray-700 p-5 flex flex-col justify-between bg-white dark:bg-gray-900 hover:shadow-lg"
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
      <div className="flex justify-end mt-8">
        <Link
          href="/blogs"
          className="flex items-center gap-2 text-emerald-500 font-medium hover:underline"
        >
          View All <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export default Blogs;
