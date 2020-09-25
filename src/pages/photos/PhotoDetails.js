import React, { useState, useEffect, Fragment } from "react";
import Photo from "../../components/photos/Photo.js";
import Loader from "../../layout/Loader.js";
import { graphql } from "@octokit/graphql";
import { DELETE_PHOTO } from "../../helpers/graphqlQueries.js";

const PhotoDetails = (props) => {
  const [photoId, setPhotoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [photoDeleted, setPhotoDeleted] = useState(false);

  const handleDeleteClick = async () => {
    try {
      const { deletePhoto } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: DELETE_PHOTO,
        id: photoId,
      });
      setPhotoDeleted(deletePhoto);
      console.log(deletePhoto);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = () => {
    if (showEdit) {
      setShowEdit(false);
    } else {
      setShowEdit(true);
    }
  };

  const fetchPhoto = (photoId) => {
    try {
      setPhotoId(props.match.params.photoId);
      fetch("https://graphqlzero.almansi.me/api", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          query: `{
			      photo(id: ${photoId}) {
			        id
			        title
			        url
			      }
			    }`,
        }),
      })
        .then((res) => res.json())
        .then((photo) => {
          setPhoto(photo);
          setLoading(false);
        });
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPhoto(photoId);
  });

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (photoDeleted) {
    return <h2>Photo deleted</h2>;
  }

  return (
    <Fragment>
      <Photo photo={photo.data.photo} />
      <button className="cta" onClick={handleDeleteClick}>
        Delete
      </button>
      <button className="cta cta-secondary" onClick={handleEditClick}>
        Edit
      </button>
      {showEdit && <h3>I am editing</h3>}
    </Fragment>
  );
};

export default PhotoDetails;
