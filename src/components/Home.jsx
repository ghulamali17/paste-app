import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateToPaste, addToPaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";
import Paste from "./paste";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const { id: pasteId } = useParams();
  const dispatch = useDispatch();
  const allPaste = useSelector((state) => state.paste.pastes);
  const theme = useSelector((state) => state.theme.mode); // <- theme access

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      }
    }
  }, [pasteId, allPaste]);

  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and content are required.");
      return;
    }

    const paste = {
      title: title.trim(),
      content: value.trim(),
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      dispatch(updateToPaste(paste));
    } else {
      dispatch(addToPaste(paste));
      setTitle("");
      setValue("");
    }
  };

  return (
    <div
      className={`min-h-screen py-10 px-4 ${
        theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div
        className={`max-w-4xl mx-auto p-8 rounded-xl shadow ${
          theme === "dark" ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h1 className="text-3xl font-bold mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            {pasteId ? "Edit Snip" : "Create a New Snip"}
          </h1>
        </h1>

        <div className="space-y-4">
          <input
            type="text"
            className={`w-full border rounded-md p-3 focus:ring-2 focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-400"
                : "border-gray-300 text-gray-700 focus:ring-indigo-500"
            }`}
            placeholder="Enter title here"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className={`w-full h-[250px] border rounded-md p-4 resize-none focus:ring-2 focus:outline-none ${
              theme === "dark"
                ? "bg-gray-700 border-gray-600 text-white focus:ring-indigo-400"
                : "border-gray-300 text-gray-700 focus:ring-indigo-500"
            }`}
            placeholder="Write your content here..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />

          <div className="flex justify-end">
            <button
              onClick={createPaste}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              {pasteId ? "Update Paste" : "Create Paste"}
            </button>
          </div>
        </div>
      </div>

      {/* List of Pastes */}
      <div className="mt-12">
        <Paste />
      </div>
    </div>
  );
}

export default Home;
