"use client";
import React, { createContext, useContext, useState } from "react";
import {
  getBlogsAPI,
  getEducationAPI,
  getExperienceAPI,
  getGfgProblemsAPI,
  getGfgStatsAPI,
  getLeetCodeStateAPI,
  getLeetcodeHeatmapAPI,
  getLeetcodeProblemsAPI,
  getProfileAPI,
  getProjectsAPI,
  getSkillsAPI,
  sendContactMessageAPI,
  getBlogDetailAPI,
  getProjectDetailAPI,
} from "@/services/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
const Context = createContext(null);

export const Provider = ({ children }) => {
  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
    try {
      const res = await getProfileAPI();
      const data = await res.json();
      if (res.ok) {
        setProfile(data.profile[0]);
      }
    } catch (err) {
      toast.error("Some error while fetching profile");
    }
  };
  const [education, setEducation] = useState([]);
  const getEducation = async () => {
    try {
      const res = await getEducationAPI();
      const data = await res.json();
      if (res.ok) {
        setEducation(data.education);
      }
    } catch (err) {
      toast.error("Some error while fetching education");
    }
  };
  const [experience, setExperience] = useState([]);
  const getExperience = async () => {
    try {
      const res = await getExperienceAPI();
      const data = await res.json();
      if (res.ok) {
        setExperience(data.experience);
      }
    } catch (err) {
      toast.error("Some error while fetching experience");
    }
  };
  const [projects, setProjects] = useState([]);
  const getProjects = async () => {
    try {
      const res = await getProjectsAPI();
      const data = await res.json();
      if (res.ok) {
        setProjects(data.projects);
      }
    } catch (err) {
      toast.error("Some error while fetching projects");
    }
  };
  const [skills, setSkills] = useState([]);
  const getSkills = async () => {
    try {
      const res = await getSkillsAPI();
      const data = await res.json();
      if (res.ok) {
        setSkills(data.skills);
      }
    } catch (err) {
      toast.error("Some error while fetching skills");
    }
  };
  const [blogs, setBlogs] = useState([]);
  const getBlogs = async () => {
    try {
      const res = await getBlogsAPI();
      const data = await res.json();
      if (res.ok) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      toast.error("Some error while fetching blogs");
    }
  };
  const [leetcodeState, setLeetcodeState] = useState([]);
  const getLeetcodeState = async () => {
    try {
      const res = await getLeetCodeStateAPI();
      const data = await res.json();
      if (res.ok) {
        setLeetcodeState(data.leetcodeState);
      }
    } catch (err) {
      toast.error("Some error while fetching leetcode stats");
    }
  };
  const [leetcodeProblems, setLeetcodeProblems] = useState([]);
  const getLeetcodeProblems = async () => {
    try {
      const res = await getLeetcodeProblemsAPI();
      const data = await res.json();
      if (res.ok) {
        setLeetcodeProblems(data.leetcodeProblems);
      }
    } catch (err) {
      toast.error("Some error while fetching leetcode problems");
    }
  };
  const [leetcodeHeatmap, setLeetcodeHeatmap] = useState([]);
  const getLeetcodeHeatmap = async () => {
    try {
      const res = await getLeetcodeHeatmapAPI();
      const data = await res.json();

      if (res.ok) {
        setLeetcodeHeatmap(data.leetcodeHeatmap);
      }
    } catch (err) {
      toast.error("Some error while fetching leetcode heatmap");
    }
  };
  const [gfgState, setGfgStats] = useState([]);
  const getGfgStats = async () => {
    try {
      const res = await getGfgStatsAPI();
      const data = await res.json();
      if (res.ok) {
        setGfgStats(data.gfgStats);
      }
    } catch (err) {
      toast.error("Some error while fetching gfg stats");
    }
  };
  const [gfgProblems, setGfgProblems] = useState([]);
  const getGfgProblems = async () => {
    try {
      const res = await getGfgProblemsAPI();
      const data = await res.json();
      if (res.ok) {
        setGfgProblems(data.gfgProblems);
      }
    } catch (err) {
      toast.error("Some error while fetching gfg problems");
    }
  };
  const sendContactMessage = async (name, email, message) => {
    try {
      const res = await sendContactMessageAPI(name, email, message);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Can not send message, try again");
      } else {
        toast.success(data.message || "Message sent");
      }
    } catch (err) {
      toast.error("Some error while sending message");
    }
  };
  const [blogDetail, setBlogDetail] = useState([]);
  const getBlogDetail = async (blogId) => {
    try {
      const res = await getBlogDetailAPI(blogId);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Can not Fetch detail, try again");
      } else {
        setBlogDetail(data.blogDetail);
      }
    } catch (err) {
      toast.error("Some error while fetching blog detail");
    }
  };
  const [projectDetail, setProjectDetail] = useState([]);
  const getProjectDetail = async (projectId) => {
    try {
      const res = await getProjectDetailAPI(projectId);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Can not Fetch detail, try again");
      } else {
        setProjectDetail(data.projectDetails);
      }
    } catch (err) {
      toast.error("Some error while fetching Project detail");
    }
  };
  return (
    <Context.Provider
      value={{
        getProfile,
        profile,
        getEducation,
        education,
        getExperience,
        experience,
        getProjects,
        projects,
        getSkills,
        skills,
        getBlogs,
        blogs,
        getLeetcodeState,
        leetcodeState,
        getLeetcodeProblems,
        leetcodeProblems,
        getLeetcodeHeatmap,
        leetcodeHeatmap,
        getGfgStats,
        gfgState,
        getGfgProblems,
        gfgProblems,
        sendContactMessage,
        getBlogDetail,
        blogDetail,
        getProjectDetail,
        projectDetail,
      }}
    >
      {children}
      <Toaster position="top-right"></Toaster>
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);
