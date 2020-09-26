import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import NewPhotoForm from "./NewPhotoForm.js";
import Loader from "../../layout/Loader.js";
import { Link } from "react-router-dom";
import Photo from "./Photo.js";
import { API_URL, CREATE_PHOTO } from "../../helpers/graphqlQueries.js";

class NewPhotoContainer extends Component {
  state = {
    loading: false,
    form: {},
    sent: false,
  };

  handleInputChange = (event) => {
    this.setState({
      form: {
        ...this.state.form,
        [event.target.name]: event.target.value,
      },
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.createPhoto(this.state.form);
  };

  createPhoto = async (input) => {
    try {
      const { createPhoto } = await graphql({
        url: API_URL,
        query: CREATE_PHOTO,
        input: {
          title: input.title,
          url: input.url,
          thumbnailUrl: input.thumbnailUrl,
        },
      });

      this.setState({
        photoSent: createPhoto,
        loading: false,
        error: null,
        sent: true,
      });
      return createPhoto;
    } catch (error) {
      this.setState({
        error: error,
        loading: false,
      });
      return error;
    }
  };

  render() {
    if (this.state.loading) {
      return <Loader />;
    }
    if (this.state.sent) {
      return (
        <Fragment>
          <h2>Photo created Succesfully!</h2>
          <Photo photo={this.state.form} />
          <Link to="/photos">See all the photos</Link>
        </Fragment>
      );
    }
    return (
      <NewPhotoForm
        onSubmit={this.handleSubmit}
        onChange={this.handleInputChange}
      />
    );
  }
}

export default NewPhotoContainer;
