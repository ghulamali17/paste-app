import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeFromPaste } from "../Redux/PasteSlice";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Link, useSearchParams } from "react-router-dom";

function Paste() {
  const pastes = useSelector((state) => state.paste.pastes);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  const pasteId = searchParams.get("pasteId");

  // Filter search term
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Delete handler
  const deleteHandler = (pasteId) => {
    dispatch(removeFromPaste(pasteId));
  };

  // Copy handler
  const handleCopy = (content) => {
    navigator.clipboard.writeText(content || "");
    toast.success("Text copied to clipboard!");
  };

  // Convert date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${date.toLocaleString("default", {
      month: "short",
    })}, ${date.getFullYear()}`;
  };

  return (
    <div className="h-screen max-w-[1170px] mx-auto text-white">
     
      {/* Display pastes */}
      <div className="bg-gray-800 mt-10 max-w-[600px]  rounded-md mx-auto p-3">
      <input
        type="search"
        className="border text-black  rounded-sm w-[96%] p-3 mt-4 mx-3 "
        placeholder="Search here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
        {filteredData.length > 0 ? (
          filteredData.map((paste, index) => (
            <div key={index}>
              <div className="bg-slate-600 rounded-lg p-9 mt-4">
                <h3 className="text-xl font-bold ">{paste.title}</h3>
                <p>{`${paste.content.substring(0, 100)}.....`}</p>
                <p className="text-xl text-end">
                  {formatDate(paste.createdAt)}
                </p>
                <div className="buttons flex justify-evenly">
                  <Link
                    className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
                    to={`/pastes/${paste._id}`}
                  >
                    Edit
                  </Link>

                  <Link
                    to={`/pastes/${paste._id}/view`}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                  >
                    View
                  </Link>

                  <button
                    onClick={() => deleteHandler(paste._id)}
                    className="bg-red-500 text-white py-2 px-4 rounded shadow-lg hover:shadow-xl"
                  >
                    Delete
                  </button>

                  <button
                    onClick={() => handleCopy(paste.content)}
                    className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:shadow-xl"
                  >
                    Copy
                  </button>

                  <button className="bg-blue-500 text-white py-2 px-4 rounded shadow-lg hover:shadow-xl">
                    Share
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl font-bold text-yellow-500">No results found</p>
        )}
      </div>
    </div>
  );
}

export default Paste;
