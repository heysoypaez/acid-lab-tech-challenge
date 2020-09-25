import React, { Fragment } from "react";
import Hero from "../../layout/Hero.js";
import NewPhotoContainer from "../../components/photos/NewPhotoContainer.js";
import Seo from "../../layout/Seo.js";

const PhotoNew = ({ page }) => {
  
  const { title, metaDescription } = page;

  return (
    <Fragment>
      <Seo
        site={{
          title: title,
          metaDescription: metaDescription,
        }}
      />
      <Hero title={title} />
      <NewPhotoContainer />
    </Fragment>
  );
};

PhotoNew.defaultProps = {
  page: {
    title: "Create a new photo in a matter of seconds",
    metaDescription: "Create a new photo in a matter of seconds",
  },
};

export default PhotoNew;
