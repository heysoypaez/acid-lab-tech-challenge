import React, { Component, Fragment } from "react";
import { graphql } from "@octokit/graphql";
import Photos from "./Photos.js";
import Loader from "../../layout/Loader.js";
import NewPhotoForm from "./NewPhotoForm.js";
import EditablePhoto from "./EditablePhoto.js";
import EditPhotosControls from "./EditPhotosControls.js";
import {
  API_URL,
  GET_PHOTOS,
  CREATE_PHOTO,
} from "../../helpers/graphqlQueries.js";

class PhotosContainer extends Component {
  state = {
    photos: [],
    loading: true,
    error: null,
    showCreate: false,
    editMode: false,
  };

  handleEditModeClick = (event) => {
    if (this.state.showCreate) {
      this.setState({
        editMode: false,
      });
    } else {
      this.setState({
        editMode: true,
      });
    }
  };

  handleAddPhotoClick = (event) => {
    if (this.state.showCreate) {
      this.setState({
        showCreate: false,
      });
    } else {
      this.setState({
        showCreate: true,
      });
    }
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
        photos: [createPhoto, ...this.state.photos],
        loading: false,
        error: null,
        showCreate: false,
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
      if (this.state.editMode) {
        return (
          <section className="Photos">
            {this.state.photos.map((photo) => (
              <EditablePhoto
                photo={photo}
                key={photo.id}
                onPhotoDeleted={this.handlePhotoDeleted}
              />
            ))}
          </section>
        );
      }

      return (
        <Fragment>
          <EditPhotosControls
            onAddPhotoClick={this.handleAddPhotoClick}
            onEditModeClick={this.handleEditModeClick}
          />
          {this.state.showCreate && (
            <NewPhotoForm
              onSubmit={this.handleSubmit}
              onChange={this.handleInputChange}
            />
          )}
          <Photos photos={this.state.photos} />
        </Fragment>
      );
    }
    return <Fragment>Photos</Fragment>;
  }
}

export default PhotosContainer;
