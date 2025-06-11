import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";

function AppLayout() {
  const theme = useSelector((state) => state.theme.mode); 

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white min-h-screen" : "bg-white text-black min-h-screen"}>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
