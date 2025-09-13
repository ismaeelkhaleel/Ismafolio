//src/app/page
"use client";
import { useEffect } from "react";
import "./globals.css";
import { useUser } from "../context/Context.js";
import Profile from "@/components/homepage/Profile";
import Skills from "@/components/homepage/Skills";
import Experience from "@/components/homepage/Experience";
import Projects from "@/components/homepage/Projects";
import Education from "@/components/homepage/Education";
import Stats from "@/components/homepage/Stats";
import Blogs from "@/components/homepage/Blogs";
import Contact from "@/components/homepage/Contact";

export default function Home() {
  const {
    getProfile,
    profile,
  } = useUser();
  useEffect(() => {
    getProfile();
  }, [getProfile]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black dark:text-white pb-20">
      <Profile profile={profile} />
      <Skills />
      <Experience />
      <Projects />
      <Education />
      <Stats />
      <Blogs/>
      <Contact/>
    </div>
  );
}
