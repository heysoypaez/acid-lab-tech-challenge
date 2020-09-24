import React from "react";
import Photo from "./Photo.js";
import "./styles/Photos.scss";

function Photos(props) {
  console.log(props);
  return (
    <section className="Photos">
      {props.photos.map((photo) => (
        <Photo photo={photo} />
      ))}
    </section>
  );
}

export default Photos;
