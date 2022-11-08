import React, { Component } from 'react';
import PayInfo from '../../../components/payment/PayInfo';
import PersonalInfo from '../../../components/payment/PersonalInfo';
import ButtonPanel from '../../../components/splitpanel/ButtonPanel';
import PanelLeft from '../../../components/splitpanel/PanelLeft';
import PanelRight from '../../../components/splitpanel/PanelRight';
import PayMethod from '../../../components/payment/PayMethod';

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
