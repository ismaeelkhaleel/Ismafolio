"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useUser } from "../../context/Context";

function Socials() {
  const { socials } = useUser();
  const { ref, inView } = useInView({ triggerOnce: true });

  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [hoveredSocial, setHoveredSocial] = useState(null);

  // useEffect(() => {
  //   if (inView && !fetched && !socials) {
  //     setLoading(true);
  //     getSocialLinks().finally(() => {
  //       setLoading(false);
  //       setFetched(true);
  //     });
  //   }
  // }, [inView, fetched, socials, getSocialLinks]);

  if (loading) return null;

  return (
    <div ref={ref} className="w-full px-6 py-16 bg-transparent">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center pb-8"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[var(--heading-color)] mb-4">
            Connect With Me
          </h2>
          <motion.div
            className="w-32 h-1.5 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto shadow-lg"
            initial={{ width: 0 }}
            whileInView={{ width: 128 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        <motion.div
          className="flex justify-center items-center gap-8 flex-wrap"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          {socials?.map((social, index) => (
            <motion.div
              key={index}
              className="relative group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              onMouseEnter={() => setHoveredSocial(index)}
              onMouseLeave={() => setHoveredSocial(null)}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-16 h-16 p-3 rounded-full bg-gradient-to-br from-emerald-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 border-2 border-[var(--border-color)] hover:border-emerald-400 transition-all duration-300 transform hover:scale-110 hover:shadow-xl"
              >
                <img
                  src={social.icon}
                  alt={social.platform}
                  className="w-full h-full object-contain"
                />
              </a>

              {hoveredSocial === index && (
                <motion.div
                  className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-sm font-medium py-2 px-4 rounded-lg whitespace-nowrap z-20 shadow-xl"
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {social.platform}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900" />
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Socials;
