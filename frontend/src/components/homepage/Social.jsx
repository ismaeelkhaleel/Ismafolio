"use client";
import React, { useEffect, useState } from "react";
import { useUser } from "@/context/Context";
import { useInView } from "react-intersection-observer";

function Social() {
  const { getSocialLinks, socials } = useUser();
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { ref, inView } = useInView({ triggerOnce: true });
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  useEffect(() => {
    if (inView && !fetched) {
      setLoading(true);
      getSocialLinks()
        .finally(() => setLoading(false))
        .finally(() => setFetched(true));
    }
  }, [inView, fetched, getSocialLinks]);

  return (
    <div className="flex flex-col items-center gap-6 mb-15" ref={ref}>
      {!loading && (
        <div className="text-center pb-4">
          <h2 className="text-3xl md:text-3xl text-[var(--heading-color)] mb-2">
            Connect with me
          </h2>
          <div className="w-64 h-1 bg-gradient-to-r from-emerald-400 via-purple-500 to-pink-500 rounded-full mx-auto animate-gradient-x" />
        </div>
      )}
      <div className="flex justify-center items-center gap-10">
        {socials &&
          socials.map((social, index) => (
            <div
              key={index}
              className="relative w-10 h-10"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full h-full transform transition-transform duration-200 hover:scale-110"
              >
                <img
                  src={social.icon}
                  alt={social.platform}
                  className="w-full h-full object-contain"
                />
              </a>
              {hoveredIndex === index && (
                <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded-md whitespace-nowrap z-10">
                  {social.platform}
                </div>
              )}
            </div>
          ))}
      </div>
    </div>
  );
}

export default Social;