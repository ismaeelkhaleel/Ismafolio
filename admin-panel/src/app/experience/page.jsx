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
        <h1 className="text-2xl font-bold">Experience</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Experience
        </button>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {experience?.map((exp, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-bold text-lg truncate">
                  {exp.jobTitle}
                </h2>
                <h3 className="font-semibold text-lg truncate">
                  {exp.companyName}
                </h3>
                <p className="text-gray-700">{exp.location}</p>
                <p className="text-sm text-gray-600">
                  {new Date(exp.startDate).toLocaleDateString()} -{" "}
                  {exp.endDate
                    ? new Date(exp.endDate).toLocaleDateString()
                    : "Present"}
                </p>
                <p className="text-sm text-gray-800 mt-2">{exp.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(exp)}
                  className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => deleteExperience(exp._id)}
                  className="p-2 rounded-full hover:bg-red-100 text-red-500 transition cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Close icon */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="cursor-pointer fixed top-5 right-5 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition z-50"
          >
            <X size={24} />
          </button>

          <form
            className="relative w-96 bg-emerald-500 rounded-2xl shadow-xl p-6 space-y-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedExperience ? "Edit Experience" : "Add Experience"}
            </h2>

            <input
              type="text"
              placeholder="Company Name"
              value={formData.companyName}
              onChange={(e) =>
                setFormData({ ...formData, companyName: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Job Title"
              value={formData.jobTitle}
              onChange={(e) =>
                setFormData({ ...formData, jobTitle: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            {/* Date Fields */}
            <input
              type="date"
              placeholder="Start Date"
              value={formData.startDate}
              onChange={(e) =>
                setFormData({ ...formData, startDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="date"
              placeholder="End Date (optional)"
              value={formData.endDate}
              onChange={(e) =>
                setFormData({ ...formData, endDate: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Location"
              value={formData.location}
              onChange={(e) =>
                setFormData({ ...formData, location: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <textarea
              placeholder="Description"
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              rows="3"
            />

            <div className="pt-2 text-center">
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
