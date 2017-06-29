import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { fetchCategories, save, destroy } from '../actions/CategoriesActions'

class Category extends Component {
	state = {
		category: {
			id: 0,
			title: '',
			description: '',
		},
		saving: {},
		isProcessing: false,
		redirectToId: null,
		redirectTo: null,
	};

	componentDidMount () {
		const { fetchCategories } = this.props;
		fetchCategories();
	}

	componentWillReceiveProps (nextProps, nextContext) {
		if (nextProps.category) {
			this.setState({
				category: nextProps.category,
				redirectTo: null,
			});
		}
	}

	handleInput (e) {
		let { category, saving } = this.state;
		category[e.target.name] = e.target.value;
		saving[e.target.name] = e.target.value;
		this.setState({ category, saving });
	}

	onDeleteClick () {
		const id = this.state.category.id;
		this.props.destroy({ id })
		.then(response => {
			this.setState({
				redirectTo: '/categories',
			});
		})
	}

	onSubmit (e) {
		e.preventDefault();

		this.setState({
			isProcessing: true,
		});

		this.props.save({
			id: this.state.category.id,
			data: this.state.saving,
		})
		.then(response => {
			this.setState({
				isProcessing: false,
				redirectTo: `/categories/${response.id}`,
			});
		})
		.catch(error => {
			console.warn(error);
		})
	}

	render () {
		if (this.state.redirectTo) return <Redirect to={this.state.redirectTo}/>;

		return (
			<div className="category-edit">
				<h2>Редактирование категории #{this.state.category.id}</h2>
				<form onSubmit={::this.onSubmit}>
					<label>Название</label>
					<input
						type="text" name="title"
						value={this.state.category.title}
						onChange={::this.handleInput}/>

					<label>Описание</label>
					<textarea
						name="description" rows="5"
						value={this.state.category.description}
						onChange={::this.handleInput}/>

					<div>
						<button
							type="submit"
							disabled={this.state.isProcessing}>
							Сохранить
						</button>
					</div>
				</form>

				<button type="button" className="delete" onClick={::this.onDeleteClick}>Удалить</button>
			</div>
		);
	}
}

const mapStateToProps = (state, ownProps) => {
	const categoryId = +ownProps.match.params.categoryId;
	const categories = state.companyCategories.companyCategories;
	const category = categories.find(category => category.id === categoryId);

	return {
		category
	}
};

const mapDispatchToProps = (dispatch) => ({
	fetchCategories () {
		return dispatch(fetchCategories())
	},
	save (options) {
		return dispatch(save(options))
	},
	destroy (options) {
		return dispatch(destroy(options))
	}
});

Category.propTypes = {};
Category.defaultProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(Category);
