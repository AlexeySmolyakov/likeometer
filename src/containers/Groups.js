import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Group from '../components/Group'
import Loader from '../components/Loader'
import { fetchGroups } from '../actions/GroupsActions'
import { declensionGroups } from '../helpers'

class Groups extends Component {
	constructor () {
		super();
		this.addEvent = this.addEvent.bind(this);
	}

	state = {
		filter: '',
	};

	componentDidMount () {
		this.props.fetchGroups();
		document.addEventListener('keydown', this.addEvent, false);
		document.title = 'Мои группы';
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
		let { groups, isFetching } = this.props;

		if (isFetching) return <Loader/>;

		if (this.state.filter) groups = groups.filter(group => {
			return group.name.toLowerCase().includes(this.state.filter.toLowerCase());
		});
		const list = groups.map(group =>
			<Group key={group.id} group={group}/>
		);

		let placeholders = [];
		for (let i = 0; i < 11; i++) placeholders.push(<div key={i} className="group"/>);

		return (
			<div>
				<div className="search">{this.state.filter}</div>

				<h1>Мои группы</h1>
				<h3>
					{groups.length} {declensionGroups(groups.length)}
				</h3>

				<div className="groups">
					{list}
					{placeholders}
				</div>
			</div>
		);
	}
}

Groups.propTypes = {};
Groups.defaultProps = {};

const mapStateToProps = (state, ownProps) => {
	const uid = ownProps.match.params.userId || state.user.user.id;
	const groups = state.groups.groups[uid] ? state.groups.groups[uid].items : [];

	return {
		groups,
		isFetching: state.groups.isFetching,
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchGroups () {
		return dispatch(fetchGroups())
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(Groups);
