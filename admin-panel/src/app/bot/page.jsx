"use client";

import React, { useState } from "react";
import { useAdmin } from "@/context/Context";

export default function PDFUploadPage() {
  const { addBotContent } = useAdmin();
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleFileChange = (e) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
      setStatus("");
      setExtractedText("");
    } else {
      setStatus("Please select a valid PDF file");
    }
  };

  const extractAndAddContent = async () => {
    if (!file) {
      setStatus("No file selected");
      return;
    }

    setLoading(true);
    setStatus("Processing PDF...");

    try {
      const pdfjsLib = await import("pdfjs-dist/build/pdf");

      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url
      ).toString();

      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;

      let fullText = "";

      for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);

        const textContent = await page.getTextContent({
          normalizeWhitespace: true,
          disableCombineTextItems: false
        });

        let lastY = null;
        let pageText = "";

        for (const item of textContent.items) {
          if (!item.str) continue;

          if (lastY === item.transform[5]) {
            pageText += item.str + " ";
          } else {
            pageText += "\n" + item.str + " ";
          }

          lastY = item.transform[5];
        }

        fullText += pageText + "\n\n";
      }

      const cleanedText = fullText
        .replace(/\s+\n/g, "\n")
        .replace(/\n{3,}/g, "\n\n")
        .trim();

      setExtractedText(cleanedText);
      await addBotContent(cleanedText);

      setStatus(`Success! ${cleanedText.length} characters extracted`);
    } catch (err) {
      setStatus("Cannot read PDF file");
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Upload PDF</h1>

      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="w-full border border-gray-300 rounded-lg px-3 py-2 mb-4"
      />

      <button
        onClick={extractAndAddContent}
        disabled={!file || loading}
        className="px-6 py-2 rounded-lg text-white bg-emerald-600"
      >
        {loading ? "Processing..." : "Extract & Add to Bot Context"}
      </button>

      {status && <p className="mt-4">{status}</p>}

      {extractedText && (
        <div className="mt-6 border p-4 max-h-96 overflow-auto text-sm whitespace-pre-wrap">
          {extractedText.substring(0, 1000)}
        </div>
      )}
    </div>
  );
}