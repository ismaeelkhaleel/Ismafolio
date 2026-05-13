"use client";
import React, { useState } from "react";
import Button from "@/components/buttons/Button";
import { useAdmin } from "@/context/Context";
import { useRouter } from "next/navigation";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAdmin();
  const router = useRouter();

  const loginHandler = (e) => {
    e.preventDefault();

    login(username, password);
    router.push("/profile");
  };

  return (
    <div className="flex justify-center items-center min-h-screen p-4 animate-in fade-in duration-700">
      <form
        onSubmit={loginHandler}
        className="glass-card p-10 w-full max-w-md space-y-8 relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-50" />
        
        <div className="text-center space-y-2">
          <div className="w-16 h-16 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mx-auto mb-4 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
             <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Welcome Back</h1>
          <p className="text-emerald-100/40 text-sm font-medium">Please enter your credentials to continue</p>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-emerald-100/30 uppercase tracking-widest ml-1">Username</label>
            <input
              type="text"
              name="username"
              placeholder="admin_ismaeel"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-emerald-100/30 uppercase tracking-widest ml-1">Password</label>
            <input
              type="password"
              name="password"
              placeholder="••••••••"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-emerald-100/20 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 transition-all"
            />
          </div>
        </div>

        <div className="pt-4">
          <Button name="Secure Login" type="submit" />
        </div>
        
        <p className="text-center text-[10px] text-emerald-100/20 uppercase tracking-[0.2em] pt-4">
          Protected by Ismafolio Security
        </p>
      </form>
    </div>
  );
}

export default Login;