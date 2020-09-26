import React, { useState, useEffect, Fragment } from "react";
import Photo from "../../components/photos/Photo.js";
import EditPhotoForm from "../../components/photos/EditPhotoForm.js";
import Loader from "../../layout/Loader.js";
import Seo from "../../layout/Seo.js";
import { graphql } from "@octokit/graphql";
import {
  DELETE_PHOTO,
  UPDATE_PHOTO,
  GET_PHOTO,
} from "../../helpers/graphqlQueries.js";

const PhotoDetails = (props) => {
  const [photoId, setPhotoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [photoDeleted, setPhotoDeleted] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});
  const [photoEdited, setPhotoEdited] = useState(false);

  const deletePhoto = async () => {
    try {
      setLoading(true);
      const { deletePhoto } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: DELETE_PHOTO,
        id: photoId,
      });
      setPhotoDeleted(deletePhoto);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error);
    }
  };

  const handleDeleteClick = () => {
    deletePhoto();
  };

  const handleEditChange = (event) => {
    setEditFormValues({
      ...editFormValues,
      [event.target.name]: event.target.value,
    });
    console.log(editFormValues);
  };

  const editPhoto = async (photoId) => {
    try {
      const { updatePhoto } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: UPDATE_PHOTO,
        id: photoId,
        input: {
          title: editFormValues.title,
          thumbnailUrl: editFormValues.thumbnailUrl,
        },
      });

      console.log(updatePhoto);
      setLoading(true);
      setPhotoEdited(updatePhoto);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleEditClick = () => {
    if (showEdit) {
      setShowEdit(false);
    } else {
      setShowEdit(true);
    }
  };

  const handleEditSubmit = (event) => {
    event.preventDefault();
    editPhoto(photoId);
    setShowEdit(false);
  };

  const fetchPhoto = async (photoId) => {
    try {
      setPhotoId(props.match.params.photoId);
      const { photo } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: GET_PHOTO,
        id: photoId,
      });

      setPhoto(photo);
      setLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
  };

  useEffect(() => {
    if (loading) {
      fetchPhoto(photoId);
    }
  });

  if (loading) {
    return <Loader />;
  }

  if (photoEdited) {
    return (
      <Fragment>
        <Photo photo={photoEdited} />
        <button className="cta" onClick={handleDeleteClick}>
          Delete
        </button>
        <button className="cta cta-secondary" onClick={handleEditClick}>
          Edit
        </button>
        {showEdit && (
          <EditPhotoForm
            onSubmit={handleEditSubmit}
            onChange={handleEditChange}
          />
        )}
      </Fragment>
    );
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  if (photoDeleted) {
    return <h2>Photo deleted</h2>;
  }

  return (
    <Fragment>
      <Seo
        site={{
          title: photo.title,
          metaDescription: photo.title,
        }}
      />
      <Photo photo={photo} />
      <button className="cta" onClick={handleDeleteClick}>
        Delete
      </button>
      <button className="cta cta-secondary" onClick={handleEditClick}>
        Edit
      </button>
      {showEdit && (
        <EditPhotoForm
          onSubmit={handleEditSubmit}
          onChange={handleEditChange}
        />
      )}
    </Fragment>
  );
};

export default PhotoDetails;
