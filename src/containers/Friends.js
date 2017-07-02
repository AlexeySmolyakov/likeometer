import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import withImageOnLoad from '../decorators/withImageOnLoad'
import Friend from '../components/Friend'
const FriendHOC = withImageOnLoad(Friend);

import Loader from '../components/Loader'
import { fetchFriends } from '../actions/FriendsActions'
import { declensionFriends } from '../helpers'

class Friends extends Component {
	constructor () {
		super();
		this.addEvent = this.addEvent.bind(this);
	}

	state = {
		filter: '',
	};

	componentDidMount () {
		this.props.fetchFriends();
		document.addEventListener('keydown', this.addEvent, false);
		document.title = 'Мои друзья';
	}

	componentWillUnmount () {
		document.removeEventListener('keydown', this.addEvent, false);
	}

	addEvent (e) {
		if (e.keyCode === 27) this.setState({ filter: '' });
		else if (e.code.includes('Key'))
			this.setState({ filter: this.state.filter + e.key.toUpperCase().trim() });
		else if (e.code === 'Backspace')
			this.setState({ filter: this.state.filter.substr(0, this.state.filter.length - 1) });
	}

	render () {
		if (this.props.isFetching) return <Loader/>;

		let { friends } = this.props;

		if (this.state.filter) friends = friends.filter(friend => {
			return friend.first_name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
				friend.last_name.toLowerCase().includes(this.state.filter.toLowerCase());
		});
		const list = friends.map(friend =>
			<FriendHOC
				key={friend.id}
				friend={friend}
				imageSrc={friend.photo_100}
			/>
		);

		let placeholders = [];
		for (let i = 0; i < 11; i++) placeholders.push(<div key={i} className="friend"/>);

		return (
			<div>
				<div className="search">{this.state.filter}</div>

				<h1>Мои друзья</h1>
				<h3>
					{friends.length} {declensionFriends(friends.length)}
				</h3>

				<div className="friends">
					{list}
					{placeholders}
				</div>
			</div>
		);
	}
}

Friends.propTypes = {};
Friends.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.userId || state.user.user.id;
	const friends = state.friends.friends[uid] ? state.friends.friends[uid].items : [];

	return {
		friends,
		isFetching: state.friends.isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchFriends () {
		return dispatch(fetchFriends())
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Friends);
