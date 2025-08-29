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
