"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useUser } from "../../context/Context";
import Loader from "../buttons/Loader";
import { X } from "lucide-react";

function HighlightedText({ text, highlights = [] }) {
  const parts = text.split(new RegExp(`(${highlights.join("|")})`, "gi"));
  return (
    <span>
      {parts.map((part, idx) =>
        highlights.map((w) => w.toLowerCase()).includes(part.toLowerCase()) ? (
          <span
            key={idx}
            style={{color: "var(--border-hover)", fontWeight: "600"}}
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
  const [viewImage, setViewImage] = useState(false);

  useEffect(() => {
    setLoading(true);
    getProfile().finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.style.overflow = viewImage ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [viewImage]);

  if (!profile || !profile.image || !profile.name) return null;

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
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-10 px-6 md:px-20 w-full">
      {loading && <Loader />}

      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-[4px] rounded-full relative overflow-hidden shadow-xl cursor-pointer"
        onClick={() => setViewImage(true)}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 animate-gradient-x" />
        <div className="relative w-52 h-52 md:w-72 md:h-72 rounded-full overflow-hidden bg-white dark:bg-gray-900 z-10">
          <Image
            src={profile.image}
            alt={profile.name}
            fill
            className="object-cover rounded-full"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.3 }}
        className="text-center md:text-left max-w-xl flex-1"
      >
        <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 bg-clip-text text-transparent animate-gradient-x">
          {profile.name}
        </h1>

        <h2 className="mt-2 text-lg md:text-xl font-medium bg-gradient-to-r from-pink-400 via-purple-400 to-emerald-400 bg-clip-text text-transparent animate-gradient-x">
          <Typewriter
            words={profile.title || ["Developer", "Designer", "Engineer"]}
            loop={true}
            cursor
            cursorStyle="|"
            typeSpeed={155}
            deleteSpeed={155}
            delaySpeed={150}
          />
        </h2>

        <p className="mt-4 leading-relaxed text-justify">
          <HighlightedText text={profile.description} highlights={highlights} />
        </p>

        <motion.a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="mt-6 inline-block px-6 py-3 rounded-lg relative overflow-hidden font-medium shadow-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 animate-gradient-x" />
          <span className="relative z-10 text-white">View Resume</span>
        </motion.a>
      </motion.div>

      {/* Fullscreen Modal */}
      {viewImage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md">
          <button
            onClick={() => setViewImage(false)}
            className="absolute top-4 right-4 text-white p-2 rounded-full hover:bg-black/40 transition cursor-pointer"
          >
            <X size={28} />
          </button>
          <div className="bg-white dark:bg-gray-900 rounded-lg shadow-lg">
            <Image
              src={profile.image}
              alt={profile.name}
              width={700}
              height={400}
              className="object-contain rounded-lg"
            />
          </div>
        </div>
      )}
    </section>
  );
}

export default Profile;
