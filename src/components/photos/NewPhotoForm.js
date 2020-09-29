import React from "react";
import "./styles/NewPhotoForm.scss";

function NewPhotoForm(props) {
  return (
    <form className="NewPhotoForm" onSubmit={props.onSubmit}>
      <input
        type="text"
        name="title"
        id="title"
        placeholder="Title"
        onChange={props.onChange}
      />
      <input
        type="url"
        id="url"
        name="url"
        placeholder="Image url"
        onChange={props.onChange}
      />
      <input
        type="url"
        name="thumbnailUrl"
        placeholder="thumbnail url"
        onChange={props.onChange}
      />
      <input type="submit" value="Create New Photo" className="cta" />
    </form>
  );
}

export default NewPhotoForm;
