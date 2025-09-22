import React from "react";
import ThemeToggle from "./ThemeToggle";
import { FileDown, BookOpenText, FolderKanban } from "lucide-react";
import Image from "next/image";

function Navbar() {
  return (
    <div
      className="mx-auto fixed bottom-5 left-0 right-0 flex items-center justify-between px-5 py-3 
                 rounded-2xl shadow-lg bg-transparent backdrop-blur-xl z-50 
                 max-w-lg md:max-w-4xl"
    >
      {/* Left side - only visible on md+ */}
      <div className="hidden md:block">
        <h3 className="text-lg font-bold dark:text-white">Ismafolio</h3>
      </div>

      {/* Center/Right side icons */}
      <div className="flex items-center gap-6 justify-center md:justify-end w-full md:w-auto">
        <div className="relative group cursor-pointer hover:scale-125 transition-transform duration-200">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
            alt="LeetCode Logo"
            width={25}
            height={25}
          />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            LeetCode
          </span>
        </div>
        <div className="relative group cursor-pointer hover:scale-125 transition-transform duration-200">
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
            alt="GFG Logo"
            width={25}
            height={25}
          />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            GeeksforGeeks
          </span>
        </div>
        <div className="relative group cursor-pointer hover:scale-125 transition-transform duration-200">
          <BookOpenText />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            Blogs
          </span>
        </div>
        <div className="relative group cursor-pointer hover:scale-125 transition-transform duration-200">
          <FolderKanban />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            Projects
          </span>
        </div>
        <div className="relative group cursor-pointer hover:scale-125 transition-transform duration-200">
          <FileDown />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            Resume
          </span>
        </div>
        <div className="relative group cursor-pointer">
          <ThemeToggle />
          <span className="absolute bottom-full mb-2 hidden group-hover:block 
                           bg-gray-200 text-black dark:bg-gray-800 dark:text-white 
                           text-xs px-2 py-1 rounded">
            Theme
          </span>
        </div>
      </div>
    </div>
  );
}

export default Navbar;