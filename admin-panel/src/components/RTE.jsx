"use client";

import { useState, useCallback } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Heading } from "@tiptap/extension-heading";
import { Link } from "@tiptap/extension-link";
import { Image } from "@tiptap/extension-image";
import { Placeholder } from "@tiptap/extension-placeholder";
import { Underline } from "@tiptap/extension-underline";
import { TextStyle } from "@tiptap/extension-text-style";
import { TextAlign } from "@tiptap/extension-text-align";
import { BulletList, OrderedList, ListItem } from "@tiptap/extension-list";

import {
  Bold,
  Italic,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  Link2,
  Undo,
  Redo,
} from "lucide-react";

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`p-2 rounded-lg transition-all ${
        active
          ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-gray-200" />;
}

export default function RTE({ value = "<p>Start writing...</p>", onChange }) {
  const [showLinkPopup, setShowLinkPopup] = useState(false);
  const [linkData, setLinkData] = useState({ href: "", text: "" });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Heading.configure({ levels: [1, 2, 3] }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Start typing..." }),
      Underline,
      TextStyle,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      BulletList,
      OrderedList,
      ListItem,
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange?.(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const setBlockType = (type) => {
    if (type === "paragraph")
      return editor.chain().focus().setParagraph().run();
    const match = type.match(/^heading-(\d)$/);
    if (match) {
      const lvl = Number(match[1]);
      editor.chain().focus().toggleHeading({ level: lvl }).run();
    }
  };

  const textAlignActive = (align) => {
    return (
      editor.getAttributes("paragraph").textAlign === align ||
      (!editor.getAttributes("paragraph").textAlign && align === "left")
    );
  };

  const handleInsertLink = () => {
    if (!linkData.href) return;
    const selection = editor.state.selection;
    if (selection.empty && linkData.text) {
      editor
        .chain()
        .focus()
        .insertContent(`<a href="${linkData.href}">${linkData.text}</a>`)
        .run();
    } else {
      editor
        .chain()
        .focus()
        .extendMarkRange("link")
        .setLink({ href: linkData.href })
        .run();
    }
    setShowLinkPopup(false);
    setLinkData({ href: "", text: "" });
  };

  return (
    <div>
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          {/* Toolbar */}
          <div className="bg-gray-50 border-b border-gray-200 px-4 py-3">
            <div className="flex flex-wrap gap-1 items-center">
              {/* Block Type Selector */}
              <select
                value={
                  editor.isActive("heading", { level: 1 })
                    ? "heading-1"
                    : editor.isActive("heading", { level: 2 })
                    ? "heading-2"
                    : editor.isActive("heading", { level: 3 })
                    ? "heading-3"
                    : "paragraph"
                }
                onChange={(e) => setBlockType(e.target.value)}
                className="px-3 py-1.5 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="paragraph">Normal</option>
                <option value="heading-1">Heading 1</option>
                <option value="heading-2">Heading 2</option>
                <option value="heading-3">Heading 3</option>
              </select>

              <Divider />

              {/* Text Formatting */}
              <div className="flex gap-0.5">
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleBold().run()}
                  active={editor.isActive("bold")}
                  title="Bold (Ctrl+B)"
                >
                  <Bold size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  active={editor.isActive("italic")}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleUnderline().run()}
                  active={editor.isActive("underline")}
                  title="Underline (Ctrl+U)"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M6 4v6a6 6 0 0 0 12 0V4" />
                    <line x1="4" x2="20" y1="20" y2="20" />
                  </svg>
                </ToolbarButton>
              </div>

              <Divider />

              {/* Lists */}
              <div className="flex gap-0.5">
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBulletList().run()
                  }
                  active={editor.isActive("bulletList")}
                  title="Bullet List"
                >
                  <List size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  active={editor.isActive("orderedList")}
                  title="Numbered List"
                >
                  <ListOrdered size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  active={editor.isActive("blockquote")}
                  title="Quote"
                >
                  <Quote size={18} />
                </ToolbarButton>
              </div>

              <Divider />

              {/* Alignment */}
              <div className="flex gap-0.5">
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("left").run()
                  }
                  active={textAlignActive("left")}
                  title="Align Left"
                >
                  <AlignLeft size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  active={textAlignActive("center")}
                  title="Align Center"
                >
                  <AlignCenter size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  active={textAlignActive("right")}
                  title="Align Right"
                >
                  <AlignRight size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("justify").run()
                  }
                  active={textAlignActive("justify")}
                  title="Justify"
                >
                  <AlignJustify size={18} />
                </ToolbarButton>
              </div>

              <Divider />

              {/* Link */}
              <ToolbarButton
                onClick={() => setShowLinkPopup(true)}
                title="Insert Link"
              >
                <Link2 size={18} />
              </ToolbarButton>

              <Divider />

              {/* History */}
              <div className="flex gap-0.5 ml-auto">
                <ToolbarButton
                  onClick={() => editor.chain().focus().undo().run()}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo size={18} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().redo().run()}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo size={18} />
                </ToolbarButton>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <EditorContent
            editor={editor}
            className="prose prose-slate max-w-none p-8 min-h-[400px] focus:outline-none bg-white"
          />
        </div>
      </div>

      {/* Link Popup Modal */}
      {showLinkPopup && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4">
              <h3 className="text-xl font-semibold text-white">Insert Link</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Display Text
                </label>
                <input
                  type="text"
                  placeholder="Enter link text"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={linkData.text}
                  onChange={(e) =>
                    setLinkData({ ...linkData, text: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={linkData.href}
                  onChange={(e) =>
                    setLinkData({ ...linkData, href: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="bg-gray-50 px-6 py-4 flex justify-end gap-3">
              <button
                className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
                onClick={() => {
                  setShowLinkPopup(false);
                  setLinkData({ href: "", text: "" });
                }}
              >
                Cancel
              </button>
              <button
                className="px-5 py-2.5 rounded-lg font-medium text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg"
                onClick={handleInsertLink}
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
