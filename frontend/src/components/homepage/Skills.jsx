"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Star, StarHalf, StarOff } from "lucide-react";
import { useUser } from "../../context/Context";
import { useInView } from "react-intersection-observer";
import Loader from "../buttons/Loader";

function Skills() {
  const { ref, inView } = useInView({ triggerOnce: true });
  const { getSkills, skills } = useUser();
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getSkills().finally(() => setLoading(false));
      setFetched(true);
    }
  }, [inView, fetched, getSkills]);

  const getStars = (rating) => {
    const starsOutOf5 = rating / 2;
    const fullStars = Math.floor(starsOutOf5);
    const hasHalf = starsOutOf5 % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

    return (
      <>
        {Array.from({ length: fullStars }).map((_, i) => (
          <Star
            key={`full-${i}`}
            size={18}
            className="mx-0.5 fill-emerald-400 stroke-emerald-400"
          />
        ))}
        {hasHalf && (
          <StarHalf
            size={18}
            className="mx-0.5 fill-emerald-400 stroke-emerald-400"
          />
        )}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <StarOff
            key={`empty-${i}`}
            size={18}
            className="mx-0.5 stroke-zinc-400 dark:stroke-zinc-600"
          />
        ))}
      </>
    );
  };

  return (
    <section ref={ref} className="bg-transparent">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-emerald-500 dark:text-emerald-400">
        Skills
      </h2>
      {loading && <Loader />}
      {!loading && skills?.length === 0 && (
        <p className="text-center text-zinc-500 dark:text-zinc-400">
          No skill data found.
        </p>
      )}
      <div className="max-w-6xl mx-auto flex flex-wrap justify-center gap-6 relative">
        {skills?.map((skill, index) => (
          <motion.div
            key={skill._id}
            className="relative rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm dark:shadow-lg min-w-[220px] max-w-[250px] w-full hover:shadow-lg hover:border-emerald-400 transition-shadow transition-border duration-300"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="flex flex-col items-center p-4">
              {skill.icon && (
                <div className="relative w-14 h-14 mb-3">
                  <Image
                    src={skill.icon}
                    alt={skill.name}
                    fill
                    className="object-contain filter dark:brightness-90"
                  />
                </div>
              )}
              <h3 className="text-lg font-semibold text-emerald-600 dark:text-emerald-400">
                {skill.name}
              </h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                {skill.level}
              </p>
              <div className="flex mt-2">{getStars(skill.rating)}</div>
            </div>

            {/* Connecting line to the next card */}
            {index < skills.length - 1 && (
              <div className="hidden md:block absolute top-1/2 right-[-40px] w-10 h-0.5 bg-emerald-400 transform -translate-y-1/2"></div>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Skills;