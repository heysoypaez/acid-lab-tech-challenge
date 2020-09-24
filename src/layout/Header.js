
import React from "react";
import Navbar from "./Navbar.js"
import "./styles/Header.scss";

function Header(props) {
	
	return(
		<section className="Header">
			<h2>My Photos App</h2>
			<Navbar />
		</section>
	)
}

export default Header;


