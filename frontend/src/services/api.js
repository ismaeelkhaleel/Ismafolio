import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export const getProfileAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getBlogsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-blogs`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getEducationAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-education`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getExperienceAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-experience`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getProjectsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getSkillsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getLeetCodeStateAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-leetcode-state`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getLeetcodeProblemsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-leetcode-problems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getLeetcodeHeatmapAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-leetcode-heatmap`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const getGfgStatsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-gfg-stats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getGfgProblemsAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-gfg-problems`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};
export const sendContactMessageAPI = async (name, email, message) => {
  const response = await fetch(`${BASE_URL}/contact/message`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, message }),
  });
  return response;
};
