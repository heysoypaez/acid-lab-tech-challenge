import React from "react";

function EditPhotoControls(props) {
  return (
    <section className="EditPhotoControls">
      <button className="cta" onClick={props.onDeleteClick}>
        Delete
      </button>
      <button className="cta cta-secondary" onClick={props.onEditClick}>
        Edit
      </button>
    </section>
  );
}

export default EditPhotoControls;
