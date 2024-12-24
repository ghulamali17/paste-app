import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { updateToPaste , addToPaste} from "../Redux/PasteSlice";

function Home() {
  const [title, setTitle] = useState();
  const [value, setVlaue] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  let dispatch = useDispatch();

  let createPaste = () => {
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(36),
      createdAt: new Date().toISOString(),
    };
    if (pasteId) {
      // update
      dispatch(updateToPaste(paste));
    } else {
      // create
      dispatch(addToPaste(paste));
    }
    // after creattion 
    setTitle("")
    setVlaue("")
    setSearchParams("")
  };
  return (
    <div className=" max-w-[1170px] mx-auto h-screen  place-content-between">
      <input
        type="text"
        className=" border mt-4 w-[50%] rounded p-3"
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

      {/* Text area  */}
      <div>
        <textarea
          value={value}
          placeholder="Enter Content Here"
          onChange={(e) => setVlaue(e.target.value)}
          rows={20}
          className=" mt-4 rounded-2xl w-[60%] p-4 border"
        ></textarea>
      </div>
    </div>
  );
}

export default Home;
