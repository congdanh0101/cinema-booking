import React, { Component } from 'react';
import { PayInfo, PayMethod, PersonalInfo } from '../../../components/public';
import { ButtonPanel, PanelLeft, PanelRight } from '../../../components/common';

export default class PaymentPage extends Component {
	render() {
		return (
			<div>
				<PanelLeft title="Payment Info" body={<PayInfo />}>
					<PanelRight title="Personal Info" body={<PersonalInfo />} />
				</PanelLeft>
				<PanelLeft
					title="Payment Method"
					body={<PayMethod />}
					panel={
						<ButtonPanel
							gobuttonleft="/order-page"
							buttonleft="Previous step"
							gobuttonright="/ticket-result"
							buttonright="Pay your order"
						/>
					}
				></PanelLeft>
			</div>
		);
	}
}
