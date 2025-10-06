"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/Context";
import { X } from "lucide-react";

export default function WebTerminal() {
  const router = useRouter();
  const {
    profile,
    education,
    experience,
    projects,
    skills,
    leetcodeState,
    gfgState,
    socials,
  } = useUser();

  const [lines, setLines] = useState([
    {
      id: uid("l"),
      text: "Welcome to mohdismaeel's terminal — type `help` to see all commands.",
      type: "out",
    },
  ]);
  const [cwd] = useState("/home/mohdismaeel");
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const [hIndex, setHIndex] = useState(null);
  const containerRef = useRef(null);
  const inputRef = useRef(null);
  const [username] = useState("mohdismaeel");

  function uid(prefix = "") {
    return prefix + Math.random().toString(36).slice(2, 9);
  }

  useEffect(() => {
    focusInput();
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    containerRef.current.scrollTop = containerRef.current.scrollHeight;
  }, [lines]);

  const focusInput = () => inputRef.current?.focus();

  const pushLine = (content, type = "out") => {
    setLines((s) => [...s, { id: uid("l"), text: content, type }]);
  };

  const formatArray = (arr, keyFields = []) => {
    if (!Array.isArray(arr) || arr.length === 0) return "No data found.";
    return arr
      .map((item, i) => {
        if (typeof item === "string") return `- ${item}`;
        let line = `${i + 1}. `;
        line += keyFields
          .map((k) => item[k])
          .filter(Boolean)
          .join(" | ");
        return line;
      })
      .join("\n");
  };

  const runCommand = (raw) => {
    if (!raw.trim()) return;
    setLines((s) => [
      ...s,
      { id: uid("c"), text: `${username}@web:${cwd}$ ${raw}`, type: "cmd" },
    ]);
    setHistory((h) => [...h, raw]);
    setHIndex(null);

    const [cmd] = raw.trim().split(/\s+/);

    switch (cmd) {
      case "help":
        pushLine(
          "Available commands:\n- bio / about\n- education\n- experience\n- projects\n- skills\n- leetcode-stats\n- gfg-stats\n- socials\n- clear"
        );
        break;

      case "bio":
      case "about":
        if (!profile)
          pushLine("No profile data available. Please add your bio.", "err");
        else {
          pushLine(`👤 ${profile.name || "Mohd Ismaeel"}`);
          pushLine(`${profile.title || "Web Developer"}`);
          pushLine(`${profile.description || "No bio info available."}`);
          if (profile.location) pushLine(`📍 ${profile.location}`);
        }
        break;

      case "education":
        pushLine(
          "🎓 Education:\n" +
            formatArray(education, ["degree", "institute", "endYear"])
        );
        break;

      case "experience":
        pushLine(
          "💼 Experience:\n" +
            formatArray(experience, [
              "jobTitle",
              "companyName",
              "description",
              "startDate",
              "endDate",
              "location",
            ])
        );
        break;

      case "projects":
        pushLine("📁 Projects:\n" + formatArray(projects, ["title"]));
        break;

      case "skills":
        if (!skills || skills.length === 0) {
          pushLine("No skills found.");
        } else {
          const skillElements = skills.map((s, i) => (
            <div key={i} className="flex items-center gap-2 my-1">
              {s.icon && <img src={s.icon} alt={s.name} className="w-5 h-5" />}
              <span>{s.name || "Unknown Skill"}</span>
              <span>{s.level || "Unknown Skill"}</span>
              <span>{s.rating || "Unknown Skill"}</span>
            </div>
          ));
          pushLine(
            <div className="flex flex-col">
              <span>🧠 Skills:</span>
              {skillElements}
            </div>
          );
        }
        break;

      case "leetcode-stats":
        if (!leetcodeState || !leetcodeState[0]) {
          pushLine("LeetCode stats not found.");
        } else {
          const stats = leetcodeState[0];
          pushLine(
            `💻 LeetCode Stats:
Username: ${stats.username}
Ranking: ${stats.ranking}
Points: ${stats.point}
Stars: ${stats.starRating}
Submissions: ${JSON.stringify(stats.acSubmissionNum?.[0]?.count || 0)}`
          );
        }
        break;

      case "gfg-stats":
        if (!gfgState || !gfgState[0]) {
          pushLine("Geeksforgeeks stats not found.");
        } else {
          const stats = gfgState[0];
          pushLine(
            `💚 GeeksForGeeks Stats:
Username: ${stats.username}
Coding Score: ${stats.codingScore}
Institute Rank: ${stats.instituteRank}
Monthly Score: ${stats.monthlyScore}
Current Streak: ${stats.currentStreak}
Problems Solved: ${JSON.stringify(stats.totalProblemsSolved)}`
          );
        }
        break;

      case "socials":
        if (!socials || socials.length === 0) {
          pushLine("No social links found.");
        } else {
          const socialElements = socials.map((s) => (
            <div key={s.platform} className="my-1">
              <a
                href={s.url || s.username}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:opacity-80"
              >
                {s.icon && (
                  <img
                    src={s.icon}
                    alt={s.platform}
                    className="w-5 h-5 cursor-pointer"
                  />
                )}
                <span>{s.platform}</span>
              </a>
            </div>
          ));

          pushLine(
            <div className="flex flex-col">
              <span>🌐 Socials:</span>
              {socialElements}
            </div>
          );
        }
        break;

      case "clear":
        setLines([
          {
            id: uid("l"),
            text: "Welcome to mohdismaeel's terminal — type `help` to see all commands.",
            type: "out",
          },
        ]);
        break;

      default:
        pushLine(`${cmd}: command not found, type help to see all the command`, "err");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSubmit(e);
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHIndex((i) => {
        const hi = i === null ? history.length - 1 : Math.max(0, i - 1);
        const val = history[hi] ?? "";
        setInput(val);
        return hi;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHIndex((i) => {
        if (i === null) return null;
        const hi = Math.min(history.length - 1, i + 1);
        const val = history[hi] ?? "";
        setInput(val);
        return hi === history.length - 1 ? null : hi;
      });
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto p-4">
      <div
        onClick={focusInput}
        className="relative bg-[#1a1a1a] text-white rounded-lg shadow-lg overflow-hidden"
      >
        <button
          onClick={() => router.push("/")}
          className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
          aria-label="Close Terminal"
        >
          <X size={20} />
        </button>
        <div
          ref={containerRef}
          className="h-96 p-4 font-mono text-sm leading-5 overflow-y-auto scrollbar-hide"
        >
          {lines.map((line) => (
            <div
              key={line.id}
              className={`whitespace-pre-wrap ${
                line.type === "cmd"
                  ? "text-green-300"
                  : line.type === "err"
                  ? "text-red-400"
                  : "text-gray-200"
              }`}
            >
              {line.text}
            </div>
          ))}

          <form onSubmit={handleSubmit} className="mt-1">
            <label className="flex gap-3 items-center">
              <span className="text-green-400 font-mono">
                {username}@web:{cwd}$
              </span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="flex-1 bg-transparent focus:outline-none caret-white font-mono"
                autoComplete="off"
                spellCheck={false}
              />
              <span className="ml-2 opacity-80">▌</span>
            </label>
          </form>
        </div>
      </div>
    </div>
  );
}
