import React, { Component, Fragment } from 'react';
import PhotosContainer from "../../components/photos/PhotosContainer.js"


 class Photos extends Component {

 	constructor(props) {
 		super(props)

 		this.state = {

 		}
 	}

	render() {
		return (
			<Fragment>
				<PhotosContainer /> 
			</Fragment>
		);
	}
}

export default Photos;
