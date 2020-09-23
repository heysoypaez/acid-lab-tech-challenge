import React, { Component, Fragment } from "react";

class PhotosContainer extends Component {
	state = {
		photos: [],
	};

	componentDidMount = (props) => {
		console.log("epale");
		fetch("https://graphqlzero.almansi.me/api", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				query: `{
		      photo(id: 1) {
		        id
		        url
		        title
		        album {
		        	title
		        }
		      }
		    }`,
			}),
		})
			.then((res) => res.json())
			.then((photos) => {
				this.setState({
					photos: [...this.state.photos, photos.data.photo],
				});
			});
	};

	render() {
		console.log(this.state);
		if (this.state.photos.length > 0) {
			return (
				<section>
					{this.state.photos.map((photo) => (
						<figure key={photo.id}>
							<img
								src={photo.url}
								width="300"
								alt={photo.title}
								title={photo.title}
							/>
							<figcaption>
								{photo.title} | Album: {photo.album.title}
							</figcaption>
						</figure>
					))}
				</section>
			);
		}
		return <Fragment>Hello PhotosContainer </Fragment>;
	}
}

export default PhotosContainer;
