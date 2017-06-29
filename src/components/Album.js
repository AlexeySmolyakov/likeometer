import React from 'react'
import PropTypes from 'prop-types'
import { declension } from '../helpers'

class Album extends React.Component {
	state = {
		isLoaded: '',
	};

	componentDidMount () {
		const { album } = this.props;
		const imageSrc = album.sizes.slice(-1)[0].src;

		const image = new Image();
		image.onload = () => this.setState({ isLoaded: 'is-loaded' });
		image.src = imageSrc;
	}

	render () {
		const { album } = this.props;

		const imageSrc = album.sizes.slice(-1)[0].src;
		const imageStyle = { backgroundImage: `url(${imageSrc})` };

		const size = `${album.size} ${declension(album.size, 'фотография', 'фотографии', 'фотографий')}`;

		return (
			<div className="album">
				<div className="wrap">
					<div className="thumb">
						<div className={`image ${this.state.isLoaded}`} style={imageStyle}/>
					</div>
					<div className="title" title={album.title}>{album.title}</div>
					<div className="size">{size}</div>
				</div>
			</div>
		);
	}
}

Album.propTypes = {};
Album.defaultProps = {};

export default Album;