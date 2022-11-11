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
					title="Choose a Payment Method"
					body={<PayMethod />}
					panel={
						<ButtonPanel
							goButtonLeft="/order-page"
							buttonLeft="Previous step"
							goButtonRight="/ticket-result"
							buttonRight="Pay your order"
						/>
					}
				></PanelLeft>
			</div>
		);
	}
}
