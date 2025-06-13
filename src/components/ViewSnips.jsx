import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaCopy } from "react-icons/fa";
import toast from "react-hot-toast";

function ViewSnips() {
  const { id } = useParams();

  const allPaste = useSelector((state) => state.paste.pastes);

  const pasteToShow = allPaste.find((paste) => paste._id === id);

  // Handle Copy
  const handleCopy = async () => {
    if (!pasteToShow?.content) {
      toast.error("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(pasteToShow.content);
      toast.success("Snip copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy:", err);
      toast.error("Copy failed. Try again.");
    }
  };

  if (!pasteToShow) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 dark:text-gray-300 dark:bg-gray-900">
        <p className="text-xl">Paste not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6 text-center">
          View Snip
        </h1>

        <div className="space-y-6">
          <div>
            <label className="block text-gray-600 dark:text-gray-300 mb-2 font-medium">
              Title
            </label>
            <input
              type="text"
              value={pasteToShow.title}
              disabled
              className="w-full border border-gray-300 dark:border-gray-700 p-3 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-gray-600 dark:text-gray-300 font-medium">
                Content
              </label>
              <button
                onClick={handleCopy}
                title="Copy to clipboard"
                className="text-indigo-600 hover:text-indigo-800 dark:hover:text-indigo-400 transition"
              >
                <FaCopy />
              </button>
            </div>
            <textarea
              value={pasteToShow.content}
              rows={15}
              disabled
              className="w-full border border-gray-300 dark:border-gray-700 p-4 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 cursor-not-allowed resize-none"
            />
          </div>

          <p className="text-right text-sm text-gray-500 dark:text-gray-400">
            Created on:{" "}
            {new Date(pasteToShow.createdAt).toLocaleDateString("en-US", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}

export default ViewSnips;
