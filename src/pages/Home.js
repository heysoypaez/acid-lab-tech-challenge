import React from "react";
import PhotosContainer from "../components/photos/PhotosContainer.js";
import Hero from "../layout/Hero.js";

function Home(props) {
  return (
    <section className="Home">
      <Hero title="My Photos App" />
      <PhotosContainer />
    </section>
  );
}

export default Home;
