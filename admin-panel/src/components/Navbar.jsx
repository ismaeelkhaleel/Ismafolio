"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {UserRoundPen,GraduationCap,Settings,FolderOpenDot,FileText,BriefcaseBusiness,LogIn} from "lucide-react";

function Navbar() {
  const pathname = usePathname();

  return (
    <div className="px-5 py-3 backdrop-blur-xl h-full shadow-[4px_0_15px_rgba(0,0,0,0.2)]">
      <h3 className="text-lg font-bold hidden md:block">Ismafolio</h3>
      <nav className="flex flex-col gap-4 mt-6">
        <Link
          href="/profile"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/profile"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <UserRoundPen/> Profile
        </Link>

        <Link
          href="/experience"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/experience"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <BriefcaseBusiness/> Experience
        </Link>

        <Link
          href="/education"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/education"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <GraduationCap/> Education
        </Link>

        <Link
          href="/skills"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/skills"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <Settings/> Skills
        </Link>

        <Link
          href="/projects"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/projects"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <FolderOpenDot/> Projects
        </Link>

        <Link
          href="/blogs"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/blogs"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <FileText/> Blogs
        </Link>

        <Link
          href="/login"
          className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
            pathname === "/login"
              ? "bg-green-900 text-white"
              : "hover:bg-green-900 hover:text-white"
          }`}
        >
         <LogIn/> Login
        </Link>
      </nav>
    </div>
  );
}

export default Navbar;