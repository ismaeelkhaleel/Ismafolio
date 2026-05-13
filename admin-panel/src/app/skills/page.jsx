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

const SKILL_CATEGORIES = [
  "Backend",
  "Frontend",
  "Mobile",
  "Tools",
  "Cloud",
  "Database",
  "Programming",
  "DevOps",
  "Other",
].map((cat, index) => ({ id: index + 1, name: cat }));

function Page() {
  const { getSkill, skills, addSkill, updateSkill, deleteSkill } = useAdmin();
  const [selectedSkill, setSelectedSkill] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
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
    setSelectedCategory(null);
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
    setSelectedCategory(SKILL_CATEGORIES.find(cat => cat.name === skill.category) || { name: skill.category });
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedTech || !selectedRating || !selectedLevel || !selectedCategory) return;

    if (selectedSkill) {
      updateSkill(
        selectedSkill._id,
        selectedTech.name,
        selectedLevel.name,
        selectedRating.value,
        selectedTech.icon,
        selectedCategory.name
      );
    } else {
      // Add new skill
      addSkill(
        selectedTech.name,
        selectedLevel.name,
        selectedRating.value,
        selectedTech.icon,
        selectedCategory.name
      );
    }

    setIsModalOpen(false);
    setSelectedSkill(null);
    setSelectedTech(null);
    setSelectedRating(null);
    setSelectedLevel(null);
    setSelectedCategory(null);
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.map((skill, index) => (
          <div
            key={index}
            className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4 min-w-0">
                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center p-2 border border-white/10 shadow-inner">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0">
                  <h2 className="font-bold text-white truncate">{skill.name}</h2>
                  <span className="text-[10px] uppercase tracking-wider font-bold bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-lg w-fit mt-1 border border-emerald-500/20">
                    {skill.category}
                  </span>
                </div>
              </div>
              <div className="flex gap-1">
                <button
                  onClick={() => openEditModal(skill)}
                  className="p-2 rounded-xl hover:bg-white/10 text-emerald-400 transition-all cursor-pointer"
                >
                  <SquarePen size={18} />
                </button>
                <button
                  onClick={() => deleteSkill(skill._id)}
                  className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
            <div className="flex justify-between items-end mt-4">
              <div className="flex flex-col">
                <span className="text-xs text-emerald-100/40 font-medium">Level</span>
                <span className="text-sm text-emerald-100 font-semibold">{skill.level}</span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-emerald-100/40 font-medium">Rating</span>
                <div className="flex items-center gap-1">
                  <span className="text-lg font-bold text-white">{skill.rating}</span>
                  <span className="text-xs text-emerald-100/40">/10</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
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
              {selectedSkill ? "Edit Skill" : "Add Skill"}
            </h2>

            {/* Technology */}
            <div className="w-full">
              <Combobox value={selectedTech} onChange={setSelectedTech}>
                <ComboboxInput
                  aria-label="Select Technology"
                  displayValue={(tech) => tech?.name || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition text-black"
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
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-100 transition text-black"
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

            {/* Category */}
            <div className="w-full">
              <Combobox value={selectedCategory} onChange={setSelectedCategory}>
                <ComboboxButton className="w-full text-left border border-gray-300 bg-white rounded-lg px-3 py-2 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-black">
                  {selectedCategory ? selectedCategory.name : "Select Category"}
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
                    {SKILL_CATEGORIES.map((cat) => (
                      <ComboboxOption
                        key={cat.id}
                        value={cat}
                        className="px-3 py-2 cursor-pointer hover:bg-emerald-100 transition text-black"
                      >
                        {cat.name}
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </Combobox>
            </div>

            {/* Rating */}
            <div className="w-full">
              <Combobox value={selectedRating} onChange={setSelectedRating}>
                <ComboboxButton className="w-full text-left border border-gray-300 bg-white rounded-lg px-3 py-2 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-black">
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
                        className="px-3 py-2 cursor-pointer hover:bg-emerald-100 transition text-black"
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
                <ComboboxButton className="w-full text-left border border-gray-300 bg-white rounded-lg px-3 py-2 hover:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition text-black">
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
                        className="px-3 py-2 cursor-pointer hover:bg-emerald-100 transition text-black"
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
