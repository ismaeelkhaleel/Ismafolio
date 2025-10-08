"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/context/Context";
import { X } from "lucide-react";
import ReactMarkdown from "react-markdown";

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

  const availableCommands = [
    "help",
    "bio",
    "about",
    "education",
    "experience",
    "projects",
    "skills",
    "leetcode-stats",
    "gfg-stats",
    "socials",
    "clear",
  ];

  const [lines, setLines] = useState([
    {
      id: uid("l"),
      text: "Welcome to mohdismaeel's terminal — type `help` to see all commands.",
      type: "out",
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("command-history") || "[]");
    }
    return [];
  });
  const [hIndex, setHIndex] = useState(null);
  const [username] = useState("mohdismaeel");
  const [isExecuting, setIsExecuting] = useState(false);
  const containerRef = useRef(null);
  const inputRef = useRef(null);

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

  useEffect(() => {
    localStorage.setItem("command-history", JSON.stringify(history));
  }, [history]);

  const focusInput = () => inputRef.current?.focus();

  // pushLine now returns Promise that resolves after typing effect completes
  const pushLine = useCallback((content, type = "out") => {
    const delay = 15;

    if (typeof content === "string") {
      return new Promise((resolve) => {
        let output = "";
        const id = uid("l");

        const print = (i = 0) => {
          if (i < content.length) {
            output += content[i];
            setLines((prev) =>
              prev.map((line) =>
                line.id === id ? { ...line, text: output } : line
              )
            );
            setTimeout(() => print(i + 1), delay);
          } else {
            resolve();
          }
        };

        setLines((s) => [...s, { id, text: "", type }]);
        print();
      });
    } else {
      setLines((s) => [...s, { id: uid("l"), text: content, type }]);
      return Promise.resolve();
    }
  }, []);

  const formatArray = (arr, keys = []) => {
    if (!Array.isArray(arr) || arr.length === 0) return "No data found.";
    return arr
      .map((item, i) => {
        if (typeof item === "string") return `- ${item}`;
        let line = `${i + 1}. `;
        line += keys
          .map((k) => item[k])
          .filter(Boolean)
          .join(" | ");
        return line;
      })
      .join("\n");
  };

  const runCommand = async (raw) => {
    if (!raw.trim() || isExecuting) return;

    setIsExecuting(true);

    setLines((s) => [
      ...s,
      {
        id: uid("c"),
        text: (
          <>
            <span style={{ color: "green", fontWeight: "bold" }}>
              {username}@web:
            </span>
            <span style={{ color: "red", fontWeight: "bold" }}>
              &nbsp;~&nbsp;
            </span>
            <span style={{ color: "white", fontWeight: "bold" }}>$&nbsp;</span>
            {raw}
          </>
        ),
        type: "cmd",
      },
    ]);
    setHistory((h) => [...h, raw]);
    setHIndex(null);

    const [cmd] = raw.trim().split(/\s+/);

    switch (cmd) {
      case "help":
        await pushLine(
          "### Available Commands:\n- " + availableCommands.join(", ")
        );
        break;

      case "bio":
      case "about":
        if (!profile) {
          await pushLine("No profile data available.", "err");
        } else {
          await pushLine(`👤 **${profile.name || "Mohd Ismaeel"}**  
${profile.title || "Web Developer"}  
${profile.description || "No bio available."}`);
        }
        break;

      case "education":
        await pushLine(
          formatArray(education, ["degree", "institute", "endYear"])
        );
        break;

      case "experience":
        await pushLine(
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
        await pushLine(formatArray(projects, ["title"]));
        break;

      case "skills":
        if (!skills || skills.length === 0) {
          await pushLine("No skills found.");
        } else {
          // Skills rendering as React elements - since pushLine expects string or ReactNode
          const skillElements = skills.map((s, i) => (
            <div key={i} className="flex items-center gap-2 my-1">
              {s.icon && <img src={s.icon} alt={s.name} className="w-5 h-5" />}
              <span>{s.name}</span>
              <span>{s.level}</span>
              <span>{s.rating}</span>
            </div>
          ));
          await pushLine(<div className="flex flex-col">{skillElements}</div>);
        }
        break;

      case "leetcode-stats":
        await pushLine("Fetching LeetCode stats...");
        await new Promise((r) => setTimeout(r, 1000));

        if (!leetcodeState || !leetcodeState[0]) {
          await pushLine("LeetCode stats not found.");
        } else {
          const stats = leetcodeState[0];
          await pushLine(` 
**Username:** ${stats.username}  
**Ranking:** ${stats.ranking}  
**Points:** ${stats.point}  
**Stars:** ${stats.starRating}  
**Submissions:** ${stats.acSubmissionNum?.[0]?.count || 0}`);
        }
        break;

      case "gfg-stats":
        await pushLine("Fetching GeeksforGeeks stats...");
        await new Promise((r) => setTimeout(r, 1000));

        if (!gfgState || !gfgState[0]) {
          await pushLine("GFG stats not found.");
        } else {
          const stats = gfgState[0];
          await pushLine(`  
**Username:** ${stats.username}  
**Coding Score:** ${stats.codingScore}  
**Institute Rank:** ${stats.instituteRank}  
**Monthly Score:** ${stats.monthlyScore}  
**Current Streak:** ${stats.currentStreak}  
**Solved:** ${stats.totalProblemsSolved}`);
        }
        break;

      case "socials":
        if (!socials || socials.length === 0) {
          await pushLine("No social links found.");
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
                  <img src={s.icon} alt={s.platform} className="w-5 h-5" />
                )}
                <span>{s.platform}</span>
              </a>
            </div>
          ));
          await pushLine(<div className="flex flex-col">{socialElements}</div>);
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
        await pushLine(
          `${cmd}: command not found, type \`help\` to see all commands.`,
          "err"
        );
    }

    setIsExecuting(false);
    focusInput();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  const onKeyDown = (e) => {
    if (e.key === "Enter") return handleSubmit(e);
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHIndex((i) => {
        const hi = i === null ? history.length - 1 : Math.max(0, i - 1);
        setInput(history[hi] ?? "");
        return hi;
      });
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHIndex((i) => {
        if (i === null) return null;
        const hi = Math.min(history.length - 1, i + 1);
        setInput(history[hi] ?? "");
        return hi === history.length - 1 ? null : hi;
      });
    }
    if (e.key === "Tab") {
      e.preventDefault();
      const match = availableCommands.find((cmd) => cmd.startsWith(input));
      if (match) setInput(match);
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
              {typeof line.text === "string" ? (
                <ReactMarkdown>{line.text}</ReactMarkdown>
              ) : (
                line.text
              )}
            </div>
          ))}

          {!isExecuting && (
            <form onSubmit={handleSubmit} className="mt-1">
              <label className="flex gap-3 items-center">
                <span className="font-mono">
                  <span style={{ color: "green", fontWeight: "bold" }}>
                    {username}@web:
                  </span>
                  <span style={{ color: "red", fontWeight: "bold" }}>
                    &nbsp;~&nbsp;
                  </span>
                  <span style={{ color: "white", fontWeight: "bold" }}>$</span>
                </span>

                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={onKeyDown}
                  className="flex-1 bg-transparent focus:outline-none caret-white font-mono disabled:opacity-50"
                  autoComplete="off"
                  spellCheck={false}
                  disabled={isExecuting}
                />
                <span className="ml-2 opacity-80">▌</span>
              </label>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
