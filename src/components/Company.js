import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import moment from 'moment'

const Company = ({ company }) => {
	const createdAt = moment(`${company.created_at}Z`).format('DD.MM.YYYY | HH:mm:ss');
	const category =
		company.company_category_id && company['company-category'] ?
			<span>{company['company-category'].title}</span>
			:
			<span style={{ color: '#ddd' }}>Нет</span>;

	return (
		<div className="company">
			<div>#{company.id}</div>
			<div>
				<div>{company.title}</div>
				<div style={{ fontSize: '11px', color: '#aaa' }}>{company.legal_name}</div>
			</div>
			<div>{category}</div>
			<div>{company.inn}</div>
			<div>
				<i className="fa fa-file-text-o" aria-hidden="true"/>
				&nbsp;{company.bill_count}</div>
			<div>{createdAt}</div>
			<div className="edit">
				<Link to={`/companies/${company.id}`}>
					<i className="fa fa-pencil"/>
				</Link>
			</div>
		</div>
	);
};

Company.propTypes = {};
Company.defaultProps = {};

export default Company;
