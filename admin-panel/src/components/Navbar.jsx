"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  UserRoundPen,
  GraduationCap,
  Settings,
  FolderOpenDot,
  FileText,
  BriefcaseBusiness,
  LogIn,
  LogOut,
  Mail,
  Link2,
  Bot,
} from "lucide-react";

function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("Token"));

    const handleRouteChange = () => {
      setToken(localStorage.getItem("Token"));
    };

    router.events?.on?.("routeChangeComplete", handleRouteChange);

    return () => {
      router.events?.off?.("routeChangeComplete", handleRouteChange);
    };
  }, []);

  const logoutHandler = () => {
    localStorage.removeItem("Token");
    setToken(null);
    router.push("/login");
  };

  const navItems = [
    { href: "/profile", label: "Profile", icon: <UserRoundPen /> },
    { href: "/experience", label: "Experience", icon: <BriefcaseBusiness /> },
    { href: "/education", label: "Education", icon: <GraduationCap /> },
    { href: "/skills", label: "Skills", icon: <Settings /> },
    { href: "/projects", label: "Projects", icon: <FolderOpenDot /> },
    { href: "/blogs", label: "Blogs", icon: <FileText /> },
    { href: "/messages", label: "Messages", icon: <Mail /> },
    { href: "/social", label: "Social Media", icon: <Link2 /> },
    { href: "/bot", label: "bot", icon: <Bot /> },
  ];

  return (
    <div className="px-5 py-6 h-full flex flex-col">
      <div className="flex items-center gap-3 mb-8 px-2">
        <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Settings className="text-white" size={24} />
        </div>
        <h3
          className="text-xl font-bold text-white tracking-tight hidden md:block cursor-pointer"
          onClick={() => router.push("/")}
        >
          Admin Panel
        </h3>
      </div>

      <nav className="flex flex-col gap-2 flex-grow overflow-y-auto no-scrollbar">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              router.pathname === item.href
                ? "bg-white/20 text-white shadow-lg border border-white/10"
                : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <span
              className={
                router.pathname === item.href
                  ? "text-white"
                  : "text-emerald-300"
              }
            >
              {React.cloneElement(item.icon, { size: 20 })}
            </span>
            <span className="text-sm">{item.label}</span>
          </Link>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        {!token ? (
          <Link
            href="/login"
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
              router.pathname === "/login"
                ? "bg-white/20 text-white shadow-lg border border-white/10"
                : "text-emerald-100/70 hover:bg-white/10 hover:text-white"
            }`}
          >
            <LogIn size={20} className="text-emerald-300" />
            <span className="text-sm">Login</span>
          </Link>
        ) : (
          <button
            onClick={logoutHandler}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-red-300 hover:bg-red-500/20 hover:text-red-100 transition-all duration-300 cursor-pointer"
          >
            <LogOut size={20} />
            <span className="text-sm">Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}

export default Navbar;
