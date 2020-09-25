import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import Photos from "./Photos.js";
import Loader from "../../layout/Loader.js";
import { GET_PHOTOS } from "../../helpers/graphqlQueries.js";

class PhotosContainer extends Component {
  state = {
    photos: [],
    loading: true,
  };

  fetchPhotos = async () => {
    try {
      const { photos } = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: GET_PHOTOS,
        options: {
          sort: {
            order: "DESC",
            field: "id",
          },

          paginate: {
            page: 1,
            limit: 20,
          },
        },
      });
      console.log(photos);
      this.setState({
        photos: photos.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error: error,
        loading: false,
      });
    }
  };

  componentDidMount = (props) => {
    this.fetchPhotos();
  };

  render() {
    if (this.state.loading) {
      return (
        <Fragment>
          <Loader />{" "}
        </Fragment>
      );
    }
    if (this.state.photos.length > 0 && !this.state.loading) {
      return <Photos photos={this.state.photos} />;
    }
    return <Fragment>Hello PhotosContainer </Fragment>;
  }
}

export default PhotosContainer;
