import { getBlogDetailAPI } from "@/services/api";
import BlogDetailClient from "./BlogDetailClient";

export default async function BlogDetailPage({ params }) {
  const resolvedParams = await params;
  const { slug } = resolvedParams;
  const blogId = slug.split("-")[0];
  const res = await getBlogDetailAPI(blogId);
  const blogDetail = (await res.json()).blogDetail;

  return <BlogDetailClient blogDetail={blogDetail} />;
}
