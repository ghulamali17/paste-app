import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import { clearUser } from "../Redux/userSlice"; // 👈 import clearUser
import { FiMenu, FiX } from "react-icons/fi";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.mode);
  const currentUser = useSelector((state) => state.user.currentUser); // 👈 get currentUser
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    dispatch(clearUser());
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 py-3">
        <div className="text-2xl font-extrabold text-indigo-600 tracking-wide">
          CodeSnip
        </div>

        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-2xl">
            {menuOpen ? <FiX /> : <FiMenu />}
          </button>
        </div>

        <ul className="hidden md:flex gap-6 text-lg items-center">
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

          <li>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                className="text-indigo-600 hover:underline"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      </div>

      {menuOpen && (
        <ul className="md:hidden flex flex-col gap-4 px-4 pb-4 text-lg">
          <li>
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block hover:text-indigo-600 transition ${
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
              onClick={closeMenu}
              className={({ isActive }) =>
                `block hover:text-indigo-600 transition ${
                  isActive ? "text-indigo-600 font-semibold" : ""
                }`
              }
            >
              Snips
            </NavLink>
          </li>
          <li>
            <button
              onClick={() => {
                dispatch(toggleTheme());
                closeMenu();
              }}
              className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition"
            >
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </li>
          <li>
            {currentUser ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMenu();
                }}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            ) : (
              <NavLink
                to="/login"
                onClick={closeMenu}
                className="text-indigo-600 hover:underline"
              >
                Login
              </NavLink>
            )}
          </li>
        </ul>
      )}
    </nav>
  );
}

export default Navbar;
