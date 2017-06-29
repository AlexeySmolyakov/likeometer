import React from 'react'
import PropTypes from 'prop-types'
import { BILL_STATUS_DONE, BILL_STATUS_IN_PROGRESS } from '../constants'
import moment from 'moment'

const Bill = ({ bill }) => {
	let status =
		<i className="fa fa-times-circle-o" aria-hidden="true"/>;
	if (bill.status === BILL_STATUS_IN_PROGRESS) status =
		<i className="fa fa-clock-o" aria-hidden="true"/>;
	if (bill.status === BILL_STATUS_DONE) status =
		<i className="fa fa-check-circle-o" aria-hidden="true"/>;

	const createdAt = moment(`${bill.created_at}Z`).format('DD.MM.YYYY | HH:mm:ss');
	const purchaseDate = moment(`${bill.purchase_date}`).format('DD.MM.YYYY | HH:mm:ss');

	const company = bill.company ? bill.company.title : <span style={{ color: '#ccc' }}>Нет</span>;

	return (
		<div className="bill">
			<div>#{bill.id}</div>
			<div className="status">
				{status} {bill.check_count > 0 && <span title="Количество проверок">{bill.check_count}</span>}
			</div>
			<div className="user">U: {bill.user_id}</div>
			<div className="price">
				<i className="fa fa-rub" aria-hidden="true"/>
				&nbsp;{bill.purchase_amount}
			</div>
			<div>
				<div>{company}</div>
				{bill.company &&
				<div title="bill.company.legal_name"
						 style={{ fontSize: '10px', color: '#999' }}>
					{bill.company.legal_name}
				</div>}
				{bill.company &&
				<div title="bill.raw_data.document.receipt.user"
						 style={{ fontSize: '10px', color: '#999' }}>
					{bill.status === BILL_STATUS_DONE && bill.raw_data.document.receipt.user}
				</div>}
			</div>
			<div className="items">
				<i className="fa fa-shopping-cart" aria-hidden="true"/>
				&nbsp;{bill.item_ids.length || 0}</div>
			<div className="date" title="Создан">{createdAt}</div>
			<div className="date" title="Дата покупки">{purchaseDate}</div>
		</div>
	);
};

Bill.propTypes = {};
Bill.defaultProps = {};

export default Bill;
