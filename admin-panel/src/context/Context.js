"use client";
import React, { createContext, useContext, useState } from "react";
import {
  addSkillAPI,
  getSKillAPI,
  loginAPI,
  updateSkillAPI,
  deleteSkillAPI,
  getProfileAPI,
  updateProfileAPI
} from "@/services/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const Context = createContext(null);

export const Provider = ({ children }) => {
  const router = useRouter();
  const login = async (username, password) => {
    try {
      const res = await loginAPI(username, password);
      const body = await res.json();
      if (res.ok) {
        localStorage.setItem("Token", body.token);
        toast.success(body.message || "Login successful!");
        router.push("/");
      } else {
        toast.error(body.message || "Login failed");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };
  const [skills, setSkills] = useState([]);
  const getSkill = async () => {
    try {
      const res = await getSKillAPI();
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Skills can not be fetched");
      } else {
        setSkills(data.skills);
      }
    } catch (err) {
      toast.error("Some error while fetching skills");
    }
  };
  const addSkill = async (name, level, rating, icon) => {
    try {
      const res = await addSkillAPI(name, level, rating, icon);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Skill added");
        getSkill();
      } else {
        toast.error(data.message || "Skill can not be added");
      }
    } catch (err) {
      console.log(err);
      toast.error("Some error while adding skill");
    }
  };
  const updateSkill = async (skillId, name, level, rating, icon) => {
    try {
      const res = await updateSkillAPI(skillId, name, level, rating, icon);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to update skill");
      } else {
        toast.success(data.message || "Skill Updated successfully");
        getSkill();
      }
    } catch (err) {
      toast.error("Some error while updating skill");
    }
  };

  const deleteSkill = async (skillId) => {
    try {
      const res = await deleteSkillAPI(skillId);
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Failed to delete skill");
      } else {
        toast.success(data.message || "Skill Deleted successfully");
        getSkill();
      }
    } catch (err) {
      toast.error("Some error while deleting skill");
    }
  };
  const [profile, setProfile] = useState([]);
  const getProfile = async () => {
    try {
      const res = await getProfileAPI();
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Profile fetched");
        setProfile(data.profile[0]);
      } else {
        toast.error(data.message || "Profile can not be fetched");
      }
    } catch (err) {
      toast.error("Some error while fetching profile");
    }
  };
  const updateProfile = async (formData) => {
  try {
    const res = await updateProfileAPI(formData);
    const data = await res.json();

    if (!res.ok) {
      toast.error(data.message || "Failed to update profile");
      return;
    }

    toast.success(data.message || "Profile updated successfully");
    getProfile();
  } catch (err) {
    toast.error("Some error while updating profile");
  }
};

  return (
    <Context.Provider
      value={{
        login,
        addSkill,
        getSkill,
        skills,
        updateSkill,
        deleteSkill,
        getProfile,
        profile,
        updateProfile
      }}
    >
      {children}
      <Toaster position="top-right" />
    </Context.Provider>
  );
};

export const admin = () => useContext(Context);
