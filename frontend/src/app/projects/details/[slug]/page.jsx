"use client";
import { useParams } from "next/navigation";
import { useUser } from "../../../../context/Context";
import { useEffect } from "react";
import Loader from "@/components/buttons/Loader";
import { Github, ExternalLink } from "lucide-react";

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
      {projectDetail?.thumbnail && (
        <div className="w-full h-72 md:h-[28rem] mb-8 overflow-hidden rounded-xl shadow-lg">
          <img
            src={projectDetail.thumbnail}
            alt={projectDetail.title}
            className="w-full h-full object-cover transform hover:scale-105 transition duration-500"
          />
        </div>
      )}

      <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-500 mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500">
        {projectDetail?.title ? (
          projectDetail.title
        ) : (
          <div className="flex justify-center items-center h-full">
            <Loader />
          </div>
        )}
      </h1>

      <p className="text-sm mb-6" style={{ color: "var(--text-color)" }}>
        {projectDetail?.createdAt &&
          new Date(projectDetail.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
      </p>
      <div className="mt-5 flex gap-4 mb-6">
        <a
          href={projectDetail?.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative group text-gray-700 transition-colors hover:bg-grey-100 p-1 rounded-full"
          title="View Code on GitHub"
        >
          <span className="absolute inset-0 rounded-full scale-0 bg-gray-200 opacity-70 group-hover:scale-100 transition-transform duration-300"></span>
          <Github
            size={22}
            className="relative z-10 group-hover:text-gray-900"
          />
        </a>

        {projectDetail?.liveUrl && (
          <a
            href={projectDetail.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative group text-pink-600 transition-colors hover:bg-pink-100 p-1 rounded-full"
            title="View Live Project"
          >
            <span className="absolute inset-0 rounded-full scale-0 bg-pink-100 opacity-70 transition-transform duration-300"></span>
            <ExternalLink size={22} className="relative z-10" />
          </a>
        )}
      </div>

      <div className="mb-8 flex flex-wrap gap-2">
        {projectDetail?.techStack?.map((tech, index) => (
          <span
            key={index}
            className="inline-block text-xs font-semibold px-3 py-1 rounded-full shadow-sm hover:shadow-md transition"
            style={{
              backgroundColor: "var(--tag-bg)",
              color: "var(--heading-color)",
            }}
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="prose prose-lg max-w-none leading-relaxed prose-custom">
        <div
          dangerouslySetInnerHTML={{ __html: projectDetail?.description || "" }}
        />
      </div>
    </section>
  );
}
