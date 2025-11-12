"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useUser } from "../../context/Context";
import Loader from "../buttons/Loader";

function HighlightedText({ text, highlights = [] }) {
  const parts = text.split(new RegExp(`(${highlights.join("|")})`, "gi"));
  return (
    <span>
      {parts.map((part, idx) =>
        highlights.map((w) => w.toLowerCase()).includes(part.toLowerCase()) ? (
          <span
            key={idx}
            style={{
              color: "var(--border-hover)",
              fontWeight: "600",
              textShadow: "0 0 6px rgba(0,0,0,0.3)",
            }}
          >
            {part}
          </span>
        ) : (
          part
        )
      )}
    </span>
  );
}

function Profile() {
  const { getProfile, profile } = useUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!profile) {
      setLoading(true);
      getProfile().finally(() => setLoading(false));
    }
  }, []);

  if (!profile || !profile.image || !profile.name) return <Loader />;

  const highlights = [
    "Full Stack Web Developer",
    "MCA graduate",
    "Aligarh Muslim University",
    "Data Structures and Algorithms",
    "Node.js",
    "React.js",
    "Express.js",
    "MongoDB",
    "responsive UI development",
    "REST APIs",
    "backend scalability",
  ];

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between 
                 w-full max-w-[1400px] mx-auto 
                 px-10 md:px-15 overflow-hidden 
                 bg-[var(--background)] text-gray-900 dark:text-white transition-colors duration-300"
    >
      {loading && <Loader />}

      {/* 🌈 Soft glow behind elements */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 60% 40%, var(--border-hover) 0%, transparent 70%)",
          opacity: 0.25,
          filter: "blur(90px)",
        }}
      />

      {/* LEFT TEXT CONTENT */}
      <motion.div
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex-3/4 text-left space-y-5 z-20 
                     md:-mr-40 lg:-mr-48 xl:-mr-56 
                   mt-10 md:mt-0"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
          Hi, I am <br />
          <span className="text-[var(--border-hover)]">{profile.name}</span>
        </h1>

        <p
          className="text-base md:text-lg leading-relaxed 
                     text-gray-800 dark:text-gray-300"
        >
          <HighlightedText text={profile.description} highlights={highlights} />
        </p>

        <h2 className="text-lg md:text-xl font-medium text-[var(--border-hover)]">
          <Typewriter
            words={profile.title || ["Developer", "Designer", "Engineer"]}
            loop
            cursor
            cursorStyle="|"
            typeSpeed={155}
            deleteSpeed={155}
            delaySpeed={500}
          />
        </h2>

        <motion.a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-block mt-6 px-6 py-3 rounded-lg relative overflow-hidden font-medium shadow-lg"
        >
          <span className="absolute inset-0 bg-[var(--border-hover)] opacity-90" />
          <span className="relative z-10 text-white">View Resume</span>
        </motion.a>
      </motion.div>

      {/* RIGHT IMAGE */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        className="relative flex-1/2 flex justify-center z-[5] mt-8 md:mt-0"
      >
        <div className="relative flex justify-center items-center w-fit h-fit">
          <Image
            src={profile.image}
            alt={profile.name}
            width={profile.imageWidth || 450}
            height={profile.imageHeight || 450}
            priority
            className="object-contain w-auto h-auto max-w-full"
          />
        </div>
      </motion.div>
    </section>
  );
}

export default Profile;
