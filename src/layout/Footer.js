import React from "react";
import "./styles/Footer.scss";

function Footer(props) {
  return (
    <section className="Footer">
      Made by{" "}
      <a
        href="mailto:danielpaezsw66@gmail.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        @heysoypaez
      </a>{" "}
      for Acid Labs with ❤️️
    </section>
  );
}

export default Footer;
