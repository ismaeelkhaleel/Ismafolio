import { useState } from "react";

const BASE_URL = "http://localhost:5000";

export const loginAPI = async (username, password) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  return response;
};

export const addSkillAPI = async (name, level, rating, icon) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/addSkill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, level, rating, icon }),
  });
  return response;
};

export const getSKillAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-skills`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateSkillAPI = async (skillId, name, level, rating, icon) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/update/skill/${skillId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ name, level, rating, icon }),
  });
  return response;
};

export const deleteSkillAPI = async (skillId) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/delete/skill/${skillId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response;
};

export const getProfileAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const updateProfileAPI = async (formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/update-profile`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
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

export const addEducationAPI = async (formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/addEducation`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const updateEducationAPI = async (educationId, formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/update/education/${educationId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const deleteEducationAPI = async (educationId) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/delete/education/${educationId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
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

export const addExperienceAPI = async (formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/create/experience`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(formData),
  });
  return response;
};

export const updateExperienceAPI = async (experienceId, formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(
    `${BASE_URL}/update/experience/${experienceId}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(formData),
    }
  );
  return response;
};

export const deleteExperienceAPI = async (experienceId) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(
    `${BASE_URL}/delete/experience/${experienceId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const getProjectAPI = async () => {
  const response = await fetch(`${BASE_URL}/get-projects`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const addProjectAPI = async (formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(`${BASE_URL}/add/project`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });
  return response;
};

export const updateProjectAPI = async (projectId, formData) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(
    `${BASE_URL}/update/project/${projectId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
  return response;
};

export const deleteProjectAPI = async (projectId) => {
  const token = localStorage.getItem("Token");
  const response = await fetch(
    `${BASE_URL}/delete/project/${projectId}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};