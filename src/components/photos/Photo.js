import React from "react";
import "./styles/Photo.scss";

function Photo({ photo }) {
  return (
    <figure key={photo.id} className="Photo">
      <img src={photo.url} width="300" alt={photo.title} title={photo.title} />
      <figcaption>
        {photo.title} | Album: {photo.album.title}
      </figcaption>
    </figure>
  );
}

export default Photo;
