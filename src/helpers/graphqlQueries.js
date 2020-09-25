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
			    }
			    meta {
			      totalCount
			    }
			  }
			}
		`;

const UPDATE_PHOTOS = `
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

export { DELETE_PHOTO, CREATE_PHOTO, GET_PHOTOS, UPDATE_PHOTOS };
