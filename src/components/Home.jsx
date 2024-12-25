import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { updateToPaste, addToPaste } from "../Redux/PasteSlice";
import toast from "react-hot-toast";

function Home() {
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const { id: pasteId } = useParams();
  const dispatch = useDispatch();

  const allPaste = useSelector((state) => state.paste.pastes);

  const createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };

    if (pasteId) {
      // Update paste
      if (title === "" || value === "") {
        toast.error("All should be filled");
      } else {
        dispatch(updateToPaste(paste));
      }
    } else {
      if (title === "" || value === "") {
        toast.error("All should be filled");
      } else {
        // Create new paste
        dispatch(addToPaste(paste));
        setTitle("");
        setValue("");
      }
    }
  };

  useEffect(() => {
    if (pasteId) {
      const paste = allPaste.find((p) => p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
    }
  }, [pasteId]);

  return (
    <div className="max-w-[1170px] mx-auto h-screen place-content-between">
      <input
        type="text"
        className="border mt-4 w-[50%] rounded p-3"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={createPaste}
        className="border bg-slate-600 text-white mx-5 p-2 rounded"
      >
        {pasteId ? "Update Paste" : "Create my Paste"}
      </button>

      {/* Text area */}
      <div>
        <textarea
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className="mt-4 rounded-2xl w-[60%] p-4 border"
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
