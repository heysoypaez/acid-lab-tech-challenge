import React from "react";
import { Link } from "react-router-dom";
import "./styles/Photo.scss";

const Photo = ({ photo }) => (
  <figure className="Photo">
    <Link to={`/photos/${photo.id}`}>
      <img src={photo.thumbnailUrl} alt={photo.title} title={photo.title} />
      <figcaption>{photo.title}</figcaption>
    </Link>
  </figure>
);

export default Photo;
