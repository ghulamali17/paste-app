import React from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div>
      <nav className="flex justify-around h-[60px] items-center shadow-sm">
        <div className="logo font-bold text-3xl ">
          <h1>Logo</h1>
        </div>
        <ul className="flex gap-3 text-2xl ">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          <li>
            <NavLink to={"/paste"}>Pastes</NavLink>
          </li>
          <li>
            <NavLink to={"/"}>More</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
