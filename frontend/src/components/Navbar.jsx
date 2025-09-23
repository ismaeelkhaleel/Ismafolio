"use client";
import React from "react";
import ThemeToggle from "./ThemeToggle";
import { BookOpenText, FolderKanban, House } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function Navbar() {
  return (
    <div
      className="mx-auto fixed bottom-5 left-0 right-0 flex items-center justify-between px-5 py-3 
                 rounded-2xl shadow-lg bg-transparent backdrop-blur-xl z-50 
                 max-w-lg md:max-w-4xl"
    >
      <div className="hidden md:block">
        <h3 className="text-lg font-bold dark:text-white">Ismafolio</h3>
      </div>

      <div className="flex items-center gap-6 justify-center md:justify-end w-full md:w-auto">
        <Link
          href="/"
          className="relative group cursor-pointer hover:scale-125 transition-transform duration-200"
        >
          <House />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            Home
          </span>
        </Link>
        <Link
          href="/leetcode/problems"
          className="relative group cursor-pointer hover:scale-125 transition-transform duration-200"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            alt="LeetCode Logo"
            width={25}
            height={25}
          />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            LeetCode
          </span>
        </Link>

        <Link
          href="/geeksforgeek/problems"
          className="relative group cursor-pointer hover:scale-125 transition-transform duration-200"
        >
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
            alt="GFG Logo"
            width={25}
            height={25}
          />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            GeeksforGeeks
          </span>
        </Link>

        <Link
          href="/blogs"
          className="relative group cursor-pointer hover:scale-125 transition-transform duration-200"
        >
          <BookOpenText />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            Blogs
          </span>
        </Link>

        <Link
          href="/projects"
          className="relative group cursor-pointer hover:scale-125 transition-transform duration-200"
        >
          <FolderKanban />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            Projects
          </span>
        </Link>

        <div className="relative group cursor-pointer">
          <ThemeToggle />
          <span
            className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded"
          >
            Theme
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
