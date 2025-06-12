import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Snips from "./Snips";
import { getFirestore, doc, setDoc, getDoc, collection, addDoc } from "firebase/firestore";
import { app } from "../Firebase/firebase";
import { useSelector } from "react-redux";

function Home() {
  const db = getFirestore(app);
  const { id: pasteId } = useParams();
  const theme = useSelector((state) => state.theme.mode);
  const user = useSelector((state) => state.user.currentUser);

  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");

  // Load snip data when editing
  useEffect(() => {
    const fetchSnip = async () => {
      if (pasteId) {
        const snipRef = doc(db, "snips", pasteId);
        const snipSnap = await getDoc(snipRef);
        if (snipSnap.exists()) {
          const data = snipSnap.data();
          setTitle(data.title);
          setValue(data.content);
        } else {
          toast.error("Snip not found.");
        }
      }
    };

    fetchSnip();
  }, [pasteId]);

  const handleSubmit = async () => {
    if (!user) return toast.error("Please log in to save a snip.");
    if (!title.trim() || !value.trim()) return toast.error("Both fields are required.");

    const snipData = {
      uid: user.uid,
      title: title.trim(),
      content: value.trim(),
      createdAt: new Date().toISOString(),
    };

    try {
      if (pasteId) {
        await setDoc(doc(db, "snips", pasteId), snipData);
        toast.success("Snip updated.");
      } else {
        await addDoc(collection(db, "snips"), snipData);
        toast.success("Snip saved.");
        setTitle("");
        setValue("");
      }
    } catch (error) {
      console.error("Firestore error:", error);
      toast.error("Failed to save snip.");
    }
  };

  return (
    <div className={`min-h-screen py-10 px-4 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}>
      <div className={`max-w-4xl mx-auto p-8 rounded-xl shadow ${theme === "dark" ? "bg-gray-800" : "bg-white"}`}>
        <h1 className="text-3xl font-bold mb-6 text-center">
          {pasteId ? "Edit Snip" : "Create a New Snip"}
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
              onClick={handleSubmit}
              className="bg-indigo-600 text-white font-semibold px-6 py-3 rounded-md hover:bg-indigo-700 transition"
            >
              {pasteId ? "Update Snip" : "Save Snip"}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <Snips />
      </div>
    </div>
  );
}

export default Home;
