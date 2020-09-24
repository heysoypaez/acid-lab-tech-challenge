import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import Photos from "./Photos.js";

class PhotosContainer extends Component {
  state = {
    photos: [],
    loading: true,
  };

  fetchPhotos = async () => {
    try {
      const photos = await graphql({
        url: "https://graphqlzero.almansi.me/api",
        query: `
						query (
						  $options: PageQueryOptions
						) {
						  photos(options: $options) {
						    data {
						      id
						      title
						      url
						      album {
						      	title
						      }
						    }
						    meta {
						      totalCount
						    }
						  }
						}
					`,
        id: 1,
        options: {
          paginate: {
            page: 1,
            limit: 20,
          },
        },
      });
      console.log(photos);
      this.setState({
        photos: photos.photos.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      console.log(error);
      this.setState({
        error: error,
        loading: true,
      });
    }
  };

  componentDidMount = (props) => {
    this.fetchPhotos();
  };

  render() {
    if (this.state.loading) {
      return <Fragment>Loading... </Fragment>;
    }
    if (this.state.photos.length > 0 && !this.state.loading) {
      return <Photos photos={this.state.photos} />;
    }
    return <Fragment>Hello PhotosContainer </Fragment>;
  }
}

export default PhotosContainer;
