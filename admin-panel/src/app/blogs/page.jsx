"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import RTEWrapper from "@/components/RTEWrapper";
import withAuth from "@/components/withAuth";

function Page() {
  const { getBlog, blog, addBlog, updateBlog, deleteBlog } = useAdmin();

  const [selectedBlog, setSelectedBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    coverImage: null,
  });
  const [preview, setPreview] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    getBlog();
  }, []);

  const openAddModal = () => {
    setSelectedBlog(null);
    setFormData({
      title: "",
      content: "",
      coverImage: null,
    });
    setPreview("");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const openEditModal = (b) => {
    setSelectedBlog(b);
    setFormData({
      title: b.title,
      content: b.content,
      coverImage: b.coverImage,
    });
    setPreview(b.coverImage || "");
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "auto";
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setFormData({ ...formData, coverImage: file });
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.content) return;

    const data = new FormData();
    data.append("title", formData.title);
    data.append("content", formData.content);

    if (formData.coverImage instanceof File) {
      data.append("coverImage", formData.coverImage);
    } else if (selectedBlog) {
      data.append("coverImage", selectedBlog.coverImage);
    }

    if (selectedBlog) {
      updateBlog(selectedBlog._id, data);
    } else {
      addBlog(data);
    }

    closeModal();
    setSelectedBlog(null);
    setFormData({
      title: "",
      content: "",
      coverImage: null,
    });
    setPreview("");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Blogs</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-500/20"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog?.map((b, index) => (
          <div
            key={index}
            className="glass-card overflow-hidden flex flex-col hover:scale-[1.02] transition-all duration-300"
          >
            {b.coverImage && (
              <div className="relative h-40 w-full overflow-hidden">
                <img
                  src={b.coverImage}
                  alt={b.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-60" />
              </div>
            )}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h2 className="font-bold text-white text-lg mb-1 line-clamp-2">{b.title}</h2>
                <p className="text-emerald-100/40 text-xs font-medium">
                  {new Date(b.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div className="flex gap-2 mt-6 pt-4 border-t border-white/5">
                <button
                  onClick={() => openEditModal(b)}
                  className="flex-1 flex items-center justify-center gap-2 p-2 rounded-xl bg-white/5 hover:bg-white/10 text-emerald-400 transition-all cursor-pointer border border-white/5"
                >
                  <SquarePen size={16} />
                  <span className="text-xs font-bold">Edit</span>
                </button>
                <button
                  onClick={() => deleteBlog(b._id)}
                  className="p-2 rounded-xl bg-white/5 hover:bg-red-500/10 text-red-400 transition-all cursor-pointer border border-white/5"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <form
            className="relative glass-card p-8 space-y-6 w-full max-w-3xl max-h-[90vh] overflow-y-auto no-scrollbar animate-in zoom-in-95 duration-300"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute top-4 right-4 p-2 text-emerald-100/50 hover:text-white transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <h2 className="text-2xl font-bold text-white text-center">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </h2>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Blog Title</label>
                <input
                  type="text"
                  placeholder="Enter a catchy title..."
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Content</label>
                <RTEWrapper
                  value={formData.content}
                  onChange={(html) => setFormData({ ...formData, content: html })}
                />
              </div>

              <div className="space-y-3">
                <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Cover Image</label>
                <div className="relative group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-bold file:bg-emerald-500 file:text-white hover:file:bg-emerald-600 transition-all cursor-pointer"
                  />
                </div>
                {preview && (
                  <div className="relative rounded-xl overflow-hidden border border-white/20 h-48">
                    <img
                      src={preview}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/20" />
                  </div>
                )}
              </div>
            </div>

            <div className="pt-4">
              <Button
                name={selectedBlog ? "Update Blog" : "Add Blog"}
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