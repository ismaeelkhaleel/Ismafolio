"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { admin } from "@/context/Context";

function Page() {
  const {
    getEducation,
    education,
    updateEducation,
    deleteEducation,
    addEducation,
  } = admin();

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
        <h1 className="text-2xl font-bold">Education</h1>
        <button
          onClick={openAddModal}
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Education
        </button>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {education?.map((edu, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="font-semibold text-lg truncate">{edu.degree}</h2>
                <p className="text-gray-700">{edu.institute}</p>
                <p className="text-sm text-gray-600">
                  {edu.startYear} - {edu.endYear || "Present"}
                </p>
                <p className="text-sm text-gray-800 mt-2">{edu.description}</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(edu)}
                  className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => deleteEducation(edu._id)}
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
          {/* Close icon fixed at page top-right */}
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="fixed top-5 right-5 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition z-50"
          >
            <X size={24} />
          </button>

          <form
            className="relative w-96 bg-emerald-500 rounded-2xl shadow-xl p-6 space-y-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedEducation ? "Edit Education" : "Add Education"}
            </h2>

            <input
              type="text"
              placeholder="Degree"
              value={formData.degree}
              onChange={(e) =>
                setFormData({ ...formData, degree: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Institute / University"
              value={formData.institute}
              onChange={(e) => {
                setFormData({ ...formData, institute: e.target.value });
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="Start Year"
              value={formData.startYear}
              onChange={(e) =>
                setFormData({ ...formData, startYear: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <input
              type="text"
              placeholder="End Year (optional)"
              value={formData.endYear}
              onChange={(e) =>
                setFormData({ ...formData, endYear: e.target.value })
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

export default Page;
