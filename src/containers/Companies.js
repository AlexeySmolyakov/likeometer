import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchCompanies } from '../actions/CompaniesActions'
import Company from '../components/Company'

class Companies extends Component {
	componentDidMount () {
		const { fetchCompanies } = this.props;
		fetchCompanies();
	}

	render () {
		const { companies: { companies } } = this.props;
		const companyList = companies.map(company => <Company key={company.id} company={company}/>);

		return (
			<div>
				<h2>Компании</h2>
				<div className="company-list">{companyList}</div>
			</div>
		);
	}
}

Companies.propTypes = {};
Companies.defaultProps = {};


const mapStateToProps = (state) => {
	return {
		companies: state.companies,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanies() {
			return dispatch(fetchCompanies())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Companies);
