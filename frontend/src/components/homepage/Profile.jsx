"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
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
            style={{ color: "var(--border-hover)", fontWeight: "600" }}
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
  const [storyOpen, setStoryOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!profile) {
      setLoading(true);
      getProfile().finally(() => setLoading(false));
    }
  }, []);

  const img = Array.isArray(profile?.images) ? profile.images : [];

  // Disable background scroll when story is open
  useEffect(() => {
    if (storyOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [storyOpen]);

  // Story timeline + auto close
  useEffect(() => {
    if (!storyOpen) return;

    const interval = setInterval(() => {
      setProgress((p) => p + 1);
    }, 50); // 5 seconds

    if (progress >= 100) {
      if (storyIndex < img.length - 1) {
        setStoryIndex((i) => i + 1);
        setProgress(0);
      } else {
        setStoryOpen(false);
        setStoryIndex(0);
        setProgress(0);
      }
    }

    return () => clearInterval(interval);
  }, [progress, storyIndex, storyOpen]);

  if (!profile || !profile.name) return <Loader />;

  const highlights = [
    "Full Stack Web Developer",
    "MCA graduate",
    "Aligarh Muslim University",
    "Node.js",
    "React.js",
    "Express.js",
    "MongoDB",
  ];

  return (
    <section className="relative flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mx-auto px-10 bg-[var(--background)]">
      {loading && <Loader />}

      {/* LEFT CONTENT (SMALLER WIDTH) */}
      <motion.div
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-[0.55] space-y-5 pt-10 mb-10 md:mb-0"
      >
        <h1 className="text-4xl font-bold">
          Hi, I am <br />
          <span className="text-[var(--border-hover)]">{profile.name}</span>
        </h1>

        <p className="text-gray-700 dark:text-gray-300">
          <HighlightedText text={profile.description} highlights={highlights} />
        </p>

        <h2 className="text-xl text-[var(--border-hover)]">
          <Typewriter
            words={profile.title || ["Developer"]}
            loop
            cursor
            typeSpeed={120}
            deleteSpeed={80}
          />
        </h2>
      </motion.div>

      {/* RIGHT IMAGE (BIGGER) */}
      {img.length > 0 && (
        <div className="flex-[0.45] flex justify-center">
          <div
            onClick={() => {
              setStoryIndex(0);
              setProgress(0);
              setStoryOpen(true);
            }}
            className="cursor-pointer w-[280px] h-[280px] rounded-full overflow-hidden 
                       border-4 border-[var(--border-hover)]"
          >
            <Image
              src={img[0]}
              alt={profile.name}
              width={280}
              height={280}
              className="object-cover w-full h-full"
            />
          </div>
        </div>
      )}

      {/* STORY VIEWER */}
      <AnimatePresence>
        {storyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center"
          >
            {/* TIMELINE */}
            <div className="absolute top-4 left-4 right-4 flex gap-1">
              {img.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-[3px] bg-white/30 rounded overflow-hidden"
                >
                  <div
                    className="h-full bg-white transition-all duration-100"
                    style={{
                      width:
                        idx < storyIndex
                          ? "100%"
                          : idx === storyIndex
                          ? `${progress}%`
                          : "0%",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* CLOSE */}
            <button
              onClick={() => {
                setStoryOpen(false);
                setProgress(0);
              }}
              className="absolute top-6 right-6 text-white text-xl cursor-pointer"
            >
              ✕
            </button>

            {/* PREV */}
            <button
              onClick={() => {
                setStoryIndex((i) => Math.max(i - 1, 0));
                setProgress(0);
              }}
              className="absolute left-6 text-white text-4xl cursor-pointer"
            >
              ‹
            </button>

            {/* IMAGE */}
            <motion.div
              key={storyIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <Image
                src={img[storyIndex]}
                alt="story"
                width={520}
                height={760}
                className="object-contain max-h-[80vh]"
              />
            </motion.div>

            {/* NEXT */}
            <button
              onClick={() => {
                setStoryIndex((i) => Math.min(i + 1, img.length - 1));
                setProgress(0);
              }}
              className="absolute right-6 text-white text-4xl cursor-pointer"
            >
              ›
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Profile;
