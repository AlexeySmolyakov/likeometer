import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Category = ({ category }) => {
	const createdAt = moment(`${category.created_at}Z`).format('DD.MM.YYYY | HH:mm:ss');

	return (
		<div className="category">
			<div>#{category.id}</div>
			<div>{category.title}</div>
			<div>{category.description}</div>
			<div className="edit">
				<Link to={`/categories/${category.id}`}>
					<i className="fa fa-pencil"/>
				</Link>
			</div>
		</div>
	);
};

Category.propTypes = {};
Category.defaultProps = {};

export default Category;
