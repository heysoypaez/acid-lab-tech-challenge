import React from "react";
import "./styles/Navbar.scss";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <nav className="Navbar">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/photos">Photos</Link>
        </li>
        <li>
          <Link to="/albums">Albums</Link>
        </li>
        <li>
          <Link to="/photos/new" className="cta">
            Create
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
