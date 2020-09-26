import React, { Fragment } from "react";
import Seo from "./Seo.js";
import Header from "./Header.js";
import Footer from "./Footer.js";
import "./styles/Layout.scss";

function Layout(props) {
  return (
    <Fragment>
      <Seo />
      <Header />
      <main className="Layout">{props.children}</main>
      <Footer />
    </Fragment>
  );
}

export default Layout;
