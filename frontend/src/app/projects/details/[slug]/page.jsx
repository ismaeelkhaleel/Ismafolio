"use client";
import { useParams } from "next/navigation";
import { useUser } from "../../../../context/Context";
import { useEffect } from "react";

export default function ProjectDetailPage() {
  const { getProjectDetail, projectDetail } = useUser();
  const { slug } = useParams();
  const projectId = slug.split("-")[0];

  useEffect(() => {
    getProjectDetail(projectId);
  }, [projectId, getProjectDetail]);
  useEffect(() => {
    console.log(projectDetail);
  }, [projectDetail]);

  return (
    <section className="max-w-5xl mx-auto px-4 py-12 pb-40">
      {projectDetail?.coverImage && (
        <div className="w-full h-72 md:h-[28rem] mb-8">
          <img
            src={projectDetail.coverImage}
            alt={projectDetail.title}
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-bold text-emerald-500 mb-4">
        {projectDetail?.title}
      </h1>

      <p className="text-sm text-gray-500 dark:text-gray-400 mb-10">
        {projectDetail?.createdAt &&
          new Date(projectDetail.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>

      <div className="prose prose-lg max-w-none text-gray-700 dark:text-white">
        <div
          dangerouslySetInnerHTML={{ __html: projectDetail?.description || "" }}
        />
      </div>
    </section>
  );
}
