import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import Photos from "./Photos.js";
import Loader from "../../layout/Loader.js";
import { API_URL, GET_PHOTOS } from "../../helpers/graphqlQueries.js";

class PhotosContainer extends Component {
  state = {
    photos: [],
    loading: true,
    error: null,
  };

  fetchPhotos = async () => {
    try {
      const { photos } = await graphql({
        url: API_URL,
        query: GET_PHOTOS,
        options: {
          sort: {
            order: "DESC",
            field: "id",
          },

          paginate: {
            page: 1,
            limit: 30,
          },
        },
      });
      this.setState({
        photos: photos.data,
        loading: false,
        error: null,
      });
    } catch (error) {
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
      return <Loader />;
    }
    if (this.state.photos.length > 0 && !this.state.loading) {
      return <Photos photos={this.state.photos} />;
    }
    return <Fragment>Photos</Fragment>;
  }
}

export default PhotosContainer;
