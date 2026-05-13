"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Menu, X } from "lucide-react";

export default function ClientLayout({ children }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen relative">
      <button
        className="md:hidden fixed top-4 left-4 z-50 bg-white/70 p-2 rounded-lg shadow-lg backdrop-blur-md"
        onClick={() => setOpen(true)}
      >
        <Menu size={24} />
      </button>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      <aside
        className={`
          fixed top-0 left-0 h-full 
          w-3/4 sm:w-1/2 md:w-1/4 
          glass-sidebar
          transform transition-transform duration-300 ease-in-out
          z-50
          ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="md:hidden flex justify-end p-4">
          <button onClick={() => setOpen(false)} className="text-white">
            <X size={28} />
          </button>
        </div>

        <Navbar />
      </aside>
      <main className="w-full md:w-3/4 flex justify-center items-start pt-12 pb-12 px-6 ml-0 md:ml-[25%] min-h-screen">
        <div className="max-w-5xl w-full">{children}</div>
      </main>
    </div>
  );
}
