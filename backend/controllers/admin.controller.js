import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import Skill from "../models/skill.model.js";
import Education from "../models/education.model.js";
import Project from "../models/project.model.js";
import Profile from "../models/profile.model.js";
import Experience from "../models/experience.model.js";
import Blog from "../models/blog.model.js";
import ContactMessage from "../models/contactMessage.model.js";

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ message: "Invalid username" });

    if (password !== user.password)
      return res.status(401).json({ message: "Invalid password" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({ token, message: "Login successful" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Login failed" });
  }
};

export const addSkill = async (req, res) => {
  const { name, level, rating, icon } = req.body;

  try {
    if (!name) return res.status(400).json({ message: "Name is required" });
    if (!rating)
      return res.status(400).json({ message: "Rating is required" });
    const existingSkill = await Skill.findOne({name:name});
    if(existingSkill) {
      return res.status(409).json({message:"Skill already exist"});
    }
    const skill = await Skill.create({ name, level, rating, icon });

    return res.status(201).json({ message: "Skill added successfully", skill });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, level, category, icon } = req.body;
  try {
    const skill = await Skill.findByIdAndUpdate(
      id,
      { name, level, category, icon },
      { new: true }
    );
    return res
      .status(200)
      .json({ message: "Skill updated successfully", skill });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const skill = await Skill.findByIdAndDelete(id);
    if (!skill) return res.status(404).json({ message: "Skill not found" });
    return res.status(200).json({ message: "Skill deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addEducation = async (req, res) => {
  const { degree, institute, startYear, endYear, description } = req.body;
  try {
    if (!degree) return res.status(400).json({ message: "Degree is required" });
    if (!institute)
      return res.status(400).json({ message: "Institute is required" });
    if (!startYear)
      return res.status(400).json({ message: "Start year is required" });
    if (!description)
      return res.status(400).json({ message: "Description is required" });
    const education = await Education.create({
      degree,
      institute,
      startYear,
      endYear,
      description,
    });
    return res
      .status(201)
      .json({ message: "Education added successfully", education });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (!education)
      return res.status(404).json({ message: "Education not found" });
    return res
      .status(200)
      .json({ message: "Education updated successfully", education });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteEducation = async (req, res) => {
  const { id } = req.params;
  try {
    const education = await Education.findByIdAndDelete(id);
    if (!education)
      return res.status(404).json({ message: "Education not found" });
    return res.status(200).json({ message: "Education deleted successfully" });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

export const addProject = async (req, res) => {
  try {
    const { title, description, techStack, githubUrl } = req.body;
    if (!title || !description) {
      return res
        .status(400)
        .json({ message: "Title and description are required." });
    }

    const thumbnail = req.file ? req.file.path : "";

    const newProject = new Project({
      title,
      thumbnail,
      description,
      techStack: Array.isArray(techStack) ? techStack : [],
      githubUrl,
    });

    const savedProject = await newProject.save();

    return res
      .status(201)
      .json({ message: "Project added successfully", project: savedProject });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, techStack, githubUrl } = req.body;
    const updateData = { title, description, githubUrl };

    updateData.thumbnail = req.file ? req.file.path : "";
    if (techStack && Array.isArray(techStack)) {
      updateData.techStack = techStack;
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedProject = await Project.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    if (!updatedProject)
      return res.status(404).json({ message: "Project not found" });

    return res.status(200).json({
      message: "Project updated successfully",
      project: updatedProject,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProject = await Project.findByIdAndDelete(id);
    if (!deletedProject)
      return res.status(404).json({ message: "Project not found" });
    return res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

export const createAdminProfile = async (req, res) => {
  try {
    const existingProfile = await Profile.findOne();
    if (existingProfile) {
      return res.status(400).json({ message: "Profile already exists" });
    }

    const { name, description, title, email } = req.body;

    if (!name || !description || !email) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const resume = req.files?.resume ? req.files.resume[0].path : "";
    const image = req.files?.image ? req.files.image[0].path : "";

    const newProfile = new Profile({
      name,
      description,
      title: Array.isArray(title) ? title : [],
      email,
      resume,
      image,
    });

    const savedProfile = await newProfile.save();

    res
      .status(201)
      .json({ message: "Profile created successfully", profile: savedProfile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateAdminProfile = async (req, res) => {
  try {
    const { name, description, title, email } = req.body;
    const updateData = { name, description, email };

    if (req.files?.resume) {
      updateData.resume = req.files.resume[0].path;
    }

    if (req.files?.image) {
      updateData.image = req.files.image[0].path;
    }

    if (title) {
      updateData.title = Array.isArray(title) ? title : [];
    }

    Object.keys(updateData).forEach(
      (key) => updateData[key] === undefined && delete updateData[key]
    );

    const updatedProfile = await Profile.findOneAndUpdate({}, updateData, {
      new: true,
      upsert: false,
    });

    if (!updatedProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile: updatedProfile,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const createExperience = async (req, res) => {
  try {
    const { companyName, jobTitle, startDate, endDate, description, location } =
      req.body;

    if (!companyName || !jobTitle || !startDate || !location) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const newExperience = await Experience.create({
      companyName,
      jobTitle,
      startDate,
      endDate,
      description,
      location,
    });

    res.status(201).json({
      message: "Experience added successfully",
      Experience: newExperience,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateExperience = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updated = await Experience.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updated)
      return res.status(404).json({ message: "Experience not found" });

    res.status(201).json({
      message: "Experience updated successfully",
      Experience: updated,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteExperience = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Experience.findByIdAndDelete(id);

    if (!deleted)
      return res.status(404).json({ message: "Experience not found" });

    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    const coverImage = req.file ? req.file.path : "";

    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title and content are required" });
    }

    const newBlog = await Blog.create({
      title,
      coverImage,
      content,
    });

    res
      .status(201)
      .json({ message: "Blog Created Successfully", Blog: newBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedBlog = await Blog.findByIdAndUpdate(id, updates, {
      new: true,
    });

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res
      .status(200)
      .json({ message: "Blow Updated successfully", Blog: updatedBlog });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const getMessage = async (req, res) => {
  try {
    const message = await ContactMessage.aggregate([
      { $match: { done: false } },
      { $sort: { createdAt: -1 } },
    ]);
    res
      .status(200)
      .json({ message: "Messages fetched successfully", messages: message });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
