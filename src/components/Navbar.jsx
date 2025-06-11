import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";

function Navbar() {
  const dispatch = useDispatch();
  const theme = useSelector((state) => state.theme.mode);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="text-2xl font-extrabold text-indigo-600 tracking-wide">
        CodeSnip
      </div>

      {/* Navigation links */}
      <ul className="flex gap-6 text-lg items-center">
        <li>
          <NavLink
            to="/"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600 font-semibold" : ""
              }`
            }
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/snips"
            className={({ isActive }) =>
              `hover:text-indigo-600 transition ${
                isActive ? "text-indigo-600 font-semibold" : ""
              }`
            }
          >
            Snips
          </NavLink>
        </li>
        <li>
          <button
            onClick={() => dispatch(toggleTheme())}
            className="bg-indigo-600 text-white px-4 py-1.5 rounded-md hover:bg-indigo-700 transition"
          >
            {theme === "light" ? "Dark Mode" : "Light Mode"}
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
