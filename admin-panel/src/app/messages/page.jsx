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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Messages</h1>
        <div className="flex gap-3">
          <button
            onClick={() => setAll(true)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              all
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setAll(false)}
            className={`cursor-pointer px-4 py-2 rounded-lg transition ${
              !all
                ? "bg-emerald-600 text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            New
          </button>
        </div>
      </div>

      <div className="w-full flex flex-col gap-4">
        {messages?.length === 0 && (
          <div className="col-span-full text-center text-gray-500">
            No messages found
          </div>
        )}

        {messages?.map((msg) => (
          <div
            key={msg._id}
            className="bg-emerald-500 shadow-md rounded-xl p-5 flex flex-col justify-between hover:shadow-lg transition"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <h2 className="font-bold text-lg">{msg.name}</h2>
                {msg.seen ? (
                  <MailOpen className="text-emerald-600" size={20} />
                ) : (
                  <Mail className="text-red-500" size={20} />
                )}
              </div>
              <p className="text-sm text-gray-600">{msg.email}</p>
              <p className="mt-3 text-gray-800 text-sm">{msg.message}</p>
            </div>

            <div className="flex justify-between items-center mt-4">
              <p className="text-xs text-gray-500">
                {new Date(msg.createdAt).toLocaleString()}
              </p>

              {msg.seen ? (
                <span className="px-3 py-1 bg-gray-200 text-gray-600 text-sm rounded-md">
                  Seen
                </span>
              ) : (
                <button
                  onClick={() => seenHandler(msg._id)}
                  className="px-3 py-1 bg-emerald-600 text-white text-sm rounded-md hover:bg-emerald-700 transition"
                >
                  Mark as Seen
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
