"use client";
import React, { createContext, useContext, useState } from "react";
import { addSkillAPI, getSKillAPI, loginAPI } from "@/services/api";
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
  const addSkill = async (name, level, rating, icon) => {
    try {
      const res = await addSkillAPI(name, level, rating, icon);
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || "Skill added");
        router.push("/skills");
      } else {
        toast.error(data.message || "Skill can not be added");
      }
    } catch (err) {
      toast.error("Some error while adding skill");
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
  return (
    <Context.Provider value={{ login, addSkill, getSkill,skills }}>
      {children}
      <Toaster position="top-right" />
    </Context.Provider>
  );
};

export const admin = () => useContext(Context);
