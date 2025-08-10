import Blog from "../models/blog.model.js";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Project from "../models/project.model.js";
import Skill from "../models/skill.model.js";
import Profile from "../models/profile.model.js";

export const getProfile = async (req, res) => {
  try {
    const profile = await Profile.find();
    return res.status(201).json({ message: "Profile fetched", profile });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched profile details right now" });
  }
};

export const getEducation = async (req, res) => {
  try {
    const education = await Education.find();
    return res.status(201).json({ message: "Education fetched", education });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched education details right now " });
  }
};

export const getExperience = async (req, res) => {
  try {
    const experience = await Experience.find();
    return res.status(201).json({ message: "Experience fetched", experience });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched experience details right now" });
  }
};

export const getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    return res.status(201).json({ message: "Projects fetched", projects });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched projects details right now" });
  }
};

export const getSkills = async (req, res) => {
  try {
    const skills = await Skill.find();
    return res.status(201).json({ message: "Skills fetched", skills });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched skills details right now" });
  }
};

export const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(201).json({ message: "Blogs fetched", blogs });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched blogs details right now" });
  }
};
