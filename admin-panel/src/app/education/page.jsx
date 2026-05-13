"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import withAuth from "@/components/withAuth";
function Page() {
  const {
    getEducation,
    education,
    updateEducation,
    deleteEducation,
    addEducation,
  } = useAdmin();

  const [selectedEducation, setSelectedEducation] = useState(null);
  const [formData, setFormData] = useState({
    degree: "",
    institute: "",
    startYear: "",
    endYear: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getEducation();
  }, []);

  const openAddModal = () => {
    setSelectedEducation(null);
    setFormData({
      degree: "",
      institute: "",
      startYear: "",
      endYear: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (edu) => {
    setSelectedEducation(edu);
    setFormData({
      degree: edu.degree,
      institute: edu.institute,
      startYear: edu.startYear,
      endYear: edu.endYear,
      description: edu.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.institute || !formData.startYear) return;

    if (selectedEducation) {
      updateEducation(selectedEducation._id, formData);
    } else {
      addEducation(formData);
    }

    setIsModalOpen(false);
    setSelectedEducation(null);
    setFormData({
      degree: "",
      institute: "",
      startYear: "",
      endYear: "",
      description: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Education</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {education?.map((edu, index) => (
          <div
            key={index}
            className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <h2 className="font-bold text-white text-lg truncate">{edu.degree}</h2>
                <p className="text-emerald-400 font-semibold truncate mb-1">{edu.institute}</p>
                <div className="flex items-center gap-2 text-emerald-100/40 text-xs mb-3">
                  <span className="bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">
                    {edu.startYear} - {edu.endYear || "Present"}
                  </span>
                </div>
                <p className="text-sm text-emerald-100/70 leading-relaxed line-clamp-3">{edu.description}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(edu)}
                  className="p-2 rounded-xl hover:bg-white/10 text-emerald-400 transition-all cursor-pointer"
                >
                  <SquarePen size={18} />
                </button>
                <button
                  onClick={() => deleteEducation(edu._id)}
                  className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            className="relative w-full max-w-md glass-card p-8 space-y-6 animate-in zoom-in-95 duration-300"
            onSubmit={handleSubmit}
          >
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-2 text-emerald-100/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white text-center">
              {selectedEducation ? "Edit Education" : "Add Education"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Degree</label>
                <input
                  type="text"
                  placeholder="e.g. Master of Computer Applications"
                  value={formData.degree}
                  onChange={(e) =>
                    setFormData({ ...formData, degree: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Institute</label>
                <input
                  type="text"
                  placeholder="e.g. AMU, Aligarh"
                  value={formData.institute}
                  onChange={(e) => {
                    setFormData({ ...formData, institute: e.target.value });
                  }}
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Start Year</label>
                  <input
                    type="text"
                    placeholder="2020"
                    value={formData.startYear}
                    onChange={(e) =>
                      setFormData({ ...formData, startYear: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">End Year</label>
                  <input
                    type="text"
                    placeholder="2022"
                    value={formData.endYear}
                    onChange={(e) =>
                      setFormData({ ...formData, endYear: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Description</label>
                <textarea
                  placeholder="Describe your studies, achievements, etc."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all min-h-[100px]"
                  rows="3"
                />
              </div>
            </div>

            <div className="pt-2">
              <Button
                name={selectedEducation ? "Update Education" : "Add Education"}
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
