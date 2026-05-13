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
    images: [],
  });

  const [resumeFile, setResumeFile] = useState(null);
  const [imageFiles, setImageFiles] = useState([]); // 👈 multiple files
  const [previewUrls, setPreviewUrls] = useState([]);
  const [isEdited, setIsEdited] = useState(false);
  const [titleInput, setTitleInput] = useState("");

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile?.title) setTitleInput(profile.title.join(", "));
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        description: profile.description || "",
        title: profile.title || [],
        resume: profile.resume || "",
        images: profile.images || [],
      });
      setPreviewUrls(profile.images || []);
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

  // Handle text inputs
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setIsEdited(true);
  };

  // Handle file inputs
  const handleFileChange = (e) => {
    if (e.target.name === "resume") {
      setResumeFile(e.target.files[0]);
    }
    if (e.target.name === "images") {
      const files = Array.from(e.target.files);
      if (files.length > 5) {
        alert("You can upload a maximum of 5 images");
        return;
      }
      setImageFiles(files);
      setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
    }
    setIsEdited(true);
  };

  // Cancel edits
  const handleCancel = () => {
    setFormData({
      name: profile?.name || "",
      email: profile?.email || "",
      description: profile?.description || "",
      title: profile?.title || [],
      resume: profile?.resume || "",
      images: profile?.images || [],
    });
    setPreviewUrls(profile?.images || []);
    setResumeFile(null);
    setImageFiles([]);
    setIsEdited(false);
    setTitleInput(profile?.title?.join(", ") || "");
  };

  // Update
  const handleUpdate = async () => {
    const form = new FormData();
    form.append("name", formData.name);
    form.append("email", formData.email);
    form.append("description", formData.description);
    formData.title.forEach((t) => form.append("title", t));

    if (resumeFile) form.append("resume", resumeFile);
    imageFiles.forEach((file) => form.append("images", file)); // 👈 multiple

    await updateProfile(form);
    setIsEdited(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 animate-in fade-in duration-500">
      <header className="text-center space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">Admin Profile</h1>
        <p className="text-emerald-100/40 text-sm">Manage your professional identity and public information</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Media */}
        <div className="lg:col-span-1 space-y-6">
          {/* Portfolio Images */}
          <div className="glass-card p-6 space-y-4">
            <h2 className="text-sm font-bold text-emerald-100/50 uppercase tracking-wider">
              Portfolio Images
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {previewUrls.length > 0 ? (
                previewUrls.map((url, i) => (
                  <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                    <img
                      src={url}
                      alt={`Preview ${i}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                ))
              ) : (
                <div className="col-span-2 aspect-square rounded-xl bg-white/5 border border-dashed border-white/10 flex items-center justify-center text-emerald-100/20 text-xs text-center p-4">
                  No images uploaded
                </div>
              )}
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input
                type="file"
                name="images"
                multiple
                accept="image/*"
                onChange={handleFileChange}
                className="block w-full text-xs text-emerald-100/50
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-xs file:font-bold
                  file:bg-emerald-500 file:text-white
                  hover:file:bg-emerald-600 transition-all cursor-pointer"
              />
            </label>
            <p className="text-[10px] text-emerald-100/20 text-center italic">Up to 5 images allowed</p>
          </div>

          {/* Resume Link */}
          <div className="glass-card p-6 space-y-4 text-center">
             <h2 className="text-sm font-bold text-emerald-100/50 uppercase tracking-wider">
              Resume / CV
            </h2>
            {formData.resume ? (
              <a
                href={formData.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-emerald-400 text-sm font-bold transition-all"
              >
                View Current Resume
              </a>
            ) : (
              <p className="text-emerald-100/20 text-xs italic">No resume uploaded</p>
            )}
            <input
              type="file"
              name="resume"
              onChange={handleFileChange}
              className="block w-full text-xs text-emerald-100/50
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-lg file:border-0
                  file:text-xs file:font-bold
                  file:bg-white/10 file:text-white
                  hover:file:bg-white/20 transition-all cursor-pointer"
            />
          </div>
        </div>

        {/* Right Column: Text Fields */}
        <div className="lg:col-span-2 space-y-6">
          <div className="glass-card p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                placeholder="Mohd Ismaeel"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                placeholder="ismaeel@example.com"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Professional Titles</label>
              <input
                type="text"
                name="title"
                value={titleInput}
                placeholder="Full Stack Developer, UI Designer..."
                onChange={(e) => {
                  setTitleInput(e.target.value);
                  setIsEdited(true);
                }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium"
              />
              <p className="text-[10px] text-emerald-100/30 italic ml-1">* Separate multiple titles with commas</p>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Bio / Description</label>
              <textarea
                name="description"
                value={formData.description}
                placeholder="Tell the world about yourself..."
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all font-medium min-h-[150px] leading-relaxed"
              />
            </div>

            {/* Sticky Actions Bar */}
            {isEdited && (
              <div className="flex gap-4 justify-end pt-4 border-t border-white/5 animate-in slide-in-from-bottom-2">
                <button
                  onClick={handleCancel}
                  className="px-6 py-2.5 rounded-xl font-bold text-emerald-100/60 hover:bg-white/10 hover:text-white transition-all"
                >
                  Discard
                </button>
                <button
                  onClick={handleUpdate}
                  className="px-8 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all shadow-lg shadow-emerald-500/20"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default withAuth(Page);