import express from "express";
import { upload } from "../middlewares/multer.js";
import {
  login,
  addSkill,
  updateSkill,
  deleteSkill,
  addEducation,
  updateEducation,
  deleteEducation,
  addProject,
  updateProject,
  deleteProject,
  createExperience,
  updateExperience,
  deleteExperience,
  createBlog,
  updateBlog,
  deleteBlog,
  upsertAdminProfile,
  getNewMessage,
  getAllMessage,
  seenMessage,
  addSocialLink,
  updateSocialLink,
  deleteSocialLink,
} from "../controllers/admin.controller.js";
import verifyToken from "../middlewares/verifyToken.js";

const router = express.Router();
router.post("/login", login);
router.post("/addSkill", verifyToken, addSkill);
router.put("/update/skill/:id", verifyToken, updateSkill);
router.delete("/delete/skill/:id", verifyToken, deleteSkill);
router.post("/addEducation", verifyToken, addEducation);
router.put("/update/education/:id", verifyToken, updateEducation);
router.delete("/delete/education/:id", verifyToken, deleteEducation);
router.post(
  "/add/project",
  verifyToken,
  upload.single("thumbnail"),
  addProject
);
router.put(
  "/update/project/:id",
  verifyToken,
  upload.single("thumbnail"),
  updateProject
);
router.delete("/delete/project/:id", verifyToken, deleteProject);
router.post("/create/experience", verifyToken, createExperience);
router.put("/update/experience/:id", verifyToken, updateExperience);
router.delete("/delete/experience/:id", verifyToken, deleteExperience);
router.post(
  "/create/blog",
  verifyToken,
  upload.single("coverImage"),
  createBlog
);
router.put(
  "/update/blog/:id",
  verifyToken,
  upload.single("coverImage"),
  updateBlog
);
router.delete("/delete/blog/:id", verifyToken, deleteBlog);
router.put(
  "/update-profile",
  verifyToken,
  upload.fields([
    { name: "resume", maxCount: 1 },
    { name: "image", maxCount: 1 },
  ]),
  upsertAdminProfile
);
router.get("/get-new-contact-message", verifyToken, getNewMessage);
router.get("/get-all-contact-message", verifyToken, getAllMessage);
router.put("/seen-contact-message/:id", verifyToken, seenMessage);
router.post("/add/social-link", verifyToken, addSocialLink);
router.put("/update/social-link/:id", verifyToken, updateSocialLink);
router.delete("/delete/social-link/:id", verifyToken, deleteSocialLink);

export default router;
