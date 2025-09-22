"use client";
import React, { useEffect, useState } from "react";
import { useAdmin } from "@/context/Context";
import withAuth from "@/components/withAuth";
function Page() {
  const { getProfile, profile, updateProfile } = useAdmin();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
    title: [],
    resume: "",
    image: "",
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [isEdited, setIsEdited] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    if (profile?.title) {
      setTitleInput(profile.title.join(", "));
    }
  }, [profile]);

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      title: titleInput
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t !== ""),
    }));
  }, [titleInput]);

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        description: profile.description || "",
        title: profile.title || [],
        resume: profile.resume || "",
        image: profile.image || "",
      });
    }
  }, [profile]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsEdited(true);
  };

  const handleFileChange = (e) => {
    if (e.target.name === "resume") setResumeFile(e.target.files[0]);
    if (e.target.name === "image") setImageFile(e.target.files[0]);
    setIsEdited(true);
  };

  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      description: profile?.description || "",
      title: profile?.title || [],
      resume: profile?.resume || "",
      image: profile?.image || "",
    });
    setResumeFile(null);
    setImageFile(null);
    setIsEdited(false);
    setTitleInput(profile?.title?.join(", ") || "");
  };

  const handleUpdate = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("description", formData.description);
    formData.title.forEach((t) => form.append("title", t));
    if (resumeFile) form.append("resume", resumeFile);
    if (imageFile) form.append("image", imageFile);
    await updateProfile(form);
    setIsEdited(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6 bg-emerald-500 shadow-md rounded-2xl">
      <h1 className="text-3xl font-bold text-emerald-700 mb-6 text-center">
        Admin Profile
      </h1>

      <div className="space-y-2">
        <div className="flex items-center gap-4">
          {formData.image ? (
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : formData.image}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover border shadow"
            />
          ) : (
            <p className="text-gray-500">No image uploaded</p>
          )}
          <div>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              className="block text-sm text-gray-600"
            />
          </div>
        </div>
      </div>

      <div className="space-y-2">
        {formData.resume ? (
          <a
            href={formData.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="text-emerald-600 underline font-medium"
          >
            Download Resume
          </a>
        ) : (
          <p className="text-gray-500">No resume uploaded</p>
        )}
        <input
          type="file"
          name="resume"
          onChange={handleFileChange}
          className="block text-sm text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          placeholder="Enter your name"
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none px-2 py-2"
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          placeholder="Enter your email"
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none px-2 py-2"
        />

        <textarea
          name="description"
          value={formData.description}
          placeholder="Write about yourself"
          onChange={handleChange}
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none px-2 py-2"
        />

        <input
          type="text"
          name="title"
          value={titleInput}
          placeholder="Enter titles (comma separated)"
          onChange={(e) => {
            setTitleInput(e.target.value);
            setIsEdited(true);
          }}
          className="w-full border-b-2 border-gray-300 focus:border-emerald-500 outline-none px-2 py-2"
        />
      </div>

      {isEdited && (
        <div className="flex gap-4 justify-end mt-6">
          <button
            onClick={handleCancel}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow"
          >
            Update
          </button>
        </div>
      )}
    </div>
  );
}

export default withAuth(Page);
