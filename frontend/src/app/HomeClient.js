"use client";

import Profile from "@/components/homepage/Profile";
import Skills from "@/components/homepage/Skills";
import Experience from "@/components/homepage/Experience";
import Projects from "@/components/homepage/Projects";
import Blogs from "@/components/homepage/Blogs";
import Education from "@/components/homepage/Education";
import Stats from "@/components/homepage/Stats";
import Contact from "@/components/homepage/Contact";
import Social from "@/components/homepage/Social";

export default function HomeClient() {
  return (
    <div className="min-h-screen flex flex-col items-center pb-20">
      <Profile />
      <Social />
      <Skills />
      <Experience />
      <Projects />
      <Blogs />
      <Education />
      <Stats />
      <Contact />
    </div>
  );
}
