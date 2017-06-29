import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchCategories } from '../actions/CategoriesActions'
import Category from '../components/Category'

class Categories extends Component {
	componentDidMount () {
		const { fetchCategories } = this.props;
		fetchCategories();
	}

	render () {
		const { companyCategories } = this.props.categories;
		const list = companyCategories.map(
			user => <Category key={user.id} category={user}/>
		);

		return (
			<div>
				<h2>
					Категории компаний
					<Link to="/categories/0" className="action">

							<i className="fa fa-plus-circle action" aria-hidden="true"/> Добавить

					</Link>
				</h2>
				<div className="category-list">{list}</div>
			</div>
		);
	}
}

Categories.propTypes = {};
Categories.defaultProps = {};

const mapStateToProps = (state) => ({
	categories: state.companyCategories,
});

const mapDispatchToProps = (dispatch) => ({
	fetchCategories() {
		return dispatch(fetchCategories())
	}
});

export default connect(mapStateToProps, mapDispatchToProps)(Categories);