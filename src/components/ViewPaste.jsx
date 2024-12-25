import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

function ViewPaste() {
  const { id } = useParams();
  const allPaste = useSelector((state) => state.paste.pastes);

  const pasteToShow = allPaste.find((paste) => paste._id === id);

  if (!pasteToShow) {
    return <div>Paste not found</div>;
  }

  return (
    <div className="max-w-[1170px] mx-auto h-screen place-content-between">
      {/* Text area */}
      <div>
        <input
          type="text"
          className="border mt-4 w-[50%] rounded p-3"
          placeholder="Enter Title"
          value={pasteToShow.title}
          disabled
        />
        <textarea
          value={pasteToShow.content}
          placeholder="Enter Content Here"
          rows={20}
          className="mt-4 rounded-2xl w-[60%] p-4 border"
          disabled
        ></textarea>
      </div>
    </div>
  );
}

export default ViewPaste;
