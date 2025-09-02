"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, StarHalf, StarOff } from "lucide-react";

function Skills({ skills }) {
  if (!skills || skills.length === 0) return null;

  // Rating ko 5-star scale me convert karna
  const getStars = (rating) => {
    const starsOutOf5 = rating / 2; // 10 -> 5 stars
    const fullStars = Math.floor(starsOutOf5);
    const hasHalf = starsOutOf5 % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {/* Full Stars */}
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={18}
            className="mx-0.5 fill-yellow-400 stroke-yellow-400"
          />
        ))}

        {/* Half Star */}
        {hasHalf && (
          <StarHalf
            size={18}
            className="mx-0.5 fill-yellow-400 stroke-yellow-400"
          />
        )}

        {/* Empty Stars */}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOff
            key={`empty-${i}`}
            size={18}
            className="mx-0.5 stroke-gray-400 dark:stroke-gray-600"
          />
        ))}
      </>
    );
  };

  return (
    <section className="bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500">
        Skills
      </h2>

      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6">
        {skills.map((skill, index) => (
          <motion.div
            key={skill._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
            className="flex flex-col items-center p-4 rounded-xl shadow-lg bg-white/10 dark:bg-black/20 backdrop-blur-md border border-emerald-500/30 hover:border-emerald-500 transition relative"
          >
            {/* Skill Icon */}
            {skill.icon && (
              <div className="relative w-16 h-16 mb-3">
                <Image
                  src={skill.icon}
                  alt={skill.name}
                  fill
                  className="object-contain"
                />
              </div>
            )}

            {/* Skill Name */}
            <h3 className="text-lg font-semibold text-emerald-400">
              {skill.name}
            </h3>

            {/* Level */}
            <p className="text-sm text-gray-500 dark:text-gray-300">
              {skill.level}
            </p>

            {/* Rating Stars */}
            <div className="flex mt-2">{getStars(skill.rating)}</div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;