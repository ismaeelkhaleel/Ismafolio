import { getProjectDetailAPI } from "@/services/api";
import ProjectDetailClient from "./ProjectDetailClient";

export default async function ProjectDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  
  const projectId = slug.split("-")[0];

  const res = await getProjectDetailAPI(projectId);
  const projectDetail = (await res.json()).projectDetails;

  return <ProjectDetailClient projectDetail={projectDetail} />;
}
