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
          ? "bg-emerald-500/30 text-emerald-200 border border-emerald-500/40"
          : "text-emerald-100/60 hover:bg-white/10 hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

function Divider() {
  return <div className="w-px h-6 bg-white/10" />;
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
    <div className="w-full">
      <div className="max-w-none">
        <div className="glass-card overflow-hidden border border-white/10">
          {/* Toolbar */}
          <div className="bg-white/5 border-b border-white/10 px-4 py-3">
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
                className="px-3 py-1.5 rounded-lg border border-white/20 bg-emerald-900/50 text-xs font-bold text-white hover:bg-emerald-800/50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all appearance-none pr-8 relative"
                style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'white\'%3E%3Cpath stroke-linecap=\'round\' stroke-linejoin=\'round\' stroke-width=\'2\' d=\'M19 9l-7 7-7-7\'%3E%3C/path%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 8px center', backgroundSize: '12px' }}
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
                  <Bold size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().toggleItalic().run()}
                  active={editor.isActive("italic")}
                  title="Italic (Ctrl+I)"
                >
                  <Italic size={16} />
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
                  <List size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleOrderedList().run()
                  }
                  active={editor.isActive("orderedList")}
                  title="Numbered List"
                >
                  <ListOrdered size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().toggleBlockquote().run()
                  }
                  active={editor.isActive("blockquote")}
                  title="Quote"
                >
                  <Quote size={16} />
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
                  <AlignLeft size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("center").run()
                  }
                  active={textAlignActive("center")}
                  title="Align Center"
                >
                  <AlignCenter size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() =>
                    editor.chain().focus().setTextAlign("right").run()
                  }
                  active={textAlignActive("right")}
                  title="Align Right"
                >
                  <AlignRight size={16} />
                </ToolbarButton>
              </div>

              <Divider />

              {/* Link */}
              <ToolbarButton
                onClick={() => setShowLinkPopup(true)}
                title="Insert Link"
              >
                <Link2 size={16} />
              </ToolbarButton>

              <Divider />

              {/* History */}
              <div className="flex gap-0.5 ml-auto">
                <ToolbarButton
                  onClick={() => editor.chain().focus().undo().run()}
                  title="Undo (Ctrl+Z)"
                >
                  <Undo size={16} />
                </ToolbarButton>
                <ToolbarButton
                  onClick={() => editor.chain().focus().redo().run()}
                  title="Redo (Ctrl+Y)"
                >
                  <Redo size={16} />
                </ToolbarButton>
              </div>
            </div>
          </div>

          {/* Editor Area */}
          <div className="bg-white/5 p-4 min-h-[300px]">
            <EditorContent
              editor={editor}
              className="prose prose-invert prose-emerald max-w-none focus:outline-none min-h-[300px] text-white"
            />
          </div>
        </div>
      </div>

      {/* Link Popup Modal */}
      {showLinkPopup && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-[100] p-4">
          <div className="glass-card w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-300">
            <div className="bg-white/10 px-6 py-4 border-b border-white/10">
              <h3 className="text-xl font-bold text-white">Insert Link</h3>
            </div>

            <div className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-emerald-100/50 uppercase tracking-wider mb-2 ml-1">
                  Display Text
                </label>
                <input
                  type="text"
                  placeholder="Enter link text"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  value={linkData.text}
                  onChange={(e) =>
                    setLinkData({ ...linkData, text: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-emerald-100/50 uppercase tracking-wider mb-2 ml-1">
                  URL
                </label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-emerald-100/30 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
                  value={linkData.href}
                  onChange={(e) =>
                    setLinkData({ ...linkData, href: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="bg-white/5 px-6 py-4 flex justify-end gap-3 border-t border-white/10">
              <button
                className="px-5 py-2.5 rounded-xl font-bold text-emerald-100/70 hover:bg-white/10 hover:text-white transition-all"
                onClick={() => {
                  setShowLinkPopup(false);
                  setLinkData({ href: "", text: "" });
                }}
              >
                Cancel
              </button>
              <button
                className="px-6 py-2.5 rounded-xl font-bold text-white bg-emerald-500 hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
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
