import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../Redux/ThemeSlice";
import { clearUser } from "../Redux/userSlice";
import { FiMenu, FiX } from "react-icons/fi";
import { getAuth, signOut } from "firebase/auth";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const theme = useSelector((state) => state.theme.mode);
  const currentUser = useSelector((state) => state.user.currentUser);

  // Dark / light
  useEffect(() => {
    const root = window.document.documentElement;
    theme === "dark"
      ? root.classList.add("dark")
      : root.classList.remove("dark");
  }, [theme]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  // Logout function
  const handleLogout = async () => {
    try {
      await signOut(getAuth());
      dispatch(clearUser());
      localStorage.removeItem("user");
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // User Name and Profile In Navbar
  const UserProfile = () =>
    currentUser ? (
      <li className="flex items-center gap-2">
        <img
          src="https://www.gravatar.com/avatar?d=mp&s=32"
          alt="profile"
          className="w-8 h-8 rounded-full border cursor-pointer"
        />
        <span className="text-sm font-medium text-gray-700 dark:text-white cursor-pointer">
          {(
            currentUser?.name || currentUser?.email?.split("@")[0]
          )?.toUpperCase()}
        </span>
      </li>
    ) : null;

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

          <UserProfile />

          <li>
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="text-red-600 hover:underline"
              >
                Logout
              </button>
            ) : (
              <NavLink to="/login" className="text-indigo-600 hover:underline">
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

          <UserProfile />

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
