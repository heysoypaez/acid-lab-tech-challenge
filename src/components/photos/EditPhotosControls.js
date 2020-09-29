import React from "react";

function EditPhotosControls(props) {
  return (
    <section className="EditPhotosControls">
      <input
        type="button"
        value="Add Photo"
        className="cta cta-secondary"
        onClick={props.onAddPhotoClick}
      />
      <input
        type="button"
        value="Edit Mode"
        className="cta"
        onClick={props.onEditModeClick}
      />
    </section>
  );
}

export default EditPhotosControls;
