"use client";
import { useEffect, useState } from "react";
import "./globals.css";
import Profile from "@/components/homepage/Profile";
import Skills from "@/components/homepage/Skills";
import Experience from "@/components/homepage/Experience";
import Projects from "@/components/homepage/Projects";
import Education from "@/components/homepage/Education";
import Stats from "@/components/homepage/Stats";
import Blogs from "@/components/homepage/Blogs";
import Contact from "@/components/homepage/Contact";
import Social from "@/components/homepage/Social";
import { useUser } from "../context/Context";
import Loader from "@/components/buttons/Loader";

export default function Home() {
  const { getProfile, profile } = useUser();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!profile) {
      setLoading(true);
      getProfile().finally(() => setLoading(false));
    }
  }, []);

  if (!mounted) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-black dark:text-white pb-20">
      {!profile || loading ? (
        <Loader />
      ) : (
        <>
          <Profile />
          <Social />
          <Skills />
          <Experience />
          <Projects />
          <Blogs />
          <Education />
          <Stats />
          <Contact />
        </>
      )}
    </div>
  );
}