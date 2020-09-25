const DELETE_PHOTO = `
	mutation (
	  $id: ID!
	) {
	  deletePhoto(id: $id)
}
`;

const CREATE_PHOTO = `
	mutation (
	  $input: CreatePhotoInput!
	) {
	  createPhoto(input: $input) {
	    title
	    url
	    thumbnailUrl
	  }
	}
`;

const GET_PHOTOS = `
			query (
			  $options: PageQueryOptions
			) {
			  photos(options: $options) {
			    data {
			      id
			      title
			      url
			      thumbnailUrl
			    }
			    meta {
			      totalCount
			    }
			  }
			}
		`;

const GET_PHOTO = `
		query (
		  $id: ID!
		) 	{
    photo(id: $id) {
      id
      title
      url
      thumbnailUrl
    }
  }
`;

const UPDATE_PHOTO = `
		mutation (
		  $id: ID!,
		  $input: UpdatePhotoInput!
		) {
		  updatePhoto(id: $id, input: $input) {
		    id
		    title
		    thumbnailUrl
		  }
		}
		`;

export { DELETE_PHOTO, CREATE_PHOTO, GET_PHOTOS, UPDATE_PHOTO, GET_PHOTO };
