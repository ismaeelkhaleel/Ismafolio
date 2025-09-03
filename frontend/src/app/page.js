//src/app/page
"use client";
import { useEffect } from "react";
import "./globals.css";
import { user } from "../context/Context.js";
import Profile from "@/components/homepage/Profile";
import Skills from "@/components/homepage/Skills";
import Experience from "@/components/homepage/Experience";
import Projects from "@/components/homepage/Projects";
import Education from "@/components/homepage/Education";
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
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black dark:text-white">
      <Profile profile={profile} />
      <Skills skills={skills} />
      <Experience experience={experience} />
      <Projects projects={projects} />
      <Education education={education} />
    </div>
  );
}
