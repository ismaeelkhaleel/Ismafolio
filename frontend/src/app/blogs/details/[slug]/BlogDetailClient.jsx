"use client";
import Loader from "@/components/buttons/Loader";

export default function BlogDetailClient({blogDetail}) {
  return (
    <section className="max-w-5xl mx-auto px-4 py-12 pb-40">
      {blogDetail?.coverImage && (
        <div className="w-full h-72 md:h-[28rem] mb-8">
          <img
            src={blogDetail.coverImage}
            alt={blogDetail.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
        {blogDetail?.title ? (
          blogDetail.title
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        {blogDetail?.createdAt &&
          new Date(blogDetail.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>

      <div className="prose prose-lg max-w-none leading-relaxed prose-custom">
        <div dangerouslySetInnerHTML={{ __html: blogDetail?.content || "" }} />
      </div>
    </section>
  );
}