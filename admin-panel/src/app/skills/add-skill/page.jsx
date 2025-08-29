"use client";
import React, { useState } from "react";
import technologies from "@/data/technologies";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  ComboboxButton,
  Transition,
} from "@headlessui/react";
import "./style.css";
import Button from "@/components/buttons/Button";
import { admin } from "@/context/UserContext";

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
  const [selectedTech, setSelectedTech] = useState(null);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedLevel, setSelectedLevel] = useState(null);
  const [query, setQuery] = useState("");
  const { addSkill } = admin();

  const filteredTech =
    query === ""
      ? technologies
      : technologies.filter((tech) =>
          tech.name.toLowerCase().includes(query.toLowerCase())
        );

  const addSkillHandler = (e) => {
    e.preventDefault();
    console.log(selectedTech?.name, "==", selectedTech?.icon);
    console.log(selectedRating?.value);
    console.log(selectedLevel?.name);
    addSkill(
      selectedTech.name,
      selectedLevel.name,
      selectedRating.value,
      selectedTech.icon
    );
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <form
        className="space-y-4 p-6 rounded shadow-md w-80 inset-ring-2 inset-ring-green-700"
        onSubmit={addSkillHandler}
      >
        {/* Technology (with search) */}
        <div className="relative w-full">
          <Combobox value={selectedTech} onChange={setSelectedTech}>
            <ComboboxInput
              aria-label="Select Technology"
              displayValue={(tech) => tech?.name || ""}
              onChange={(event) => setQuery(event.target.value)}
              className="border px-2 py-1 rounded w-full"
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
              <ComboboxOptions className="absolute top-full left-0 mt-1 border bg-green-200 shadow-md rounded max-h-60 w-full overflow-y-auto no-scrollbar z-50">
                {filteredTech.map((tech) => (
                  <ComboboxOption
                    key={tech.name}
                    value={tech}
                    className="flex items-center gap-2 cursor-pointer px-2 py-2 hover:bg-emerald-200"
                  >
                    <img src={tech.icon} alt={tech.name} className="w-5 h-5" />
                    <span>{tech.name}</span>
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>

        {/* Rating */}
        <div className="relative w-full">
          <Combobox value={selectedRating} onChange={setSelectedRating}>
            <ComboboxButton className="border px-2 py-1 rounded w-full text-left">
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
              <ComboboxOptions
                static
                portal={false}
                className="absolute top-full left-0 mt-1 border bg-green-200 shadow-md rounded max-h-60 w-full overflow-y-auto no-scrollbar z-50"
              >
                {rating.map((r) => (
                  <ComboboxOption
                    key={r.id}
                    value={r}
                    className="cursor-pointer px-2 py-2 hover:bg-emerald-200"
                  >
                    {r.value}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>

        {/* Level */}
        <div className="relative w-full">
          <Combobox value={selectedLevel} onChange={setSelectedLevel}>
            <ComboboxButton className="border px-2 py-1 rounded w-full text-left">
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
              <ComboboxOptions className="absolute top-full left-0 mt-1 border bg-green-200 shadow-md rounded max-h-60 w-full overflow-y-auto no-scrollbar z-50">
                {levels.map((l) => (
                  <ComboboxOption
                    key={l.id}
                    value={l}
                    className="cursor-pointer px-2 py-2 hover:bg-emerald-200"
                  >
                    {l.name}
                  </ComboboxOption>
                ))}
              </ComboboxOptions>
            </Transition>
          </Combobox>
        </div>

        <div className="pt-2 text-center">
          <Button name="Add Skill" type="submit"></Button>
        </div>
      </form>
    </div>
  );
}

export default Page;
