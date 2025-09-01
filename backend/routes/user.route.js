import express from "express";
import {
  getProfile,
  getBlogs,
  getEducation,
  getExperience,
  getProjects,
  getSkills,
  getLeetcodeSate,
  getLeetcodeProblems,
  getLeetcodeHeatmap,
  getGfgStats,
  getGfgProblems,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.get("/get-blogs", getBlogs);
router.get("/get-education", getEducation);
router.get("/get-experience", getExperience);
router.get("/get-projects", getProjects);
router.get("/get-skills", getSkills);
router.get("/get-leetcode-state", getLeetcodeSate);
router.get("/get-leetcode-problems", getLeetcodeProblems);
router.get("/get-leetcode-heatmap", getLeetcodeHeatmap);
router.get("/get-gfg-stats", getGfgStats);
router.get("/get-gfg-problems", getGfgProblems);

export default router;
