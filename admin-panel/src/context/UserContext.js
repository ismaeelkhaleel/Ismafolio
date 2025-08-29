"use client";
import React, { createContext, useContext } from "react";
import { addSkillAPI, loginAPI } from "@/services/api";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
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
  const addSkill = async(name, level, rating, icon) => {
    try {
      const res = await addSkillAPI(name, level, rating, icon);
      const data = await res.json();
       if(res.ok) {
        toast.success(data.message || "Skill added");
        router.push("/skills");
       } else {
        toast.error(data.message || "Skill can not be added")
       }
    } catch(err) {
       toast.error("Some error while adding skill");
    }
  }
  return (
    <UserContext.Provider value={{ login, addSkill }}>
      {children}
      <Toaster position="top-right"/>
    </UserContext.Provider>
  );
};

export const admin = () => useContext(UserContext);