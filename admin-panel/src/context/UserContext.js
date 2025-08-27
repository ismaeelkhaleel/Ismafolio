"use client";
import React, { createContext, useContext } from "react";
import { loginAPI } from "@/services/api";
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
  return (
    <UserContext.Provider value={{ login }}>
      {children}
      <Toaster position="top-right"/>
    </UserContext.Provider>
  );
};

export const useUser = () => useContext(UserContext);