//src/app/page
"use client";
import { useEffect } from "react";
import "./globals.css";
import { user } from "../context/Context.js";
export default function Home() {
  const {
    getProfile,
    profile,
    getEducation,
    education,
    getExperience,
    experience,
    getProjects,
    projects,
    getSkills,
    skills,
    getBlogs,
    blogs,
    getLeetcodeState,
    leetcodeState,
    getLeetcodeProblems,
    leetcodeProblems,
    getLeetcodeHeatmap,
    leetcodeHeatmap,
    getGfgStats,
    gfgState,
    getGfgProblems,
    gfgProblems,
    sendContactMessage,
  } = user();
  useEffect(() => {
    getProfile();
    getBlogs();
    getEducation();
    getExperience();
    getGfgProblems();
    getGfgStats();
    getLeetcodeHeatmap();
    getLeetcodeProblems();
    getLeetcodeState();
    getProjects();
    getSkills();
  }, []);
  useEffect(() => {
    console.log("gfgProblems", gfgProblems);
    console.log("getGfgStats", gfgState);
    console.log("leetcodeHeatmap", leetcodeHeatmap);
    console.log("getLeetcodeProblems", leetcodeHeatmap);
    console.log("getLeetcodeState", leetcodeState);
  }, [gfgProblems, gfgState, leetcodeHeatmap, leetcodeProblems, leetcodeState]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
      <h1 className="text-4xl font-bold mb-6">Hello World</h1>
    </div>
  );
}
