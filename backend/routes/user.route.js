import express from "express";
import {
  getProfile,
  getBlogs,
  getEducation,
  getExperience,
  getProjects,
  getSkills,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/get-profile", getProfile);
router.get("/get-blogs", getBlogs);
router.get("/get-education", getEducation);
router.get("/get-experience", getExperience);
router.get("/get-projects", getProjects);
router.get("/get-skills", getSkills);

export default router;
