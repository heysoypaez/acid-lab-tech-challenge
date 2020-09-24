import React, { Component, Fragment } from "react";
import Hero from "../../layout/Hero.js";
import NewPhotoContainer from "../../components/photos/NewPhotoContainer.js";

class PhotoNew extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <Fragment>
        <Hero title="Create a New Photo in matter of seconds" />
        <NewPhotoContainer />
      </Fragment>
    );
  }
}

export default PhotoNew;
