"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { admin } from "@/context/Context";
import technologies from "@/data/technologies";

function Page() {
  const { getProject, project, addProject, updateProject, deleteProject } =
    admin();

  const [selectedProject, setSelectedProject] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: [],
    githubUrl: "",
    thumbnail: null,
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    getProject();
  }, []);

  const openAddModal = () => {
    setSelectedProject(null);
    setFormData({
      title: "",
      description: "",
      techStack: [],
      githubUrl: "",
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Projects</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Project
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project?.map((proj, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl p-5 flex flex-col hover:shadow-lg transition"
          >
            {proj.thumbnail && proj.thumbnail !== "" && (
              <img
                src={proj.thumbnail}
                alt={proj.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
            )}

            <h2 className="font-semibold text-lg">{proj.title}</h2>
            <p className="text-gray-600">{proj.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              {proj.techStack.join(", ")}
            </p>
            <a
              href={proj.githubUrl}
              target="_blank"
              className="text-black-600 mt-2 font-bold hover:text-white w-auto"
            >
              GitHub
            </a>

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => openEditModal(proj)}
                className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
              >
                <SquarePen size={20} />
              </button>
              <button
                onClick={() => deleteProject(proj._id)}
                className="p-2 rounded-full hover:bg-red-100 text-red-500 transition cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="fixed top-5 right-5 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition z-50"
          >
            <X size={24} />
          </button>

          <form
            className="relative w-96 bg-white rounded-2xl shadow-xl p-6 space-y-5"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedProject ? "Edit Project" : "Add Project"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
              rows="3"
            />

            {/* ✅ Tech Stack with Autocomplete + Tags */}
            <div className="relative w-full">
              {/* Selected Tags */}
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.techStack.map((tech, i) => (
                  <span
                    key={i}
                    className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full flex items-center gap-2"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => removeTech(tech)}
                      className="text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </span>
                ))}
              </div>

              {/* Input */}
              <input
                type="text"
                placeholder="Type to search technology..."
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                className="w-full border border-gray-300 rounded-lg px-3 py-2"
              />

              {/* Suggestions */}
              {showSuggestions && query && filteredTechs.length > 0 && (
                <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-lg mt-1 max-h-40 overflow-y-auto shadow-lg z-10">
                  {filteredTechs.map((tech, i) => (
                    <li
                      key={i}
                      onClick={() => addTech(tech.name)}
                      className="px-3 py-2 hover:bg-emerald-100 cursor-pointer"
                    >
                      {tech.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <input
              type="url"
              placeholder="GitHub URL"
              value={formData.githubUrl}
              onChange={(e) =>
                setFormData({ ...formData, githubUrl: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2"
            />

            <div className="space-y-2">
              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setFormData({ ...formData, thumbnail: e.target.files[0] })
                }
                className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
              {formData.thumbnail && formData.thumbnail !== "" && (
                <img
                  src={
                    formData.thumbnail instanceof File
                      ? URL.createObjectURL(formData.thumbnail)
                      : formData.thumbnail
                  }
                  alt="Thumbnail Preview"
                  className="mt-3 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="pt-2 text-center">
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

export default Page;
