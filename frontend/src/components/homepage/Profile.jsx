"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { useUser } from "../../context/Context";

function Profile() {
  const { getProfile, profile } = useUser();
  useEffect(() => {
    getProfile();
  }, []);

  if (!profile || !profile.image || !profile.name) {
    return null;
  }

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen gap-10 px-6">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="p-[4px] rounded-full relative overflow-hidden shadow-xl"
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
        className="text-center md:text-left"
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

        <p className="mt-4 max-w-lg text-gray-700 dark:text-gray-300 leading-relaxed">
          {profile.description}
        </p>

        <motion.a
          href={profile.resume}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className="mt-6 inline-block px-6 py-3 rounded-lg relative overflow-hidden font-medium shadow-lg"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 animate-gradient-x" />
          <span className="relative z-10 text-white">View Resume</span>
        </motion.a>
      </motion.div>
    </section>
  );
}

export default Profile;
