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
    <div className="p-6 max-w-4xl mx-auto animate-in fade-in duration-500">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold text-white tracking-tight">AI Bot Training</h1>
        <p className="text-emerald-100/40 text-sm font-medium">Upload documents to enhance your portfolio bot's knowledge</p>
      </header>

      <div className="glass-card p-8 space-y-8">
        <div className="space-y-4">
          <label className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Upload Source PDF</label>
          <div className="relative group">
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              className="w-full bg-white/5 border border-dashed border-white/20 rounded-2xl px-6 py-12 text-center text-emerald-100/40 cursor-pointer hover:bg-white/10 hover:border-emerald-500/50 transition-all file:hidden"
            />
            {!file && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-2">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-emerald-400">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
                </div>
                <span className="text-sm font-bold text-white">Click or drag PDF to upload</span>
                <span className="text-[10px] text-emerald-100/30 uppercase tracking-widest">Max size 10MB</span>
              </div>
            )}
            {file && (
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                 <div className="bg-emerald-500/20 text-emerald-300 px-4 py-2 rounded-xl border border-emerald-500/30 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" x2="8" y1="13" y2="13"/><line x1="16" x2="8" y1="17" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>
                    <span className="font-bold">{file.name}</span>
                 </div>
              </div>
            )}
          </div>
        </div>

        <button
          onClick={extractAndAddContent}
          disabled={!file || loading}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg ${
            !file || loading 
              ? "bg-white/5 text-emerald-100/20 cursor-not-allowed" 
              : "bg-emerald-500 hover:bg-emerald-600 shadow-emerald-500/20 hover:scale-[1.01]"
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-3">
               <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
               <span>Processing Document...</span>
            </div>
          ) : "Extract & Add to Bot Context"}
        </button>

        {status && (
          <div className={`p-4 rounded-xl text-center text-sm font-bold animate-in zoom-in-95 duration-300 ${
            status.includes("Success") 
              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/20" 
              : "bg-white/5 text-emerald-100/60 border border-white/10"
          }`}>
            {status}
          </div>
        )}

        {extractedText && (
          <div className="space-y-4 pt-4 border-t border-white/10">
            <h3 className="text-xs font-bold text-emerald-100/50 uppercase tracking-wider ml-1">Extracted Preview (First 1000 chars)</h3>
            <div className="bg-black/20 border border-white/5 p-6 rounded-2xl max-h-80 overflow-y-auto text-emerald-100/70 text-sm leading-relaxed font-mono no-scrollbar">
              {extractedText.substring(0, 1000)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}