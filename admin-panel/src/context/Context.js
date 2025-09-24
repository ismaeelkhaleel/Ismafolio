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
  getProjectAPI,
  addProjectAPI,
  updateProjectAPI,
  deleteProjectAPI,
  getBlogAPI,
  addBlogAPI,
  updateBlogAPI,
  deleteBlogAPI,
  getNewMessageAPI,
  getAllMessageAPI,
  seenMessageAPI,
  addSocialAPI,
  updateSocialAPI,
  deleteSocialAPI,
  getSocialAPI,
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
  const [project, setProject] = useState([]);
  const getProject = async () => {
    try {
      const res = await getProjectAPI();
      const data = await res.json();
      if (res.ok) {
        setProject(data.projects);
      } else {
        toast.error(data.message || "Project can not be fetch");
      }
    } catch (err) {
      toast.error("Some error while fetching project");
    }
  };
  const addProject = async (formData) => {
    try {
      console.log(formData);
      const res = await addProjectAPI(formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Project added");
        getProject();
      } else {
        toast.error(data.message || "Project can not be add");
      }
    } catch (err) {
      toast.error("Some error while adding project");
    }
  };
  const updateProject = async (experienceId, formData) => {
    try {
      const res = await updateProjectAPI(experienceId, formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Project updated");
        getProject();
      } else {
        toast.error(data.message || "Project can not be update");
      }
    } catch (err) {
      toast.error("Some error while updating project");
    }
  };
  const deleteProject = async (experienceId) => {
    try {
      const res = await deleteProjectAPI(experienceId);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Project deleted");
        getProject();
      } else {
        toast.error(data.message || "Project can not be delete");
      }
    } catch (err) {
      toast.error("Some error while deleting project");
    }
  };
  const [blog, setBlog] = useState([]);
  const getBlog = async () => {
    try {
      const res = await getBlogAPI();
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Blog can not be fetched");
      } else {
        setBlog(data.blogs);
      }
    } catch (err) {
      toast.error("Some error while fetching blog");
    }
  };

  const addBlog = async (formData) => {
    try {
      const res = await addBlogAPI(formData);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Blog created");
        getBlog();
      } else {
        toast.error(data.message || "Blog can not be create");
      }
    } catch (err) {
      toast.error("Some error while creating blog");
    }
  };

  const updateBlog = async (blogId, formData) => {
    try {
      const res = await updateBlogAPI(blogId, formData);
      const data = res.json();
      if (res.ok) {
        toast.success(data.message || "Blog updated");
        getBlog();
      } else {
        toast.error(data.message || "Blog can not be update");
      }
    } catch (err) {
      toast.error("Some error while updating blog");
    }
  };

  const deleteBlog = async (blogId) => {
    try {
      const res = await deleteBlogAPI(blogId);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Blog deleted");
        getBlog();
      } else {
        toast.error(data.message || "Blog can not be delete");
      }
    } catch (err) {
      toast.error("Some error while deleting blog");
    }
  };
  const [messages, setMessages] = useState([]);
  const getNewMessage = async () => {
    try {
      const res = await getNewMessageAPI();
      const data = await res.json();
      console.log(data);
      if (res.ok) {
        setMessages(data.messages);
      } else {
        toast.error(data.message || "New messages can not be fetched");
      }
    } catch (err) {
      toast.error("Some error while fetching new messages");
    }
  };
  const getAllMessage = async () => {
    try {
      const res = await getAllMessageAPI();
      const data = await res.json();
      if (res.ok) {
        setMessages(data.messages);
      } else {
        toast.error(data.message || "All messages can not be fetched");
      }
    } catch (err) {
      toast.error("Some error while fetching all messages");
    }
  };
  const seenMessage = async (messageId) => {
    try {
      const res = await seenMessageAPI(messageId);
      const data = await res.json();
      if (res.ok) {
        getNewMessage();
      } else {
        toast.error(data.message || "messages can not be update status");
      }
    } catch (err) {
      toast.error("Some error while updating status");
    }
  };

  const [socials, setSocials] = useState([]);
  const getSocial = async () => {
    try {
      const res = await getSocialAPI();
      const data = await res.json();
      if (res.ok) {
        setSocials(data.socials);
      } else {
        toast.error(data.message || "Socials can not be fetched");
      }
    } catch (err) {
      toast.error("Some error while fetching socials");
    }
  };

  const addSocial = async (platform, url, icon) => {
    try {
      const res = await addSocialAPI(platform, url, icon);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Social added");
        getSocial();
      } else {
        toast.error(data.message || "Social can not be added");
      }
    } catch (err) {
      toast.error("Some error while adding social");
    }
  };
  const updateSocial = async (socialId, platform, url, icon) => {
    try {
      const res = await updateSocialAPI(socialId, platform, url, icon);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Social updated");
        getSocial();
      } else {
        toast.error(data.message || "Social can not be updated");
      }
    } catch (err) {
      toast.error("Some error while updating social");
    }
  };
  const deleteSocial = async (socialId) => {
    try {
      const res = await deleteSocialAPI(socialId);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Social deleted");
        getSocial();
      } else {
        toast.error(data.message || "Social can not be deleted");
      }
    } catch (err) {
      toast.error("Some error while deleting social");
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
        getProject,
        project,
        addProject,
        updateProject,
        deleteProject,
        getBlog,
        blog,
        addBlog,
        updateBlog,
        deleteBlog,
        getNewMessage,
        messages,
        getAllMessage,
        seenMessage,
        addSocial,
        socials,
        getSocial,
        updateSocial,
        deleteSocial,
      }}
    >
      {children}
      <Toaster position="top-right" />
    </Context.Provider>
  );
};

export const useAdmin = () => useContext(Context);
