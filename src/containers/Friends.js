import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Friend from '../components/Friend'
import { fetchFriends } from '../actions/FriendsActions'

class Friends extends Component {
	componentDidMount () {
		this.props.fetchFriends();
	}

	render () {
		if (this.props.isFetching) return <div className="loader"/>;

		const friends = this.props.friends.map(friend =>
			<Friend key={friend.id} friend={friend}/>
		);

		return (
			<div>
				<h1>Мои друзья</h1>

				<div className="friends">
					{ friends }
					<div className="friend"/>
					<div className="friend"/>
					<div className="friend"/>
					<div className="friend"/>
					<div className="friend"/>
				</div>
			</div>
		);
	}
}

Friends.propTypes = {};
Friends.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.userId || state.user.user.uid;
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
