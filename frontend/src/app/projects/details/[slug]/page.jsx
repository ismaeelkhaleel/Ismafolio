"use client";
import { useParams } from "next/navigation";
import { useUser } from "../../../../context/Context";
import { useEffect } from "react";

export default function ProjectDetailPage() {
  const { getProjectDetail, projectDetail } = useUser();
  const { slug } = useParams();
  const projectId = slug.split("-")[0];

  useEffect(() => {
    const fetchDetail = async () => {
      await getProjectDetail(projectId);
    };
    fetchDetail();
  }, [projectId]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 pb-40">
      {projectDetail?.coverImage && (
        <div className="w-full h-72 md:h-[28rem] mb-8 overflow-hidden rounded-xl shadow-lg">
          <img
            src={projectDetail.thumbnail}
            alt={projectDetail.title}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
        {projectDetail?.title}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
        {projectDetail?.createdAt &&
          new Date(projectDetail.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>

      <div className="mb-8 flex flex-wrap gap-2">
        {projectDetail?.techStack?.map((tech, index) => (
          <span
            key={index}
            className="inline-block bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-800 text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none text-gray-700 dark:text-gray-200 leading-relaxed">
        <div
          dangerouslySetInnerHTML={{ __html: projectDetail?.description || "" }}
        />
      </div>

      {projectDetail?.githubUrl && (
        <a
          href={projectDetail.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 px-6 py-3 font-semibold text-white bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-lg shadow-lg hover:opacity-90 transition"
        >
          View on GitHub
        </a>
      )}
    </section>
  );
}