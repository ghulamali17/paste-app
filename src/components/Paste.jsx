import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/PasteSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";        

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (id) => {
    dispatch(removeFromPaste(id));
  };

  const handleCopy = async (text) => {
    if (!text) {
      toast.error("Nothing to copy!");
      return;
    }

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed"; 
        textarea.style.top = "-1000px";
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        document.execCommand("copy");
        document.body.removeChild(textarea);
      }
      toast.success("Text copied to clipboard!");
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Failed to copy");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });

  return (
    <div className="max-w-4xl mx-auto mt-6">
      <input
        type="text"
        placeholder="Search by title"
        className="w-full border text-black border-gray-300 p-3 rounded-md mb-6"
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredData.length > 0 ? (
        filteredData.map((paste) => (
          <div
            key={paste._id}
            className="bg-white rounded-lg shadow p-6 mb-4 border border-gray-200"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xl font-semibold text-gray-800">
                {paste.title}
              </h3>
              <span className="text-sm text-gray-500">
                {formatDate(paste.createdAt)}
              </span>
            </div>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {paste.content.substring(0, 120)}...
            </p>
            <div className="flex flex-wrap gap-2">
              <Link
                to={`/pastes/${paste._id}`}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Edit
              </Link>
              <Link
                to={`/pastes/${paste._id}/view`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                View
              </Link>
              <button
                onClick={() => handleDelete(paste._id)}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Delete
              </button>
              <button
                onClick={() => handleCopy(paste.content)}
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              >
                Copy
              </button>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-500 text-center">No pastes found.</p>
      )}
    </div>
  );
}

export default Paste;
