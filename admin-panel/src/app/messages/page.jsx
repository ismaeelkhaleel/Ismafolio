"use client";
import React, { useEffect, useState } from "react";
import { useAdmin } from "@/context/Context";
import { Mail, MailOpen } from "lucide-react";
import withAuth from "@/components/withAuth";
function Page() {
  const { getNewMessage, messages, getAllMessage, seenMessage } = useAdmin();
  const [all, setAll] = useState(false);

  useEffect(() => {
    if (all) {
      getAllMessage();
    } else {
      getNewMessage();
    }
  }, [all]);
  const seenHandler = async (messageId) => {
    await seenMessage(messageId);
    if (all) {
      getAllMessage();
    } else {
      getNewMessage();
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <h1 className="text-2xl font-bold text-white">Messages</h1>
        <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-full sm:w-auto">
          <button
            onClick={() => setAll(true)}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
              all
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-emerald-100/40 hover:text-white"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setAll(false)}
            className={`flex-1 sm:flex-none px-6 py-2 rounded-lg font-bold text-sm transition-all duration-300 ${
              !all
                ? "bg-emerald-500 text-white shadow-lg"
                : "text-emerald-100/40 hover:text-white"
            }`}
          >
            New
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {messages?.length === 0 && (
          <div className="glass-card p-12 text-center text-emerald-100/30 font-medium">
            No messages found
          </div>
        )}

        {messages?.map((msg) => (
          <div
            key={msg._id}
            className={`glass-card p-6 flex flex-col hover:scale-[1.01] transition-all duration-300 ${
              !msg.seen ? "border-l-4 border-l-red-500" : "border-l-4 border-l-emerald-500/30"
            }`}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${!msg.seen ? "bg-red-500/20 text-red-400" : "bg-emerald-500/20 text-emerald-400"}`}>
                  {!msg.seen ? <Mail size={18} /> : <MailOpen size={18} />}
                </div>
                <div>
                  <h2 className="font-bold text-white">{msg.name}</h2>
                  <p className="text-xs text-emerald-100/40 font-medium">{msg.email}</p>
                </div>
              </div>
              <span className="text-[10px] font-bold text-emerald-100/30 uppercase tracking-widest">
                {new Date(msg.createdAt).toLocaleDateString("en-US", { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>

            <p className="text-sm text-emerald-100/70 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5 italic">
              "{msg.message}"
            </p>

            <div className="flex justify-end mt-4">
              {!msg.seen && (
                <button
                  onClick={() => seenHandler(msg._id)}
                  className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-emerald-500/20"
                >
                  Mark as Read
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default withAuth(Page);
