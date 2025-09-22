"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import technologies from "@/data/technologies";
import "./style.css";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Transition,
} from "@headlessui/react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import withAuth from "@/components/withAuth";

const rating = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  value: i + 1,
}));

const levels = [
  { id: 1, name: "Beginner", level: "Beginner" },
  { id: 2, name: "Intermediate", level: "Intermediate" },
  { id: 3, name: "Advanced", level: "Advanced" },
];

function Page() {
  const { getSkill, skills, addSkill, updateSkill, deleteSkill } = useAdmin();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getSkill();
  }, []);

  const filteredTech =
    query === ""
      ? technologies
      : technologies.filter((tech) =>
          tech.name.toLowerCase().includes(query.toLowerCase())
        );

  const openAddModal = () => {
    setSelectedSkill(null);
    setSelectedTech(null);
    setSelectedRating(null);
    setSelectedLevel(null);
    setIsModalOpen(true);
  };

  const openEditModal = (skill) => {
    setSelectedSkill(skill);
    setSelectedTech({
      name: skill.name,
      icon: skill.icon,
    });
    setSelectedRating({ value: skill.rating });
    setSelectedLevel({ name: skill.level });
    setIsModalOpen(true);
  };

  const handleSubmit = () => {
    if (!selectedTech || !selectedRating || !selectedLevel) return;

    if (selectedSkill) {
      updateSkill(
        selectedSkill._id,
        selectedTech.name,
        selectedLevel.name,
        selectedRating.value,
        selectedTech.icon
      );
    } else {
      // Add new skill
      addSkill(
        selectedTech.name,
        selectedLevel.name,
        selectedRating.value,
        selectedTech.icon
      );
    }

    setIsModalOpen(false);
    setSelectedSkill(null);
    setSelectedTech(null);
    setSelectedRating(null);
    setSelectedLevel(null);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Skills</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Skill
        </button>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-4 min-w-0">
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-16 h-16 object-contain rounded-full border flex-shrink-0"
                />
                <h2 className="font-semibold text-lg truncate">{skill.name}</h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => openEditModal(skill)}
                  className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => deleteSkill(skill._id)}
                  className="p-2 rounded-full hover:bg-red-100 text-red-500 transition cursor-pointer"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span className="font-medium">{skill.level}</span>
              <span>
                <strong>Rating: </strong>
                {skill.rating}
              </span>
            </div>
          </div>
        ))}
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
          {/* Close icon fixed at page top-right */}
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
              {selectedSkill ? "Edit Skill" : "Add Skill"}
            </h2>

            {/* Technology */}
            <div className="w-full">
              <Combobox value={selectedTech} onChange={setSelectedTech}>
                <ComboboxInput
                  aria-label="Select Technology"
                  displayValue={(tech) => tech?.name || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="Select Technology or skill"
                />
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <ComboboxOptions className="no-scrollbar absolute mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {filteredTech.map((tech) => (
                      <ComboboxOption
                        key={tech.name}
                        value={tech}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-100 transition"
                      >
                        <img
                          src={tech.icon}
                          alt={tech.name}
                          className="w-5 h-5"
                        />
                        <span className="truncate">{tech.name}</span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </Combobox>
            </div>

            {/* Rating */}
            <div className="w-full">
              <Combobox value={selectedRating} onChange={setSelectedRating}>
                <ComboboxButton className="w-full text-left border border-gray-300 rounded-lg px-3 py-2 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
                  {selectedRating ? selectedRating.value : "Rate Yourself"}
                </ComboboxButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <ComboboxOptions className="no-scrollbar absolute mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {rating.map((r) => (
                      <ComboboxOption
                        key={r.id}
                        value={r}
                        className="px-3 py-2 cursor-pointer hover:bg-emerald-100 transition"
                      >
                        {r.value}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </Combobox>
            </div>

            {/* Level */}
            <div className="w-full">
              <Combobox value={selectedLevel} onChange={setSelectedLevel}>
                <ComboboxButton className="w-full text-left border border-gray-300 rounded-lg px-3 py-2 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition">
                  {selectedLevel ? selectedLevel.name : "What is your level?"}
                </ComboboxButton>
                <Transition
                  as={React.Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <ComboboxOptions className="no-scrollbar absolute mt-1 w-full max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {levels.map((l) => (
                      <ComboboxOption
                        key={l.id}
                        value={l}
                        className="px-3 py-2 cursor-pointer hover:bg-emerald-100 transition"
                      >
                        {l.name}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </Combobox>
            </div>

            {/* Submit button */}
            <div className="pt-2 text-center">
              <Button
                name={selectedSkill ? "Update Skill" : "Add Skill"}
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
