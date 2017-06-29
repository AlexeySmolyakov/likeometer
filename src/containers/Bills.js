import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchBills } from '../actions/BillsActions'
import Bill from '../components/Bill'

class Bills extends Component {
	componentDidMount () {
		const { fetchBills } = this.props;
		fetchBills();
	}

	render () {
		const { bills: { bills } } = this.props;
		const billList = bills.map(bill => <Bill key={bill.id} bill={bill}/>);

		return (
			<div>
				<h2>Чеки</h2>
				<div className="bill-list">{billList}</div>
			</div>
		);
	}
}

Bills.propTypes = {};
Bills.defaultProps = {};

const mapStateToProps = (state) => {
	return {
		bills: state.bills,
	}
};

const mapDispatchToProps = (dispatch) => {
	return {
		fetchBills() {
			return dispatch(fetchBills())
		}
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(Bills);