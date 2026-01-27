const BASE_URL = process.env.BACKEND_BASE_URL;

// ---------- COMMON FETCH ----------
const fetchAPI = async (url, options = {}) => {
  const res = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
    },
    ...options,
  });

  return res;
};

// ---------- PROFILE ----------
export const getProfileAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-profile`, {
    cache: "force-cache", // portfolio data
  });
};

// ---------- BLOGS ----------
export const getBlogsAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-blogs`, {
    cache: "no-store", // blogs change frequently
  });
};

export const getBlogDetailAPI = async (blogId) => {
  return fetchAPI(`${BASE_URL}/get-blog-detail/${blogId}`, {
    cache: "no-store",
  });
};

// ---------- EDUCATION ----------
export const getEducationAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-education`, {
    cache: "force-cache",
  });
};

// ---------- EXPERIENCE ----------
export const getExperienceAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-experience`, {
    cache: "force-cache",
  });
};

// ---------- PROJECTS ----------
export const getProjectsAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-projects`, {
    cache: "force-cache",
  });
};

export const getProjectDetailAPI = async (projectId) => {
  return fetchAPI(`${BASE_URL}/get-project-detail/${projectId}`, {
    cache: "no-store",
  });
};

// ---------- SKILLS ----------
export const getSkillsAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-skills`, {
    cache: "force-cache",
  });
};

// ---------- SOCIAL LINKS ----------
export const getSocialLinksAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-social-links`, {
    cache: "force-cache",
  });
};

// ---------- LEETCODE ----------
export const getLeetCodeStateAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-leetcode-state`, {
    cache: "no-store",
  });
};

export const getLeetcodeProblemsAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-leetcode-problems`, {
    cache: "no-store",
  });
};

export const getLeetcodeHeatmapAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-leetcode-heatmap`, {
    cache: "no-store",
  });
};

// ---------- GFG ----------
export const getGfgStateAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-gfg-stats`, {
    cache: "no-store",
  });
};

export const getGfgProblemsAPI = async () => {
  return fetchAPI(`${BASE_URL}/get-gfg-problems`, {
    cache: "no-store",
  });
};

// ---------- CONTACT (CLIENT ACTION) ----------
export const sendContactMessageAPI = async (name, email, message) => {
  return fetchAPI(`${BASE_URL}/contact/message`, {
    method: "POST",
    body: JSON.stringify({ name, email, message }),
  });
};
