import React, { Fragment } from "react";
import PhotosContainer from "../../components/photos/PhotosContainer.js";
import Seo from "../../layout/Seo.js";

const Photos = ({ page }) => {
  const { title, metaDescription } = page;

  return (
    <Fragment>
      <Seo
        site={{
          title: title,
          metaDescription: metaDescription,
        }}
      />
      <PhotosContainer />
    </Fragment>
  );
};

Photos.defaultProps = {
  page: {
    title: "All your photos in one place",
    metaDescription: "All your photos in one place",
  },
};

export default Photos;
