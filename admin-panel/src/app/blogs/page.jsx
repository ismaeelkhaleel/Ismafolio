"use client";
import React, { useEffect, useState } from "react";
import { Trash2, SquarePen, Plus, X } from "lucide-react";
import Button from "@/components/buttons/Button";
import { admin } from "@/context/Context";

function Page() {
  const { getBlog, blog, addBlog, updateBlog, deleteBlog } = admin();

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

    setIsModalOpen(false);
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
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blogs</h1>
        <button
          onClick={openAddModal}
          className="cursor-pointer flex items-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-lg hover:bg-emerald-700 transition"
        >
          <Plus size={18} />
          Add Blog
        </button>
      </div>

      {/* Cards */}
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog?.map((b, index) => (
          <div
            key={index}
            className="bg-emerald-500 shadow-md rounded-2xl overflow-hidden hover:shadow-lg transition flex flex-col"
          >
            {b.coverImage && (
              <img
                src={b.coverImage}
                alt={b.title}
                className="h-40 w-full object-cover"
              />
            )}
            <div className="p-5 flex flex-col justify-between flex-1">
              <div>
                <h2 className="font-bold text-lg mb-1">{b.title}</h2>
                <p className="text-gray-600 text-sm mb-2">
                  {new Date(b.createdAt).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
                <p className="text-gray-700 text-sm line-clamp-3">
                  {b.content}
                </p>
              </div>
              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => openEditModal(b)}
                  className="p-2 rounded-full hover:bg-emerald-100 text-emerald-700 transition cursor-pointer"
                >
                  <SquarePen size={20} />
                </button>
                <button
                  onClick={() => deleteBlog(b._id)}
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
            encType="multipart/form-data"
          >
            <h2 className="text-xl font-semibold text-gray-800 text-center">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </h2>

            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
            />

            <textarea
              placeholder="Content"
              value={formData.content}
              onChange={(e) =>
                setFormData({ ...formData, content: e.target.value })
              }
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition"
              rows="5"
            />

            {/* File Upload */}
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 file:mr-3 file:py-2 file:px-3 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 cursor-pointer"
              />
              {preview && (
                <img
                  src={preview}
                  alt="Preview"
                  className="mt-3 w-full h-40 object-cover rounded-lg"
                />
              )}
            </div>

            <div className="pt-2 text-center">
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

export default Page;
