"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useUser } from "../../context/Context";
import Loader from "../buttons/Loader";
import {
  Code2,
  Sparkles,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

function HighlightedText({ text, highlights = [] }) {
  if (!highlights.length) return <span>{text}</span>;

  const escapedHighlights = highlights.map((h) =>
    h.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
  );
  const regex = new RegExp(`(${escapedHighlights.join("|")})`, "gi");
  const parts = text.split(regex);
  const highlightLowerCase = highlights.map((w) => w.toLowerCase());

  return (
    <span>
      {parts.map((part, idx) => {
        if (!part) return null;
        const isHighlight = highlightLowerCase.includes(part.toLowerCase());
        return isHighlight ? (
          <span
            key={idx}
            className="font-bold text-purple-600 dark:text-purple-400"
            style={{ color: "rgb(229, 13, 229)" }}
          >
            {part}
          </span>
        ) : (
          <span key={idx}>{part}</span>
        );
      })}
    </span>
  );
}

function Profile() {
  const { profile } = useUser();

  const [storyOpen, setStoryOpen] = useState(false);
  const [storyIndex, setStoryIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  if (!profile) return <Loader />;

  const img = Array.isArray(profile?.images) ? profile.images : [];

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

  useEffect(() => {
    if (!storyOpen) return;

    const interval = setInterval(() => {
      setProgress((p) => p + 1);
    }, 50);

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
  }, [progress, storyIndex, storyOpen, img.length]);

  const handleResumeDownload = () => {
    if (profile?.resume) {
      window.open(profile.resume, "_blank");
    }
  };

  const handlePrevStory = () => {
    if (storyIndex > 0) {
      setStoryIndex((i) => i - 1);
      setProgress(0);
    }
  };

  const handleNextStory = () => {
    if (storyIndex < img.length - 1) {
      setStoryIndex((i) => i + 1);
      setProgress(0);
    } else {
      setStoryOpen(false);
      setStoryIndex(0);
      setProgress(0);
    }
  };

  const highlights = [
    "MERN Developer",
    "web applications",
    "550+ DSA problems",
    "Ranked 14th",
    "1000+ coding score",
  ];

  return (
    <section className="relative w-full bg-[var(--background)]">
      <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-[1400px] mx-auto px-10 py-2">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-emerald-400/10 to-purple-500/10 blur-xl"
          />
          <motion.div
            animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-gradient-to-br from-pink-500/10 to-purple-500/10 blur-xl"
          />
        </div>

        <motion.div
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-[0.55] space-y-6 pt-10 mb-10 md:mb-0 relative z-10"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-400/20 via-purple-500/20 to-pink-500/20 rounded-full border border-[var(--border-color)]"
          >
            <Sparkles className="w-4 h-4 text-[var(--border-hover)]" />
            <span className="text-sm font-medium text-[var(--subheading-color)]">
              Available for opportunities
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-4xl font-extrabold leading-tight">
            <span className="text-[var(--heading-color)]">Hi, I'm</span>
            <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 animate-gradient">
              {profile.name}
            </span>
          </h1>

          <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300 max-w-xl">
            <HighlightedText
              text={profile.description}
              highlights={highlights}
            />
          </p>

          <div className="flex items-center gap-3 text-2xl font-semibold text-[var(--border-hover)]">
            <Code2 className="w-6 h-6" />
            <Typewriter
              words={profile.title || ["Developer"]}
              loop
              cursor
              typeSpeed={120}
              deleteSpeed={80}
            />
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            {profile.resume && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleResumeDownload}
                className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all"
              >
                <Download className="w-4 h-4" />
                Download CV
              </motion.button>
            )}
          </div>
        </motion.div>

        {img.length > 0 && (
          <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex-[0.45] flex justify-center relative"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl animate-pulse" />

            <div className="relative">
              <motion.div
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setStoryIndex(0);
                  setProgress(0);
                  setStoryOpen(true);
                }}
                className="cursor-pointer w-[320px] h-[320px] rounded-full overflow-hidden relative group"
              >
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 p-1 animate-spin-slow">
                  <div className="w-full h-full rounded-full bg-[var(--background)]" />
                </div>

                <div className="absolute inset-1 rounded-full overflow-hidden">
                  <Image
                    src={img[0]}
                    alt={profile.name}
                    width={320}
                    height={320}
                    className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {storyOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center"
          >
            {/* Progress bars */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-full max-w-md px-4 flex gap-1">
              {img.map((_, idx) => (
                <div
                  key={idx}
                  className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden"
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

            <motion.button
              onClick={() => {
                setStoryOpen(false);
                setProgress(0);
              }}
              className="absolute top-8 right-8 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white text-2xl hover:bg-white/20 transition-colors cursor-pointer"
            >
              ✕
            </motion.button>

            {/* Previous button */}
            {storyIndex > 0 && (
              <motion.button
                onClick={handlePrevStory}
                className="absolute left-4 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>
            )}

            {/* Next button */}
            {storyIndex < img.length - 1 && (
              <motion.button
                onClick={handleNextStory}
                className="absolute right-4 w-12 h-12 flex items-center justify-center bg-white/10 rounded-full text-white hover:bg-white/20 transition-colors cursor-pointer"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            )}

            <motion.div
              key={storyIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={img[storyIndex]}
                alt="story"
                width={520}
                height={760}
                className="object-contain max-h-[85vh] rounded-2xl"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        @keyframes gradient {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          background-size: 200% auto;
          animation: gradient 3s ease infinite;
        }
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
      `}</style>
    </section>
  );
}

export default Profile;
