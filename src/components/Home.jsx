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
    <div className="max-w-[1170px] mt-5 mx-auto h-screen place-content-between">
    <div className="title  flex justify-center">
    <input
        type="text"
       className="border border-gray-300  w-[30%] rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-primaryColor"
        placeholder="Enter Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        onClick={createPaste}
       className="border border-transparent
        bg-slate-600 text-white p-2 mx-5 rounded-lg hover:bg-slate-700 "
      >
        {pasteId ? "Update Paste" : "Create my Paste"}
      </button>
    </div>

      {/* Text area */}
      <div className="flex flex-col items-center justify-center space-y-4 p-4">
        {/* <div className="textarea-head bg-[#333333] h-8 w-[60%]"></div> */}
        <textarea
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setValue(e.target.value)}
          rows={20}
          className=" rounded-2xl w-[60%] p-4 border"
        ></textarea>
      </div>
      <Paste/>
    </div>
  );
}

export default Home;
