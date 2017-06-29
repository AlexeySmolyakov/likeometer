import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchCompanyWithCategories, save } from '../actions/CompaniesActions'

class Company extends Component {
	state = {
		company: {},
		saving: {},
		categories: [],
		isProcessing: false,
	};

	componentDidMount () {
		const { fetchCompanyWithCategories, match: { params: { companyId } } } = this.props;
		fetchCompanyWithCategories(companyId);
	}

	componentWillReceiveProps (nextProps, nextContext) {
		if (nextProps.company) {
			this.setState({
				company: nextProps.company,
				categories: nextProps.companyCategories,
			});
		}
	}

	handleInput (e) {
		let { company, saving } = this.state;
		company[e.target.name] = e.target.value;
		saving[e.target.name] = e.target.value;
		this.setState({ company, saving });
	}

	onSubmit (e) {
		e.preventDefault();

		this.setState({
			isProcessing: true,
		});

		this.props.save({
			id: this.state.company.id,
			data: this.state.saving,
		})
		.then(response => {
			this.setState({
				isProcessing: false,
			});
		})
		.catch(error => {
			console.warn(error);
		})
	}

	render () {
		let categories = this.state.categories.map(
			(category) => {
				const { id, title } = category;
				const defaultValue = id === this.state.company.id;
				return <option defaultValue={defaultValue} key={id} value={id}>{title}</option>
			}
		);
		if (!this.state.company.company_category_id)
			categories.unshift(<option defaultValue={true} key={0} value="0">Выберите категорию</option>)

		return (
			<div className="company-edit">
				<h2>Редактирование компании</h2>
				{this.state.company.id && <form onSubmit={::this.onSubmit}>
					<label>Название</label>
					<input
						type="text" name="title"
						value={this.state.company.title}
						onChange={::this.handleInput}/>

					<label>Описание</label>
					<textarea
						name="description" rows="5"
						value={this.state.company.description}
						onChange={::this.handleInput}/>

					<label>Категория</label>
					<select
						name="company_category_id"
						value={this.state.company.company_category_id}
						onChange={::this.handleInput}>
						{categories}
					</select>

					<div>
						<button
							type="submit"
							disabled={this.state.isProcessing}>
							Сохранить
						</button>
					</div>
				</form>}
			</div>
		);
	}
}

Company.propTypes = {};
Company.defaultProps = {};


const mapStateToProps = (state, ownProps) => {
	let { match: { params: { companyId } } } = ownProps;
	companyId = +companyId;
	const company = state.companies.companies.find(company => company.id === companyId);
	const { companyCategories } = state.companyCategories;

	return {
		company,
		companyCategories
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchCompanyWithCategories(id) {
			return dispatch(fetchCompanyWithCategories(id))
		},
		save (options) {
			return dispatch(save(options))
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Company);
