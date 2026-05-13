"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import social from "@/data/social";
import "./style.css";
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
        <h1 className="text-2xl font-bold text-white">All Social Links</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Social
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {socials?.map((soc, index) => (
          <div
            key={index}
            className="glass-card p-6 flex flex-col justify-between hover:scale-[1.02] transition-all duration-300"
          >
            {/* Row 1: Icon + Platform Name */}
            <div className="flex items-center gap-4 mb-6">
              <a
                href={soc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center p-3 border border-white/10 shadow-inner group"
              >
                <img
                  src={soc.icon}
                  alt={soc.platform}
                  className="w-full h-full object-contain transition-transform group-hover:scale-110"
                />
              </a>
              <div className="flex flex-col min-w-0">
                <h2 className="font-bold text-white text-lg truncate">
                  {soc.platform}
                </h2>
                <a
                  href={soc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-emerald-100/40 hover:text-emerald-400 truncate transition-colors"
                >
                  {soc.url.replace(/^https?:\/\//, "")}
                </a>
              </div>
            </div>

            {/* Row 2: Edit (left) + Delete (right) */}
            <div className="flex justify-between items-center pt-4 border-t border-white/5">
              <button
                onClick={() => openEditModal(soc)}
                className="p-2 rounded-xl hover:bg-white/10 text-emerald-400 transition-all cursor-pointer"
              >
                <SquarePen size={18} />
              </button>
              <button
                onClick={() => deleteSocial(soc._id)}
                className="p-2 rounded-xl hover:bg-red-500/10 text-red-400 transition-all cursor-pointer"
              >
                <Trash2 size={18} />
              </button>
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
              {selectedSocial ? "Edit Social" : "Add Social"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Platform</label>
                <Combobox value={selectedPlatform} onChange={setSelectedPlatform}>
                  <div className="relative">
                    <ComboboxInput
                      aria-label="Select Platform"
                      displayValue={(s) => s?.platform || ""}
                      onChange={(e) => setQuery(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                      placeholder="Select Platform"
                    />
                    <ComboboxButton className="absolute inset-y-0 right-0 flex items-center pr-4">
                       <Plus size={16} className="text-emerald-100/30" />
                    </ComboboxButton>
                  </div>
                  <Transition
                    as={React.Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <ComboboxOptions className="no-scrollbar absolute mt-2 w-full max-h-60 overflow-y-auto bg-emerald-900/90 backdrop-blur-md border border-white/10 rounded-xl shadow-2xl z-50">
                      {filteredPlatforms.map((s) => (
                        <ComboboxOption
                          key={s.platform}
                          value={s}
                          className="flex items-center gap-3 px-4 py-3 text-emerald-100 hover:bg-white/10 cursor-pointer transition-colors"
                        >
                          <img
                            src={s.icon}
                            alt={s.platform}
                            className="w-5 h-5"
                          />
                          <span className="text-sm font-medium">{s.platform}</span>
                        </ComboboxOption>
                      ))}
                    </ComboboxOptions>
                  </Transition>
                </Combobox>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Profile Link</label>
                <input
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>
            </div>

            <div className="pt-2">
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
