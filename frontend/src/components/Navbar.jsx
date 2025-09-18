import React from "react";
import ThemeToggle from "./ThemeToggle";
import { FileDown } from "lucide-react";
import Image from "next/image";

function Navbar() {
  return (
    <div
      className="w-4/5 mx-auto fixed bottom-15 left-0 right-0 flex items-center justify-between px-5 py-3 
                    rounded-2xl shadow-lg 
                    bg-transparent backdrop-blur-xl z-555"
    >
      <div>
        <h3 className="text-lg font-bold dark:text-white">Ismafolio</h3>
      </div>

      <div className="flex items-center gap-10">
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png"
          alt="LeetCode Logo"
          width={25}
          height={25}
          className="cursor-pointer hover:scale-125 transition-transform duration-200"
        />
        <Image
          src="https://upload.wikimedia.org/wikipedia/commons/4/43/GeeksforGeeks.svg"
          alt="GFG Logo"
          width={25}
          height={25}
          className="cursor-pointer hover:scale-125 transition-transform duration-200"
        />
        <div className="cursor-pointer hover:scale-125 transition-transform duration-200">
          <FileDown />
        </div>

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
