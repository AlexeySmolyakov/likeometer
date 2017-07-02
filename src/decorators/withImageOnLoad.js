import React from 'react';
import PropTypes from 'prop-types';

const withImageOnLoad = (WrappedComponent) =>
	class extends React.Component {
		static propTypes = {
			imageSrc: PropTypes.string.isRequired,
		};

		state = {
			isLoaded: false,
		};

		componentDidMount () {
			const { imageSrc } = this.props;

			this.image = new Image();
			this.image.onload = () => {
				this.setState({ isLoaded: true })
			};
			this.image.src = imageSrc;
		}

		componentWillUnmount () {
			this.image.onload = null;
		}

		render () {
			return <WrappedComponent isLoaded={this.state.isLoaded} {...this.props}/>
		}
	};

export default withImageOnLoad;
