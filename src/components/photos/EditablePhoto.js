import React, { useState, useEffect } from "react";
import Photo from "./Photo.js";
import EditPhotoForm from "./EditPhotoForm.js";
import EditPhotoControls from "./EditPhotoControls.js";
import Loader from "../../layout/Loader.js";
import Seo from "../../layout/Seo.js";
import { graphql } from "@octokit/graphql";

import {
  DELETE_PHOTO,
  UPDATE_PHOTO,
  GET_PHOTO,
  API_URL,
} from "../../helpers/graphqlQueries.js";

const EditablePhoto = (props) => {
  const [firstLoading, setFirstLoading] = useState(true);
  const [photoId, setPhotoId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState({});
  const [showEdit, setShowEdit] = useState(false);
  const [photoDeleted, setPhotoDeleted] = useState(false);
  const [editFormValues, setEditFormValues] = useState({});

  const deletePhoto = async () => {
    setLoading(true);
    try {
      const { deletePhoto } = await graphql({
        url: API_URL,
        query: DELETE_PHOTO,
        id: photoId,
      });
      setPhotoDeleted(deletePhoto);
    } catch (error) {
      console.log(error);
      setError(error);
    }
    setLoading(false);
  };

  const handleDeleteClick = () => {
    deletePhoto();
  };

  const handleEditChange = (event) => {
    setEditFormValues({
      ...editFormValues,
      [event.target.name]: event.target.value,
    });
  };

  const editPhoto = async (photoId) => {
    try {
      const { updatePhoto } = await graphql({
        url: API_URL,
        query: UPDATE_PHOTO,
        id: photoId,
        input: {
          title: editFormValues.title,
          thumbnailUrl: editFormValues.thumbnailUrl,
        },
      });

      setPhoto(updatePhoto);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(true);
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
    setLoading(true);
    try {
      setPhotoId(photo.id);

      if (firstLoading) {
        const { photo } = await graphql({
          url: API_URL,
          query: GET_PHOTO,
          id: photoId,
        });

        setPhoto(photo);
      }

      setFirstLoading(false);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchPhoto(props.photo.id);
    }
  });

  if (loading) {
    return <Loader />;
  } else if (error) {
    return <h2>{error}</h2>;
  } else if (photoDeleted) {
    return <section>Photo deleted</section>;
  } else {
    return (
      <section className="EditablePhoto">
        <Seo
          site={{
            title: photo.title,
            metaDescription: photo.title,
          }}
        />
        <Photo photo={photo} />
        <section>
          <EditPhotoControls
            onDeleteClick={handleDeleteClick}
            onEditClick={handleEditClick}
          />
          {showEdit && (
            <EditPhotoForm
              onSubmit={handleEditSubmit}
              onChange={handleEditChange}
            />
          )}
        </section>
      </section>
    );
  }
};

export default EditablePhoto;
