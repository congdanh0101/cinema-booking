import React, { Component } from 'react';
import { Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createSeat } from '../../../service/actions/order';
import { getAllSeatsAvailableByShowtime } from '../../../service/actions/seat';
import listSeatNum from '../../../shared/constants/data/listSeatNum.js';
import './styles.css';

class Seat extends Component {
	state = {
		listSeatNum,
		listSeat: [],
		selectShowtime: JSON.parse(sessionStorage.getItem('selectShowtime')),
	};
	async componentDidMount() {
		const { seat, getAllSeatsAvailableByShowtime } = this.props;
		const { selectShowtime } = this.state;
		if (!seat.length) await getAllSeatsAvailableByShowtime(selectShowtime.id);
	}
	seatClick = (e) => {
		let { name, checked } = e.target;
		this.setState(
			(e) => {
				let selectedSeat = e.listSeat;
				return (selectedSeat[name] = checked);
			},
			() => {
				this.props.createSeat(
					Object.keys(this.state.listSeat)
						.filter((x) => this.state.listSeat[x])
						.join(', ')
				);
			}
		);
	};
	render() {
		const { listSeatNum } = this.state;

		const seatNum = [];
		listSeatNum.map((seatNumIdx) => {
			return seatNum.push(
				<td key={seatNumIdx.id} className="px-3">
					{seatNumIdx.seatNum}
				</td>
			);
		});

		const seat = [];
		for (let i = 0; i < 10; i++) {
			seat.push(
				<td key={i}>
					<input
						key={i}
						type="checkbox"
						value={`A${i}`}
						name={`A${i}`}
						onChange={this.seatClick}
					/>
				</td>
			);
		}

		console.log(this.state);

		return (
			<div>
				<table>
					<tbody>
						<tr>
							<td>A</td>
							{seat}
						</tr>
						<tr>
							<td>B</td>
							{seat}
						</tr>
						<tr>
							<td>C</td>
							{seat}
						</tr>
						<tr>
							<td>D</td>
							{seat}
						</tr>
						<tr>
							<td>E</td>
							{seat}
						</tr>
						<tr>
							<td>F</td>
							{seat}
						</tr>
						<tr>
							<td>G</td>
							{seat}
						</tr>
						<tr>
							<td>H</td>
							{seat}
						</tr>
						<tr>
							<td>I</td>
							{seat}
						</tr>
						<tr>
							<td>J</td>
							{seat}
						</tr>
					</tbody>
					<tbody>
						<tr>
							<td></td>
							{seatNum}
						</tr>
					</tbody>
				</table>
				<p className="text-link-lg pt-4">Seating key</p>
				<Row>
					<Col>
						<div className="availableBox float-left mr-3"></div>
						<p>Available</p>
					</Col>
					<Col>
						<div className="selectBox float-left mr-3"></div>
						<p>Selected</p>
					</Col>
					<Col>
						<div className="soldBox float-left mr-3"></div>
						<p>Sold</p>
					</Col>
				</Row>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	order: state.order,
	seat: state.seat,
});

const mapDispatchToProps = { createSeat, getAllSeatsAvailableByShowtime };

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Seat));
