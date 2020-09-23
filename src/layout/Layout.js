
import React, {Fragment} from "react";
import Header from "./Header.js"
import Footer from "./Footer.js"
import "./styles/Layout.scss"

function Layout(props) {
	
	return(
	  <Fragment>
		  <Header />
			<main className="Layout">{props.children}</main>
			<Footer />
		</Fragment>
	)
}

export default Layout;


