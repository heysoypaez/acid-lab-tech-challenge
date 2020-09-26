import React from "react";
import Photo from "./Photo.js";
import "./styles/Photos.scss";

function Photos(props) {
  return (
    <section className="Photos">
      {props.photos.map((photo) => (
        <Photo photo={photo} key={photo.id} />
      ))}
    </section>
  );
}

export default Photos;
