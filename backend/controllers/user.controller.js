import Blog from "../models/blog.model.js";
import Education from "../models/education.model.js";
import Experience from "../models/experience.model.js";
import Project from "../models/project.model.js";
import Skill from "../models/skill.model.js";
import Profile from "../models/profile.model.js";
import LeetCodeState from "../models/leetcodeState.model.js";
import LeetcodeProblem from "../models/leetcodeProblem.model.js";
import LeetcodeHeatmap from "../models/leetcodeHeatmap.model.js";
import GfgStats from "../models/gfgState.model.js";
import GfgProblems from "../models/gfgProblem.model.js";

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

export const getLeetcodeSate = async (req, res) => {
  try {
    const leetcodeState = await LeetCodeState.find();
    return res
      .status(201)
      .json({ message: "LeetCode State fetched", leetcodeState });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Can not be fetched LeetCode State details right now" });
  }
};

export const getLeetcodeProblems = async (req, res) => {
  try {
    const leetcodeProblems = await LeetcodeProblem.find();
    return res
      .status(201)
      .json({ message: "LeetCode Problems fetched", leetcodeProblems });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Can not be fetched LeetCode Problems details right now",
    });
  }
};

export const getLeetcodeHeatmap = async (req, res) => {
  try {
    const leetcodeHeatmap = await LeetcodeHeatmap.find();
    return res
      .status(201)
      .json({ message: "LeetCode Heatmap fetched", leetcodeHeatmap });
  } catch (error) {
    return res.status(500).json({
      message: "Can not be fetched LeetCode Heatmap details right now ",
    });
  }
};

export const getGfgStats = async (req, res) => {
  try {
    const gfgStats = await GfgStats.find();
    return res.status(201).json({ message: "Gfg stats fetched", gfgStats });
  } catch (error) {
    return res.status(500).json({
      message: "Can not be fetched gfg stats right now ",
    });
  }
};

export const getGfgProblems = async (req, res) => {
  try {
    const gfgProblems = await GfgProblems.find();
    return res
      .status(201)
      .json({ message: "Gfg Problems fetched", gfgProblems });
  } catch (error) {
    return res.status(500).json({
      message: "Can not be fetched gfg Problems details right now",
    });
  }
};
