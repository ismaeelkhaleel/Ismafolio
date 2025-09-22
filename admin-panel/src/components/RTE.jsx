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
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  List,
  ListOrdered,
  Quote,
  LinkIcon,
  ImageIcon,
  Undo,
  Redo,
  Save,
} from "lucide-react";

function ToolbarButton({ onClick, active, children, title }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={title}
      className={`flex items-center justify-center gap-1 px-3 py-2 rounded-md border transition-all text-sm font-medium ${
        active
          ? "bg-sky-600 text-white border-sky-600 shadow"
          : "bg-white hover:bg-gray-100 hover:shadow-sm"
      }`}
    >
      {children}
    </button>
  );
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
      Placeholder.configure({ placeholder: "Type here..." }),
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

  const insertImageFromFile = useCallback(
    (file) => {
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        editor.chain().focus().setImage({ src: reader.result }).run();
      };
      reader.readAsDataURL(file);
    },
    [editor]
  );

  if (!editor) return null;

  const setBlockType = (type) => {
    if (type === "paragraph") return editor.chain().focus().setParagraph().run();
    const match = type.match(/^heading-(\d)$/);
    if (match) {
      const lvl = Number(match[1]);
      editor.chain().focus().toggleHeading({ level: lvl }).run();
    }
  };

  const activeBlockLabel = () => {
    if (editor.isActive("heading", { level: 1 })) return "Heading 1";
    if (editor.isActive("heading", { level: 2 })) return "Heading 2";
    if (editor.isActive("heading", { level: 3 })) return "Heading 3";
    return "Normal";
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
      
      editor.chain().focus().insertContent(`<a href="${linkData.href}">${linkData.text}</a>`).run();
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: linkData.href }).run();
    }
    setShowLinkPopup(false);
    setLinkData({ href: "", text: "" });
  };

  return (
    <div className="max-w-4xl mx-auto bg-transparent rounded-xl p-4">
       
      <div className="flex flex-wrap gap-2 items-center mb-3 overflow-x-auto scrollbar-hide">
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
          className="px-3 py-1 rounded-md border bg-white text-sm font-medium"
        >
          <option value="paragraph">Normal</option>
          <option value="heading-1">Heading 1</option>
          <option value="heading-2">Heading 2</option>
          <option value="heading-3">Heading 3</option>
        </select>

        <div className="flex gap-2 ml-2">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive("bold")} title="Bold">
            <Bold size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive("italic")} title="Italic">
            <Italic size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive("underline")} title="Underline">
            <Type size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-2 ml-2">
          <ToolbarButton onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive("bulletList")} title="Bulleted list">
            <List size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive("orderedList")} title="Numbered list">
            <ListOrdered size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive("blockquote")} title="Blockquote">
            <Quote size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-2 ml-2">
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("left").run()} active={textAlignActive("left")} title="Align left">
            <AlignLeft size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("center").run()} active={textAlignActive("center")} title="Align center">
            <AlignCenter size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("right").run()} active={textAlignActive("right")} title="Align right">
            <AlignRight size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().setTextAlign("justify").run()} active={textAlignActive("justify")} title="Justify">
            <AlignJustify size={16} />
          </ToolbarButton>
        </div>

        <div className="flex gap-2 ml-auto">
          <ToolbarButton onClick={() => editor.chain().focus().undo().run()} title="Undo">
            <Undo size={16} />
          </ToolbarButton>
          <ToolbarButton onClick={() => editor.chain().focus().redo().run()} title="Redo">
            <Redo size={16} />
          </ToolbarButton>
        </div>

        <ToolbarButton onClick={() => setShowLinkPopup(true)} title="Insert Link">
          <LinkIcon size={16} />
        </ToolbarButton>
      </div>

      <div className="border rounded-md">
        <EditorContent
          editor={editor}
          className="prose prose-gray max-w-none p-4 h-[250px] overflow-auto focus:outline-none bg-transparent"
        />
      </div>

      {showLinkPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-[300px] flex flex-col gap-3">
            <h3 className="text-lg font-semibold">Insert Link</h3>
            <input
              type="text"
              placeholder="Display Text"
              className="border px-3 py-2 rounded-md w-full"
              value={linkData.text}
              onChange={(e) => setLinkData({ ...linkData, text: e.target.value })}
            />
            <input
              type="text"
              placeholder="URL"
              className="border px-3 py-2 rounded-md w-full"
              value={linkData.href}
              onChange={(e) => setLinkData({ ...linkData, href: e.target.value })}
            />
            <div className="flex justify-end gap-2">
              <button className="px-3 py-1 rounded-md bg-gray-200" onClick={() => setShowLinkPopup(false)}>Cancel</button>
              <button className="px-3 py-1 rounded-md bg-sky-600 text-white" onClick={handleInsertLink}>Insert</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
