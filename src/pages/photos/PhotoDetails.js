import React, { useState, useEffect } from "react";
import EditablePhoto from "../../components/photos/EditablePhoto.js";
import Seo from "../../layout/Seo.js";
import { graphql } from "@octokit/graphql";
import { GET_PHOTO, API_URL } from "../../helpers/graphqlQueries.js";
import "./styles/PhotoDetails.scss";

const PhotoDetails = (props) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [photo, setPhoto] = useState({});

  const fetchPhoto = async (photoId) => {
    setLoading(true);
    try {
      const { photo } = await graphql({
        url: API_URL,
        query: GET_PHOTO,
        id: props.match.params.photoId,
      });

      setPhoto(photo);
    } catch (error) {
      setError(error);
      console.log(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (loading) {
      fetchPhoto(props.match.params.photoId);
    }
  });

  return (
    <section className="PhotoDetails">
      <Seo
        site={{
          title: photo.title,
          metaDescription: photo.title,
        }}
      />
      <EditablePhoto photo={{ id: props.match.params.photoId }} />
    </section>
  );
};

export default PhotoDetails;
