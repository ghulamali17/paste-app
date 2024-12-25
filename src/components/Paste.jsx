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

  return (
    <div className="h-screen max-w-[1170px] mx-auto">
      <input
        type="search"
        className="border rounded-sm p-3 mt-4 mx-3 bg-slate-500"
        placeholder="Search here"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <p>Search Items</p>

      {/* Display pastes */}
      <div className="bg-red-900 mx-auto p-3">
        {filteredData.length > 0 ? (
          filteredData.map((paste, index) => (
            <div key={index}>
              <div className="bg-slate-600 p-9">
                <h3 className="text-xl font-bold border border-black">
                  {paste.title}
                </h3>
                <p>{`${paste.content.substring(0, 100)}.....`}</p>
              </div>

              <div>
                <p className="text-xl">{paste.createdAt}</p>
              </div>

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
          ))
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
}

export default Paste;
