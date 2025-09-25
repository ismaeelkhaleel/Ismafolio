"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import social from "@/data/social";
import {
  Combobox,
  ComboboxInput,
  ComboboxOption,
  ComboboxOptions,
  Transition,
  ComboboxButton,
} from "@headlessui/react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import withAuth from "@/components/withAuth";

function Page() {
  const { getSocial, socials, addSocial, updateSocial, deleteSocial } =
    useAdmin();
  const [selectedSocial, setSelectedSocial] = useState(null);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [url, setUrl] = useState("");
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getSocial();
  }, []);

  const filteredPlatforms =
    query === ""
      ? social
      : social.filter((s) =>
          s.platform.toLowerCase().includes(query.toLowerCase())
        );

  const openAddModal = () => {
    setSelectedSocial(null);
    setSelectedPlatform(null);
    setUrl("");
    setIsModalOpen(true);
  };

  const openEditModal = (soc) => {
    setSelectedSocial(soc);
    setSelectedPlatform({
      platform: soc.name,
      icon: soc.icon,
    });
    setUrl(soc.url);
    setIsModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!selectedPlatform || !url) return;

    if (selectedSocial) {
      updateSocial(
        selectedSocial._id,
        selectedPlatform.platform,
        url,
        selectedPlatform.icon
      );
    } else {
      addSocial(selectedPlatform.platform, url, selectedPlatform.icon);
    }

    setIsModalOpen(false);
    setSelectedSocial(null);
    setSelectedPlatform(null);
    setUrl("");
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">All Social Links</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Social
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials?.map((soc, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            {/* Row 1: Icon + Platform Name */}
            <div className="flex items-center gap-4 mb-4">
              <a
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0"
              >
                <img
                  src={soc.icon}
                  alt={soc.platform}
                  className="w-14 h-14 object-contain rounded-full border hover:scale-110 transition"
                />
              </a>
              <div className="flex flex-col overflow-hidden">
                
                <a
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:underline break-all text-black-500 mb-1"
                >
                 <h2 className="font-semibold text-lg truncate">
                  {soc.platform}
                </h2>
                </a>
              </div>
            </div>

            {/* Row 2: Edit (left) + Delete (right) */}
            <div className="flex justify-between items-center">
              <button
                onClick={() => openEditModal(soc)}
                className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
              >
                <SquarePen size={20} />
              </button>
              <button
                onClick={() => deleteSocial(soc._id)}
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
            className="cursor-pointer fixed top-5 right-5 p-2 bg-white rounded-full shadow-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition z-50"
          >
            <X size={24} />
          </button>

          <form
            className="relative w-96 bg-emerald-500 rounded-2xl shadow-xl p-6 space-y-5"
            onSubmit={handleSubmit}
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedSocial ? "Edit Social" : "Add Social"}
            </h2>

            {/* Platform */}
            <div className="w-full">
              <Combobox value={selectedPlatform} onChange={setSelectedPlatform}>
                <ComboboxInput
                  aria-label="Select Platform"
                  displayValue={(s) => s?.platform || ""}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
                  placeholder="Select Platform"
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
                  <ComboboxOptions className="no-scrollbar absolute mt-1 w-9/10 max-h-60 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                    {filteredPlatforms.map((s) => (
                      <ComboboxOption
                        key={s.platform}
                        value={s}
                        className="flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-emerald-100 transition"
                      >
                        <img
                          src={s.icon}
                          alt={s.platform}
                          className="w-5 h-5"
                        />
                        <span className="truncate">{s.platform}</span>
                      </ComboboxOption>
                    ))}
                  </ComboboxOptions>
                </Transition>
              </Combobox>
            </div>

            {/* URL Input */}
            <div>
              <input
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Enter profile link"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              />
            </div>

            {/* Submit */}
            <div className="pt-2 text-center">
              <Button
                name={selectedSocial ? "Update Social" : "Add Social"}
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
