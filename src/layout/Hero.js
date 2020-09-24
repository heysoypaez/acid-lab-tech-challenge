
import React from "react";
import "./styles/Hero.scss";

function Hero(props) {
	
	return(
		<section className="Hero">
			<h1>{props.title}</h1>
		</section>
	)
}

export default Hero;


