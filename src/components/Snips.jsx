import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste, setAllPastes } from "../Redux/PasteSlice";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { app } from "../Firebase/firebase";
import { query, where } from "firebase/firestore";

function Snips() {
  const [searchTerm, setSearchTerm] = useState("");
  const pastes = useSelector((state) => state.paste.pastes);
  const user = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const db = getFirestore(app);

  // Fetch snips from Firestore
  useEffect(() => {
    const fetchSnips = async () => {
  try {
    if (!user?.uid) return;

    const q = query(collection(db, "snips"), where("uid", "==", user.uid));
    const snapshot = await getDocs(q);

    const snipsData = snapshot.docs.map(doc => ({
      ...doc.data(),
      _id: doc.id
    }));

    dispatch(setAllPastes(snipsData));
  } catch (err) {
    console.error("Failed to fetch snips:", err);
    toast.error("Failed to load snips");
  }
};

    if (user) fetchSnips();
  }, [dispatch, db, user]);

  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  //  Delete snip from Firestore + Redux
  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "snips", id));
      dispatch(removeFromPaste(id));
    } catch (err) {
      console.error("Delete error:", err);
      toast.error("Failed to delete");
    }
  };

  // Handle Copy 
  const handleCopy = async (text) => {
    if (!text) {
      toast.error("Nothing to copy!");
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      toast.success("Copied!");
    } catch (err) {
      console.error("Copy failed:", err);
      toast.error("Copy failed");
    }
  };

  // Date 
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
              <h3 className="text-xl font-semibold text-gray-800">{paste.title}</h3>
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
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
              >
                Edit
              </Link>

              <Link
                to={`/snips/${paste._id}/view`}
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
        <p className="text-gray-500 text-center">No snips found.</p>
      )}
    </div>
  );
}

export default Snips;
