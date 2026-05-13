"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import technologies from "@/data/technologies";
import RTEWrapper from "@/components/RTEWrapper";
import withAuth from "@/components/withAuth";

function Page() {
  const { getProject, project, addProject, updateProject, deleteProject } =
    useAdmin();

  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    liveUrl: "",
    thumbnail: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    getProject();
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isModalOpen]);

  const openAddModal = () => {
    setSelectedProject(null);
    setFormData({
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
      liveUrl: "",
      thumbnail: null,
    });
    setIsModalOpen(true);
  };

  const openEditModal = (proj) => {
   
    setSelectedProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      techStack: proj.techStack,
      githubUrl: proj.githubUrl,
      liveUrl: proj.liveUrl,
      thumbnail: proj.thumbnail,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("githubUrl", formData.githubUrl);
    data.append("liveUrl", formData.liveUrl);
    formData.techStack.forEach((tech) => {
      data.append("techStack", tech);
    });
    if (formData.thumbnail instanceof File) {
      data.append("thumbnail", formData.thumbnail);
    } else if (selectedProject) {
      data.append("thumbnail", selectedProject.thumbnail);
    }
    if (selectedProject) {
      updateProject(selectedProject._id, data);
    } else {
      addProject(data);
    }
    setIsModalOpen(false);
    setSelectedProject(null);
    setFormData({
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
      thumbnail: null,
    });
  };

  const filteredTechs = technologies.filter(
    (tech) =>
      tech.name.toLowerCase().includes(query.toLowerCase()) &&
      !formData.techStack.includes(tech.name)
  );

  const addTech = (techName) => {
    setFormData({ ...formData, techStack: [...formData.techStack, techName] });
    setQuery("");
    setShowSuggestions(false);
  };

  const removeTech = (techName) => {
    setFormData({
      ...formData,
      techStack: formData.techStack.filter((t) => t !== techName),
    });
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {project?.map((proj, index) => (
          <div
            key={index}
            className="glass-card overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300"
          >
            <div className="relative h-48 w-full group">
              {proj.thumbnail && proj.thumbnail !== "" ? (
                <img
                  src={proj.thumbnail}
                  alt={proj.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-white/10 flex items-center justify-center text-white/20">
                  No Thumbnail
                </div>
              )}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                 <button
                  onClick={() => openEditModal(proj)}
                  className="p-3 rounded-full bg-emerald-500 text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => deleteProject(proj._id)}
                  className="p-3 rounded-full bg-red-500 text-white hover:scale-110 transition-transform cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            
            <div className="p-5 flex-grow flex flex-col">
              <h2 className="font-bold text-white text-lg mb-2">{proj.title}</h2>
              <div className="flex flex-wrap gap-2 mb-4">
                {proj.techStack.map((tech, i) => (
                  <span key={i} className="text-[10px] uppercase tracking-wider font-bold bg-white/10 text-emerald-300 px-2 py-0.5 rounded-lg border border-white/5">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex justify-between items-center pt-4 border-t border-white/10">
                <a
                  href={proj.githubUrl}
                  target="_blank"
                  className="text-xs font-bold text-emerald-400 hover:text-white transition-colors"
                >
                  GitHub
                </a>
                {proj.liveUrl && (
                  <a
                    href={proj.liveUrl}
                    target="_blank"
                    className="text-xs font-bold text-white/60 hover:text-white transition-colors"
                  >
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            className="relative glass-card p-8 space-y-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-emerald-100/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white text-center">
              {selectedProject ? "Edit Project" : "Add Project"}
            </h2>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />

              <div className="bg-white/10 rounded-xl overflow-hidden border border-white/20">
                <RTEWrapper
                  value={formData.description}
                  onChange={(html) =>
                    setFormData({ ...formData, description: html })
                  }
                />
              </div>

              <div className="space-y-3">
                <div className="flex flex-wrap gap-2">
                  {formData.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-emerald-500/20 text-emerald-300 px-3 py-1 rounded-lg text-xs font-bold flex items-center gap-2 border border-emerald-500/20"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => removeTech(tech)}
                        className="text-red-400 hover:text-red-300 transition-colors"
                      >
                        ✕
                      </button>
                    </span>
                  ))}
                </div>

                <div className="relative">
                  <input
                    type="text"
                    placeholder="Type to search technology..."
                    value={query}
                    onChange={(e) => {
                      setQuery(e.target.value);
                      setShowSuggestions(true);
                    }}
                    onFocus={() => setShowSuggestions(true)}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />

                  {showSuggestions && query && filteredTechs.length > 0 && (
                    <ul className="absolute left-0 right-0 bg-emerald-900/90 backdrop-blur-md border border-white/10 rounded-xl mt-2 max-h-40 overflow-y-auto shadow-2xl z-50 no-scrollbar">
                      {filteredTechs.map((tech, i) => (
                        <li
                          key={i}
                          onClick={() => addTech(tech.name)}
                          className="px-4 py-3 text-emerald-100 hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          {tech.name}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="url"
                  placeholder="GitHub URL"
                  value={formData.githubUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, githubUrl: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
                <input
                  type="url"
                  placeholder="Live URL"
                  value={formData.liveUrl}
                  onChange={(e) =>
                    setFormData({ ...formData, liveUrl: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Thumbnail Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, thumbnail: e.target.files[0] })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all cursor-pointer"
                />
                {formData.thumbnail && (
                  <div className="relative rounded-xl overflow-hidden border border-white/20 h-40">
                    <img
                      src={
                        formData.thumbnail instanceof File
                          ? URL.createObjectURL(formData.thumbnail)
                          : formData.thumbnail
                      }
                      alt="Thumbnail Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button
                name={selectedProject ? "Update Project" : "Add Project"}
                type="submit"
              />
            </div>
          </form>
        </div>
      )}
    </div>
  );
}

export default withAuth(Page);
