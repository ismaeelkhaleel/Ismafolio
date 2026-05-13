"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import withAuth from "@/components/withAuth";
function Page() {
  const {
    getExperience,
    experience,
    updateExperience,
    deleteExperience,
    addExperience,
  } = useAdmin();

  const [selectedExperience, setSelectedExperience] = useState(null);
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    startDate: "",
    endDate: "",
    location: "",
    description: "",
  });

  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getExperience();
  }, []);

  const openAddModal = () => {
    setSelectedExperience(null);
    setFormData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
    setIsModalOpen(true);
  };

  const openEditModal = (exp) => {
    setSelectedExperience(exp);
    setFormData({
      companyName: exp.companyName,
      jobTitle: exp.jobTitle,
      startDate: exp.startDate?.slice(0, 10) || "",
      endDate: exp.endDate?.slice(0, 10) || "",
      location: exp.location,
      description: exp.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.companyName || !formData.jobTitle || !formData.startDate)
      return;

    if (selectedExperience) {
      updateExperience(selectedExperience._id, formData);
    } else {
      addExperience(formData);
    }

    setIsModalOpen(false);
    setSelectedExperience(null);
    setFormData({
      companyName: "",
      jobTitle: "",
      startDate: "",
      endDate: "",
      location: "",
      description: "",
    });
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Experience</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {experience?.map((exp, index) => (
          <div
            key={index}
            className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="min-w-0">
                <h2 className="font-bold text-white text-lg truncate">
                  {exp.jobTitle}
                </h2>
                <h3 className="font-semibold text-emerald-400 text-md truncate mb-1">
                  {exp.companyName}
                </h3>
                <div className="flex items-center gap-2 text-emerald-100/40 text-xs mb-3">
                  <span className="bg-white/5 px-2 py-0.5 rounded-lg border border-white/5">{exp.location}</span>
                  <span>•</span>
                  <span>
                    {new Date(exp.startDate).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })} -{" "}
                    {exp.endDate
                      ? new Date(exp.endDate).toLocaleDateString("en-US", { month: 'short', year: 'numeric' })
                      : "Present"}
                  </span>
                </div>
                <p className="text-sm text-emerald-100/70 leading-relaxed line-clamp-3">{exp.description}</p>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 rounded-xl hover:bg-white/10 text-emerald-400 transition-all cursor-pointer"
                >
                  <SquarePen size={18} />
                </button>
                <button
                  onClick={() => deleteExperience(exp._id)}
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
            className="relative w-full max-w-lg glass-card p-8 space-y-6 animate-in zoom-in-95 duration-300"
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
              {selectedExperience ? "Edit Experience" : "Add Experience"}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Company</label>
                <input
                  type="text"
                  placeholder="e.g. Google"
                  value={formData.companyName}
                  onChange={(e) =>
                    setFormData({ ...formData, companyName: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Job Title</label>
                <input
                  type="text"
                  placeholder="e.g. SDE-1"
                  value={formData.jobTitle}
                  onChange={(e) =>
                    setFormData({ ...formData, jobTitle: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all [color-scheme:dark]"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Location</label>
              <input
                type="text"
                placeholder="e.g. Remote / New York"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Description</label>
              <textarea
                placeholder="Briefly describe your roles and achievements..."
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all min-h-[100px]"
                rows="3"
              />
            </div>

            <div className="pt-2">
              <Button
                name={
                  selectedExperience ? "Update Experience" : "Add Experience"
                }
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
