import React from "react";
import "./styles/EditPhotoForm.scss";

function EditPhotoForm(props) {
  return (
    <form className="EditPhotoForm" onSubmit={props.onSubmit}>
      <input
        type="text"
        name="title"
        placeholder="Title"
        onChange={props.onChange}
      />
      <input
        type="url"
        name="thumbnailUrl"
        placeholder="thumbnail url"
        onChange={props.onChange}
      />
      <input type="submit" value="Edit Photo" />
    </form>
  );
}

export default EditPhotoForm;
