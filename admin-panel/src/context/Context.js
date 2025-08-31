"use client";
import React, { createContext, useContext, useState } from "react";
import {
  addSkillAPI,
  getSKillAPI,
  loginAPI,
  updateSkillAPI,
  deleteSkillAPI,
  getProfileAPI,
  updateProfileAPI,
  addEducationAPI,
  updateEducationAPI,
  deleteEducationAPI,
  getEducationAPI,
  getExperienceAPI,
  addExperienceAPI,
  updateExperienceAPI,
  deleteExperienceAPI,
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

  const [education, setEducation] = useState([]);
  const getEducation = async () => {
    try {
      const res = await getEducationAPI();
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Education fetched");
        setEducation(data.education);
      } else {
        toast.error(data.message || "Education can not be fetched");
      }
    } catch (err) {
      toast.error("Some error while fetching education");
    }
  };
  const addEducation = async (formData) => {
    try {
      console.log("Called add");
      const res = await addEducationAPI(formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Education Added");
        getEducation();
      } else {
        toast.error(data.message || "Education can not be added");
      }
    } catch (err) {
      toast.error("Some error while adding Education");
    }
  };
  const updateEducation = async (educationId, formData) => {
    try {
      console.log("called update");
      const res = await updateEducationAPI(educationId, formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Education updated");
        getEducation();
      } else {
        toast.error(data.message || "Education can not be added");
      }
    } catch (error) {
      toast.error("Some error while updating education");
    }
  };
  const deleteEducation = async (educationId) => {
    try {
      const res = await deleteEducationAPI(educationId);
      const data = res.json();
      if (res.ok) {
        toast.success(data.message || "Education deleted");
        getEducation();
      } else {
        toast.error(data.message || "Education can not be deleted");
      }
    } catch (err) {
      toast.error("Some error while deleting education");
    }
  };
  const [experience, setExperience] = useState([]);
  const getExperience = async () => {
    try {
      const res = await getExperienceAPI();
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Experience fetched");
        setExperience(data.experience);
      } else {
        toast.error(data.message || "Experience can not be fetch");
      }
    } catch (err) {
      toast.error("Some error while fetching experience");
    }
  };
  const addExperience = async (formData) => {
    try {
      const res = await addExperienceAPI(formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Experience added");
        getExperience();
      } else {
        toast.error(data.message || "Experience can not be add");
      }
    } catch (err) {
      toast.error("Some error while adding experience");
    }
  };
  const updateExperience = async (experienceId, formData) => {
    try {
      const res = await updateExperienceAPI(experienceId, formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Experience updated");
        getExperience();
      } else {
        toast.error(data.message || "Experience can not be update");
      }
    } catch (err) {
      toast.error("Some error while updating experience");
    }
  };
  const deleteExperience = async (experienceId) => {
    try {
      const res = await deleteExperienceAPI(experienceId);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Experience deleted");
        getExperience();
      } else {
        toast.error(data.message || "Experience can not be delete");
      }
    } catch (err) {
      toast.error("Some error while deleting experience");
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
        updateProfile,
        getEducation,
        education,
        addEducation,
        updateEducation,
        deleteEducation,
        getExperience,
        experience,
        addExperience,
        updateExperience,
        deleteExperience,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </Context.Provider>
  );
};

export const admin = () => useContext(Context);
