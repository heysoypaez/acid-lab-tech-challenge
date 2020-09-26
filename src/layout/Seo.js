import React from "react";
import { Helmet } from "react-helmet";

function Seo({ site }) {
  const { lang, title, metaDescription, author } = site;
  return (
    <Helmet
      htmlAttributes={{
        lang,
      }}
      title={title}
      titleTemplate={`%s | My Photos App`}
      meta={[
        {
          name: `description`,
          content: metaDescription,
        },
        {
          property: `og:title`,
          content: title,
        },
        {
          property: `og:description`,
          content: metaDescription,
        },
        {
          property: `og:type`,
          content: `website`,
        },
        {
          name: `twitter:card`,
          content: metaDescription,
        },
        {
          name: `twitter:creator`,
          content: author,
        },
        {
          name: `twitter:title`,
          content: title,
        },
        {
          name: `twitter:description`,
          content: metaDescription,
        },
        {
          name: "keywords",
          content: "photos,photo,photos gallery",
        },
      ]}
    />
  );
}

Seo.defaultProps = {
  site: {
    title: "Photos",
    metaDescription:
      "A Web application for remember and take new photos of your life",
    lang: "EN",
    author: "heysoypaez",
  },
};

export default Seo;
