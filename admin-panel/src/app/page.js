"use client";
import React, { useEffect } from "react";
import { useAdmin } from "@/context/Context";
import { 
  Settings, 
  FolderOpenDot, 
  FileText, 
  Mail, 
  UserRoundPen, 
  PlusCircle, 
  ArrowRight 
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  const { 
    getSkill, skills, 
    getProject, project, 
    getBlog, blog, 
    getNewMessage, messages,
    getProfile, profile 
  } = useAdmin();

  useEffect(() => {
    getSkill();
    getProject();
    getBlog();
    getNewMessage();
    getProfile();
  }, []);

  const stats = [
    { 
      label: "Total Skills", 
      value: skills?.length || 0, 
      icon: <Settings size={24} />, 
      color: "bg-blue-500", 
      href: "/skills" 
    },
    { 
      label: "Projects", 
      value: project?.length || 0, 
      icon: <FolderOpenDot size={24} />, 
      color: "bg-emerald-500", 
      href: "/projects" 
    },
    { 
      label: "Blogs", 
      value: blog?.length || 0, 
      icon: <FileText size={24} />, 
      color: "bg-purple-500", 
      href: "/blogs" 
    },
    { 
      label: "New Messages", 
      value: messages?.length || 0, 
      icon: <Mail size={24} />, 
      color: "bg-orange-500", 
      href: "/messages" 
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">
            Welcome back, {profile?.name?.split(" ")[0] || "Mohd Ismaeel"}!
          </h1>
          <p className="text-emerald-100/60">
            Here's what's happening with your portfolio today.
          </p>
        </div>
        <div className="flex gap-3">
          <Link 
            href="/projects" 
            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl transition-all border border-white/10"
          >
            <PlusCircle size={18} />
            Add Project
          </Link>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Link 
            key={index} 
            href={stat.href}
            className="glass-card p-6 group hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className={`p-3 rounded-xl ${stat.color} text-white shadow-lg shadow-black/10`}>
                {stat.icon}
              </div>
              <span className="text-3xl font-bold text-white">{stat.value}</span>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-emerald-100/60 font-medium">{stat.label}</span>
              <ArrowRight size={16} className="text-emerald-100/20 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </div>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="glass-card p-6 lg:col-span-1 space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full border-2 border-emerald-400 p-1">
              <img 
                src={profile?.avatar || "https://ui-avatars.com/api/?name=Mohd+Ismaeel"} 
                alt="Avatar" 
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div>
              <h3 className="font-bold text-white text-lg">{profile?.name || "Mohd Ismaeel"}</h3>
              <p className="text-sm text-emerald-100/50">{profile?.title || "Full Stack Developer"}</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
              <Mail size={16} />
              <span>{profile?.email || "ismaeel@example.com"}</span>
            </div>
            <div className="flex items-center gap-3 text-emerald-100/70 text-sm">
              <UserRoundPen size={16} />
              <span>{profile?.phone || "+91 1234567890"}</span>
            </div>
          </div>

          <Link 
            href="/profile" 
            className="block text-center w-full py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl transition-all font-medium shadow-lg shadow-emerald-500/20"
          >
            Edit Profile
          </Link>
        </div>

        {/* Recent Activity / Quick Links */}
        <div className="glass-card p-6 lg:col-span-2">
          <h3 className="text-xl font-bold text-white mb-6">Quick Overview</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400">
                  <Settings size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Top Skill</h4>
                  <p className="text-xs text-emerald-100/50">{skills?.[0]?.name || "None added yet"}</p>
                </div>
              </div>
              <Link href="/skills" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View All</Link>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                  <FolderOpenDot size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Latest Project</h4>
                  <p className="text-xs text-emerald-100/50">{project?.[0]?.title || "None added yet"}</p>
                </div>
              </div>
              <Link href="/projects" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View All</Link>
            </div>

            <div className="p-4 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center text-purple-400">
                  <FileText size={20} />
                </div>
                <div>
                  <h4 className="font-medium text-white text-sm">Latest Blog</h4>
                  <p className="text-xs text-emerald-100/50">{blog?.[0]?.title || "None added yet"}</p>
                </div>
              </div>
              <Link href="/blogs" className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">View All</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
