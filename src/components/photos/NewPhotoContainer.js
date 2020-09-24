import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import NewPhotoForm from "./NewPhotoForm.js";
import Loader from "../../layout/Loader.js";
import {Link} from "react-router-dom"

class NewPhotoContainer extends Component {
  state = {
    photos: [],
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
    this.createPhoto();
  };

  createPhoto = async () => {
    try {
      const CREATE_PHOTO = `
				mutation (
				  $input: CreatePhotoInput!
				) {
				  createPhoto(input: $input) {
				    title
				    url
				    thumbnailUrl
				  }
				}
			`;

      console.log(this.state.form);

      const { createPhoto } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: CREATE_PHOTO,
        input: {
          title: this.state.form.title,
          url: this.state.form.imgUrl,
          thumbnailUrl: this.state.form.thumbnailUrl,
        },
      });
      console.log(createPhoto);
      this.setState({
        photoSent: createPhoto,
        loading: false,
        error: null,
        sent: true,
      });
    } catch (error) {
      console.log(error.message);
      this.setState({
        error: error,
        loading: false,
      });
    }
  };

  componentDidMount = (props) => {};

  render() {
    if (this.state.loading) {
      return (
        <Fragment>
          <Loader />{" "}
        </Fragment>
      );
    }
    if (this.state.sent) {
      return (
        <Fragment>
          <h2>Photo created Succesfully!</h2>
          <img
            src={this.state.form.imgUrl}
            title={this.state.form.title}
            alt={this.state.form.title}
            width={300}
          />
          <Link to="/photos">See all the photos</Link>
        </Fragment>
      );
    }
    return (
      <Fragment>
        <NewPhotoForm
          onSubmit={this.handleSubmit}
          onChange={this.handleInputChange}
        />
      </Fragment>
    );
  }
}

export default NewPhotoContainer;
