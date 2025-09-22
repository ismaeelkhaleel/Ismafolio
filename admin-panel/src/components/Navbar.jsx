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
  ];

  return (
    <div className="px-5 py-3 backdrop-blur-xl h-full shadow-[4px_0_15px_rgba(0,0,0,0.2)]">
      <h3 className="text-lg font-bold hidden md:block">Ismafolio</h3>
      <nav className="flex flex-col gap-4 mt-6">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
              router.pathname === item.href
                ? "bg-green-900 text-white"
                : "hover:bg-green-900 hover:text-white"
            }`}
          >
            {item.icon} {item.label}
          </Link>
        ))}

        {!token ? (
          <Link
            href="/login"
            className={`flex items-center gap-2 px-3 py-2 rounded-md font-bold transition-colors ${
              router.pathname === "/login"
                ? "bg-green-900 text-white"
                : "hover:bg-green-900 hover:text-white"
            }`}
          >
            <LogIn /> Login
          </Link>
        ) : (
          <button
            onClick={logoutHandler}
            className="flex items-center gap-2 px-3 py-2 rounded-md font-bold hover:bg-green-900 hover:text-white cursor-pointer"
          >
            <LogOut /> Logout
          </button>
        )}
      </nav>
    </div>
  );
}

export default Navbar;