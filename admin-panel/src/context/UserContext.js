"use client";
import React, { createContext, useState, useContext } from "react";
import { loginAPI } from "@/services/api";

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {

  const login = async (username, password) => {
    try {
      const data = await loginAPI(username, password);
      console.log("data",data);
      localStorage.setItem("Token",data.token);
    } catch (err) {
      console.log(err.message);
    }
  };
  return (
    <UserContext.Provider value={{login}}>
        {children}
    </UserContext.Provider>
  )
};

export const useUser = () => useContext(UserContext);