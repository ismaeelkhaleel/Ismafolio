"use client";
import React, { createContext, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Context = createContext(null);

export const Provider = ({ children, initialData = {} }) => {
  const [profile, setProfile] = useState(initialData.profile || null);
  const [education, setEducation] = useState(initialData.education || null);
  const [experience, setExperience] = useState(initialData.experience || null);
  const [projects, setProjects] = useState(initialData.projects || null);
  const [skills, setSkills] = useState(initialData.skills || null);
  const [blogs, setBlogs] = useState(initialData.blogs || null);
  const [socials, setSocials] = useState(initialData.socials || null);
  const [leetcodeState, setLeetcodeState] = useState(
    initialData.leetcodeState || null,
  );
  const [leetcodeProblems, setLeetcodeProblems] = useState(
    initialData.leetcodeProblems || null,
  );
  const [leetcodeHeatmap, setLeetcodeHeatmap] = useState(
    initialData.leetcodeHeatmap || null,
  );
  const [gfgState, setGfgState] = useState(initialData.gfgState || null);
  const [gfgProblems, setGfgProblems] = useState(
    initialData.gfgProblems || null,
  );
  return (
    <Context.Provider
      value={{
        profile,
        setProfile,
        education,
        setEducation,
        experience,
        setExperience,
        projects,
        setProjects,
        skills,
        setSkills,
        blogs,
        setBlogs,
        socials,
        setSocials,
        leetcodeState,
        setLeetcodeState,
        gfgState,
        setGfgState,
        leetcodeProblems,
        setLeetcodeProblems,
        leetcodeHeatmap,
        setLeetcodeHeatmap,
        gfgProblems,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </Context.Provider>
  );
};

export const useUser = () => useContext(Context);