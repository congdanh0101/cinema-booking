import React, { Component } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './styles.css';
import barcode from '../../../assets/images/barcode.svg';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { createOrder, createSeat } from '../../../service/actions/order';
import Moment from 'react-moment';

class TicketComponent extends Component {
	render() {
		const { dataDate, dataShowtime, dataMovie } = this.props.order.listOrder;
		const { seatOrder } = this.props.order;
		return (
			<div>
				<Container className="py-5">
					<Card>
						<Card.Body className="px-5  bg-gray">
							<p className="text-center text-display-xs-bold">
								Proof of Payment
							</p>
							<Card>
								<Row>
									{/* Left */}
									<Col md={8} xs={12} className="pr-0 left-ticket">
										<Card.Header className="header-info">
											<svg
												width="126"
												height="49"
												viewBox="0 0 126 49"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0)">
													<path
														d="M13.883 38.9892H8.49253V16.8579H0.369141V11.3202H21.9876V16.8579H13.883V38.9892ZM30.3749 12.7094C30.3749 13.1983 30.2807 13.6549 30.0921 14.0794C29.9163 14.5039 29.6713 14.8769 29.3571 15.1985C29.0429 15.5072 28.6723 15.7581 28.2452 15.951C27.8303 16.1311 27.3844 16.2211 26.9068 16.2211C26.4294 16.2211 25.977 16.1311 25.5498 15.951C25.1352 15.7581 24.7708 15.5072 24.4566 15.1985C24.1551 14.8769 23.9101 14.5039 23.7216 14.0794C23.5456 13.6549 23.4577 13.1983 23.4577 12.7094C23.4577 12.2335 23.5456 11.7833 23.7216 11.3588C23.9101 10.9214 24.1551 10.5484 24.4566 10.2397C24.7708 9.9181 25.1352 9.66728 25.5498 9.48719C25.977 9.29425 26.4294 9.19778 26.9068 9.19778C27.3844 9.19778 27.8303 9.29425 28.2452 9.48719C28.6723 9.66728 29.0429 9.9181 29.3571 10.2397C29.6713 10.5484 29.9163 10.9214 30.0921 11.3588C30.2807 11.7833 30.3749 12.2335 30.3749 12.7094ZM29.4891 38.9892H24.3058V18.3243H29.4891V38.9892ZM51.0698 22.4341L47.3001 26.3124C47.1117 25.7722 46.8541 25.2898 46.5273 24.8653C46.2007 24.4279 45.8302 24.0613 45.4153 23.7655C45.0134 23.4696 44.5736 23.2445 44.096 23.0901C43.6186 22.9358 43.1284 22.8586 42.6258 22.8586C41.9223 22.8586 41.2563 23.0066 40.6281 23.3024C40.0123 23.5982 39.4719 24.0163 39.0072 24.5566C38.5548 25.084 38.1966 25.7143 37.9328 26.4476C37.669 27.1807 37.537 27.9911 37.537 28.8786C37.537 29.5989 37.669 30.2743 37.9328 30.9047C38.1966 31.5349 38.5548 32.0881 39.0072 32.5639C39.4719 33.0399 40.0123 33.413 40.6281 33.683C41.2563 33.9533 41.9223 34.0882 42.6258 34.0882C43.1284 34.0882 43.6122 34.0176 44.0772 33.8761C44.5422 33.7346 44.9756 33.5352 45.3778 33.2778C45.7923 33.0078 46.1567 32.6861 46.4709 32.3131C46.7975 31.9272 47.0615 31.5028 47.2625 31.0396L51.0319 34.918C50.5546 35.6127 50.0016 36.2365 49.3734 36.7895C48.7576 37.3427 48.0855 37.8122 47.3567 38.1981C46.6405 38.584 45.8803 38.8736 45.0762 39.0664C44.2846 39.2722 43.4678 39.3752 42.6258 39.3752C41.2061 39.3752 39.868 39.1049 38.6114 38.5648C37.3674 38.0116 36.2743 37.2592 35.3319 36.3071C34.4019 35.3553 33.667 34.2425 33.1266 32.9691C32.5864 31.6956 32.3162 30.3323 32.3162 28.8786C32.3162 27.2964 32.5864 25.8172 33.1266 24.4408C33.667 23.0644 34.4019 21.8681 35.3319 20.8519C36.2743 19.8229 37.3674 19.0125 38.6114 18.4208C39.868 17.829 41.2061 17.5332 42.6258 17.5332C43.4678 17.5332 44.2908 17.6425 45.095 17.8612C45.9117 18.0799 46.6845 18.4015 47.4133 18.826C48.1547 19.2376 48.833 19.7457 49.4488 20.3503C50.077 20.9548 50.6174 21.6495 51.0698 22.4341ZM58.7785 38.9892H53.5953V10.1046H58.7785V28.3191L66.4494 18.3629H72.3679L65.6769 26.9684L72.3679 38.9892H66.4494L62.3596 31.4835L58.7785 36.3459V38.9892ZM80.4724 12.7094C80.4724 13.1983 80.3779 13.6549 80.1896 14.0794C80.0136 14.5039 79.7686 14.8769 79.4546 15.1985C79.1404 15.5072 78.7696 15.7581 78.3424 15.951C77.9279 16.1311 77.4819 16.2211 77.0043 16.2211C76.5269 16.2211 76.0745 16.1311 75.6474 15.951C75.2325 15.7581 74.8681 15.5072 74.5542 15.1985C74.2526 14.8769 74.0076 14.5039 73.819 14.0794C73.6432 13.6549 73.5552 13.1983 73.5552 12.7094C73.5552 12.2335 73.6432 11.7833 73.819 11.3588C74.0076 10.9214 74.2526 10.5484 74.5542 10.2397C74.8681 9.9181 75.2325 9.66728 75.6474 9.48719C76.0745 9.29425 76.5269 9.19778 77.0043 9.19778C77.4819 9.19778 77.9279 9.29425 78.3424 9.48719C78.7696 9.66728 79.1404 9.9181 79.4546 10.2397C79.7686 10.5484 80.0136 10.9214 80.1896 11.3588C80.3779 11.7833 80.4724 12.2335 80.4724 12.7094ZM79.5864 38.9892H74.4034V18.3243H79.5864V38.9892ZM93.6469 38.9892C92.403 38.9892 91.2344 38.7513 90.1413 38.2753C89.0481 37.7866 88.0869 37.1241 87.2576 36.2879C86.4408 35.4388 85.7936 34.4549 85.3162 33.3358C84.8512 32.2167 84.6188 31.0204 84.6188 29.7469V23.6111H82.1121V18.3629H84.6188V10.1046H89.7455V18.3629H97.5484V23.6111H89.7455V29.7469C89.7455 30.3001 89.8458 30.821 90.0471 31.3099C90.248 31.7857 90.5244 32.2038 90.8762 32.5639C91.2282 32.9243 91.6428 33.2135 92.1202 33.4322C92.5978 33.6382 93.1065 33.7409 93.6469 33.7409H97.5484V38.9892H93.6469ZM116.208 38.9892H99.3768L107.877 23.6111H99.3768V18.3629H116.208L107.707 33.7409H116.208V38.9892Z"
														fill="white"
													/>
													<path
														d="M122.972 22.9842C122.968 22.9818 122.963 22.9805 122.959 22.9784L121.276 21.9829C121.171 22.1052 121.028 22.1864 120.871 22.2129C120.715 22.2393 120.554 22.2093 120.416 22.128C120.278 22.0466 120.172 21.9188 120.116 21.7665C120.06 21.6141 120.058 21.4466 120.109 21.2924L118.414 20.29C118.368 20.2632 118.314 20.256 118.263 20.2699C118.213 20.2838 118.169 20.3177 118.143 20.3643L113.111 29.2875L113.111 29.2881C113.097 29.311 113.089 29.3365 113.086 29.3629C113.082 29.3895 113.084 29.4161 113.091 29.4419C113.097 29.4677 113.109 29.4917 113.125 29.513C113.141 29.5341 113.161 29.5518 113.183 29.5652L114.879 30.5663C114.984 30.4443 115.127 30.3632 115.283 30.3366C115.44 30.3102 115.601 30.3402 115.738 30.4214C115.876 30.5028 115.982 30.6303 116.038 30.7823C116.094 30.9343 116.097 31.1016 116.047 31.2557L117.72 32.2439C117.727 32.2491 117.734 32.2547 117.741 32.2592C117.764 32.2726 117.788 32.281 117.814 32.2847C117.84 32.2881 117.866 32.2863 117.891 32.2794C117.917 32.2726 117.94 32.2607 117.961 32.2444C117.981 32.2283 117.999 32.208 118.012 32.1849V32.1851L123.044 23.2613C123.057 23.2382 123.066 23.2127 123.069 23.1863C123.073 23.1599 123.071 23.1331 123.064 23.1073C123.057 23.0816 123.046 23.0575 123.03 23.0363C123.014 23.0152 122.994 22.9975 122.972 22.9842ZM121.529 23.6769L117.606 30.6332C117.593 30.6564 117.575 30.6767 117.555 30.6927C117.534 30.7091 117.51 30.7209 117.486 30.7278C117.46 30.7346 117.434 30.7365 117.408 30.733C117.383 30.7296 117.358 30.7209 117.335 30.7075L114.699 29.1492C114.676 29.1358 114.656 29.1181 114.641 29.0971C114.625 29.076 114.613 29.0518 114.606 29.0262C114.6 29.0004 114.598 28.9735 114.601 28.9472C114.605 28.9208 114.613 28.8953 114.626 28.8724L118.549 21.916C118.576 21.8694 118.619 21.8354 118.67 21.8215C118.72 21.8076 118.774 21.8149 118.82 21.8417L121.456 23.4001C121.479 23.4134 121.499 23.4311 121.514 23.4522C121.53 23.4733 121.542 23.4974 121.549 23.5231C121.555 23.5488 121.557 23.5756 121.554 23.602C121.55 23.6284 121.542 23.6539 121.529 23.6769Z"
														fill="white"
													/>
													<path
														d="M119.415 26.0886L118.58 25.9296L118.462 25.1123C118.46 25.1002 118.455 25.089 118.447 25.0802C118.439 25.0714 118.428 25.0655 118.416 25.0632C118.404 25.0609 118.392 25.0624 118.381 25.0675C118.371 25.0725 118.362 25.0809 118.355 25.0914L117.951 25.8096L117.136 25.6545C117.125 25.6523 117.113 25.6539 117.102 25.659C117.091 25.6641 117.082 25.6724 117.076 25.6829C117.07 25.6935 117.068 25.7056 117.069 25.7177C117.07 25.7298 117.074 25.7413 117.082 25.7505L117.621 26.3952L117.215 27.1131C117.209 27.1239 117.207 27.136 117.208 27.1481C117.209 27.1605 117.214 27.1721 117.222 27.1813C117.229 27.1905 117.24 27.1968 117.252 27.1997C117.263 27.2026 117.275 27.2018 117.286 27.1974L118.036 26.8928L118.588 27.5538C118.596 27.5628 118.606 27.5693 118.618 27.5722C118.629 27.5751 118.641 27.5743 118.652 27.5701C118.664 27.5659 118.673 27.5583 118.679 27.5483C118.686 27.5383 118.69 27.5264 118.69 27.5143L118.675 26.6281L119.432 26.1976C119.442 26.1916 119.451 26.1826 119.456 26.1717C119.461 26.1608 119.463 26.1486 119.461 26.1366C119.459 26.1247 119.454 26.1137 119.445 26.1051C119.437 26.0965 119.426 26.0908 119.415 26.0886Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0">
														<rect
															x="0.0292969"
															width="125.065"
															height="49"
															rx="16"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
											<p className="float-right text-center text-link-md text-white">
												Admit One
											</p>
										</Card.Header>
										<Card.Body className="pb-0">
											<p className="info mb-1">Movie</p>
											{/* <p className="info-value">{dataMovie.title}</p> */}
											<Row className="d-flex justify-content-center align-items-center">
												<Col xs={4}>
													<p className="info mb-1">Date</p>
													{/* <p className="info-value">
														<Moment format="DD MMMM">{dataDate}</Moment>
													</p> */}
												</Col>
												<Col xs={4}>
													<p className="info mb-1">Time</p>
													{/* <p className="info-value">
														{dataShowtime.times.map((item) => item.time)}
													</p> */}
												</Col>
												<Col xs={4}>
													<p className="info mb-1">Category</p>
													<p className="info-value">PG-13</p>
												</Col>
												<Col xs={4}>
													<p className="info mb-1">Count</p>
													{/* <p className="info-value">
														{seatOrder.length} pieces
													</p> */}
												</Col>
												<Col xs={4}>
													<p className="info mb-1">Seats</p>
													{/* <p className="info-value">
														{this.props.order.seatOrder + ''}
													</p> */}
												</Col>
												<Col xs={4}>
													<p className="info mb-1">Price</p>
													{/* <p className="info-value-price">
														${dataShowtime.price * seatOrder.length}
													</p> */}
												</Col>
											</Row>
										</Card.Body>
									</Col>
									{/* Right */}
									<Col md={4} xs={12} className="pl-0">
										<Card.Header className="header-print text-center">
											<svg
												width="126"
												height="49"
												viewBox="0 0 126 49"
												fill="none"
												xmlns="http://www.w3.org/2000/svg"
											>
												<g clip-path="url(#clip0)">
													<path
														d="M13.883 38.9892H8.49253V16.8579H0.369141V11.3202H21.9876V16.8579H13.883V38.9892ZM30.3749 12.7094C30.3749 13.1983 30.2807 13.6549 30.0921 14.0794C29.9163 14.5039 29.6713 14.8769 29.3571 15.1985C29.0429 15.5072 28.6723 15.7581 28.2452 15.951C27.8303 16.1311 27.3844 16.2211 26.9068 16.2211C26.4294 16.2211 25.977 16.1311 25.5498 15.951C25.1352 15.7581 24.7708 15.5072 24.4566 15.1985C24.1551 14.8769 23.9101 14.5039 23.7216 14.0794C23.5456 13.6549 23.4577 13.1983 23.4577 12.7094C23.4577 12.2335 23.5456 11.7833 23.7216 11.3588C23.9101 10.9214 24.1551 10.5484 24.4566 10.2397C24.7708 9.9181 25.1352 9.66728 25.5498 9.48719C25.977 9.29425 26.4294 9.19778 26.9068 9.19778C27.3844 9.19778 27.8303 9.29425 28.2452 9.48719C28.6723 9.66728 29.0429 9.9181 29.3571 10.2397C29.6713 10.5484 29.9163 10.9214 30.0921 11.3588C30.2807 11.7833 30.3749 12.2335 30.3749 12.7094ZM29.4891 38.9892H24.3058V18.3243H29.4891V38.9892ZM51.0698 22.4341L47.3001 26.3124C47.1117 25.7722 46.8541 25.2898 46.5273 24.8653C46.2007 24.4279 45.8302 24.0613 45.4153 23.7655C45.0134 23.4696 44.5736 23.2445 44.096 23.0901C43.6186 22.9358 43.1284 22.8586 42.6258 22.8586C41.9223 22.8586 41.2563 23.0066 40.6281 23.3024C40.0123 23.5982 39.4719 24.0163 39.0072 24.5566C38.5548 25.084 38.1966 25.7143 37.9328 26.4476C37.669 27.1807 37.537 27.9911 37.537 28.8786C37.537 29.5989 37.669 30.2743 37.9328 30.9047C38.1966 31.5349 38.5548 32.0881 39.0072 32.5639C39.4719 33.0399 40.0123 33.413 40.6281 33.683C41.2563 33.9533 41.9223 34.0882 42.6258 34.0882C43.1284 34.0882 43.6122 34.0176 44.0772 33.8761C44.5422 33.7346 44.9756 33.5352 45.3778 33.2778C45.7923 33.0078 46.1567 32.6861 46.4709 32.3131C46.7975 31.9272 47.0615 31.5028 47.2625 31.0396L51.0319 34.918C50.5546 35.6127 50.0016 36.2365 49.3734 36.7895C48.7576 37.3427 48.0855 37.8122 47.3567 38.1981C46.6405 38.584 45.8803 38.8736 45.0762 39.0664C44.2846 39.2722 43.4678 39.3752 42.6258 39.3752C41.2061 39.3752 39.868 39.1049 38.6114 38.5648C37.3674 38.0116 36.2743 37.2592 35.3319 36.3071C34.4019 35.3553 33.667 34.2425 33.1266 32.9691C32.5864 31.6956 32.3162 30.3323 32.3162 28.8786C32.3162 27.2964 32.5864 25.8172 33.1266 24.4408C33.667 23.0644 34.4019 21.8681 35.3319 20.8519C36.2743 19.8229 37.3674 19.0125 38.6114 18.4208C39.868 17.829 41.2061 17.5332 42.6258 17.5332C43.4678 17.5332 44.2908 17.6425 45.095 17.8612C45.9117 18.0799 46.6845 18.4015 47.4133 18.826C48.1547 19.2376 48.833 19.7457 49.4488 20.3503C50.077 20.9548 50.6174 21.6495 51.0698 22.4341ZM58.7785 38.9892H53.5953V10.1046H58.7785V28.3191L66.4494 18.3629H72.3679L65.6769 26.9684L72.3679 38.9892H66.4494L62.3596 31.4835L58.7785 36.3459V38.9892ZM80.4724 12.7094C80.4724 13.1983 80.3779 13.6549 80.1896 14.0794C80.0136 14.5039 79.7686 14.8769 79.4546 15.1985C79.1404 15.5072 78.7696 15.7581 78.3424 15.951C77.9279 16.1311 77.4819 16.2211 77.0043 16.2211C76.5269 16.2211 76.0745 16.1311 75.6474 15.951C75.2325 15.7581 74.8681 15.5072 74.5542 15.1985C74.2526 14.8769 74.0076 14.5039 73.819 14.0794C73.6432 13.6549 73.5552 13.1983 73.5552 12.7094C73.5552 12.2335 73.6432 11.7833 73.819 11.3588C74.0076 10.9214 74.2526 10.5484 74.5542 10.2397C74.8681 9.9181 75.2325 9.66728 75.6474 9.48719C76.0745 9.29425 76.5269 9.19778 77.0043 9.19778C77.4819 9.19778 77.9279 9.29425 78.3424 9.48719C78.7696 9.66728 79.1404 9.9181 79.4546 10.2397C79.7686 10.5484 80.0136 10.9214 80.1896 11.3588C80.3779 11.7833 80.4724 12.2335 80.4724 12.7094ZM79.5864 38.9892H74.4034V18.3243H79.5864V38.9892ZM93.6469 38.9892C92.403 38.9892 91.2344 38.7513 90.1413 38.2753C89.0481 37.7866 88.0869 37.1241 87.2576 36.2879C86.4408 35.4388 85.7936 34.4549 85.3162 33.3358C84.8512 32.2167 84.6188 31.0204 84.6188 29.7469V23.6111H82.1121V18.3629H84.6188V10.1046H89.7455V18.3629H97.5484V23.6111H89.7455V29.7469C89.7455 30.3001 89.8458 30.821 90.0471 31.3099C90.248 31.7857 90.5244 32.2038 90.8762 32.5639C91.2282 32.9243 91.6428 33.2135 92.1202 33.4322C92.5978 33.6382 93.1065 33.7409 93.6469 33.7409H97.5484V38.9892H93.6469ZM116.208 38.9892H99.3768L107.877 23.6111H99.3768V18.3629H116.208L107.707 33.7409H116.208V38.9892Z"
														fill="white"
													/>
													<path
														d="M122.972 22.9842C122.968 22.9818 122.963 22.9805 122.959 22.9784L121.276 21.9829C121.171 22.1052 121.028 22.1864 120.871 22.2129C120.715 22.2393 120.554 22.2093 120.416 22.128C120.278 22.0466 120.172 21.9188 120.116 21.7665C120.06 21.6141 120.058 21.4466 120.109 21.2924L118.414 20.29C118.368 20.2632 118.314 20.256 118.263 20.2699C118.213 20.2838 118.169 20.3177 118.143 20.3643L113.111 29.2875L113.111 29.2881C113.097 29.311 113.089 29.3365 113.086 29.3629C113.082 29.3895 113.084 29.4161 113.091 29.4419C113.097 29.4677 113.109 29.4917 113.125 29.513C113.141 29.5341 113.161 29.5518 113.183 29.5652L114.879 30.5663C114.984 30.4443 115.127 30.3632 115.283 30.3366C115.44 30.3102 115.601 30.3402 115.738 30.4214C115.876 30.5028 115.982 30.6303 116.038 30.7823C116.094 30.9343 116.097 31.1016 116.047 31.2557L117.72 32.2439C117.727 32.2491 117.734 32.2547 117.741 32.2592C117.764 32.2726 117.788 32.281 117.814 32.2847C117.84 32.2881 117.866 32.2863 117.891 32.2794C117.917 32.2726 117.94 32.2607 117.961 32.2444C117.981 32.2283 117.999 32.208 118.012 32.1849V32.1851L123.044 23.2613C123.057 23.2382 123.066 23.2127 123.069 23.1863C123.073 23.1599 123.071 23.1331 123.064 23.1073C123.057 23.0816 123.046 23.0575 123.03 23.0363C123.014 23.0152 122.994 22.9975 122.972 22.9842ZM121.529 23.6769L117.606 30.6332C117.593 30.6564 117.575 30.6767 117.555 30.6927C117.534 30.7091 117.51 30.7209 117.486 30.7278C117.46 30.7346 117.434 30.7365 117.408 30.733C117.383 30.7296 117.358 30.7209 117.335 30.7075L114.699 29.1492C114.676 29.1358 114.656 29.1181 114.641 29.0971C114.625 29.076 114.613 29.0518 114.606 29.0262C114.6 29.0004 114.598 28.9735 114.601 28.9472C114.605 28.9208 114.613 28.8953 114.626 28.8724L118.549 21.916C118.576 21.8694 118.619 21.8354 118.67 21.8215C118.72 21.8076 118.774 21.8149 118.82 21.8417L121.456 23.4001C121.479 23.4134 121.499 23.4311 121.514 23.4522C121.53 23.4733 121.542 23.4974 121.549 23.5231C121.555 23.5488 121.557 23.5756 121.554 23.602C121.55 23.6284 121.542 23.6539 121.529 23.6769Z"
														fill="white"
													/>
													<path
														d="M119.415 26.0886L118.58 25.9296L118.462 25.1123C118.46 25.1002 118.455 25.089 118.447 25.0802C118.439 25.0714 118.428 25.0655 118.416 25.0632C118.404 25.0609 118.392 25.0624 118.381 25.0675C118.371 25.0725 118.362 25.0809 118.355 25.0914L117.951 25.8096L117.136 25.6545C117.125 25.6523 117.113 25.6539 117.102 25.659C117.091 25.6641 117.082 25.6724 117.076 25.6829C117.07 25.6935 117.068 25.7056 117.069 25.7177C117.07 25.7298 117.074 25.7413 117.082 25.7505L117.621 26.3952L117.215 27.1131C117.209 27.1239 117.207 27.136 117.208 27.1481C117.209 27.1605 117.214 27.1721 117.222 27.1813C117.229 27.1905 117.24 27.1968 117.252 27.1997C117.263 27.2026 117.275 27.2018 117.286 27.1974L118.036 26.8928L118.588 27.5538C118.596 27.5628 118.606 27.5693 118.618 27.5722C118.629 27.5751 118.641 27.5743 118.652 27.5701C118.664 27.5659 118.673 27.5583 118.679 27.5483C118.686 27.5383 118.69 27.5264 118.69 27.5143L118.675 26.6281L119.432 26.1976C119.442 26.1916 119.451 26.1826 119.456 26.1717C119.461 26.1608 119.463 26.1486 119.461 26.1366C119.459 26.1247 119.454 26.1137 119.445 26.1051C119.437 26.0965 119.426 26.0908 119.415 26.0886Z"
														fill="white"
													/>
												</g>
												<defs>
													<clipPath id="clip0">
														<rect
															x="0.0292969"
															width="125.065"
															height="49"
															rx="16"
															fill="white"
														/>
													</clipPath>
												</defs>
											</svg>
										</Card.Header>
										<Card.Body className="pb-0">
											<Row>
												<Col xs={10}>
													<Row className="d-flex align-items-center">
														<Col xs={12}>
															<p className="info mb-1">Movie</p>
															{/* <p className="info-value">{dataMovie.title}</p> */}
														</Col>
														<Col xs={6}>
															<p className="info mb-1">Date</p>
															{/* <p className="info-value">
																<Moment format="DD MMMM">{dataDate}</Moment>
															</p> */}
														</Col>
														<Col xs={6}>
															<p className="info mb-1">Time</p>
															{/* <p className="info-value">
																{dataShowtime.times.map((item) => item.time)}
															</p> */}
														</Col>
														<Col xs={6}>
															<p className="info mb-1">Category</p>
															<p className="info-value">PG-13</p>
														</Col>
														<Col xs={6}>
															<p className="info mb-1">Count</p>
															{/* <p className="info-value">
																{seatOrder.length} pieces
															</p> */}
														</Col>
														<Col xs={6}></Col>
														<Col xs={6}>
															<p className="info mb-1">Seats</p>
															{/* <p className="info-value">
																{this.props.order.seatOrder + ''}
															</p> */}
														</Col>
													</Row>
												</Col>
												<Col xs={2} className="pl-1">
													<Image src={barcode} />
													<Image src={barcode} />
													<Image src={barcode} />
													<Image src={barcode} />
												</Col>
											</Row>
										</Card.Body>
									</Col>
									{/* End Right */}
								</Row>
							</Card>
							{/* Button */}
							<div className="pt-5 d-flex justify-content-center align-items-center">
								<Button variant="outline-dark" className="col-2 mr-2">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="mr-2"
									>
										<path
											d="M21 15V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V15"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M7 10L12 15L17 10"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M12 15V3"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									Download
								</Button>

								<Button variant="outline-dark" className="col-2 ml-2">
									<svg
										width="24"
										height="24"
										viewBox="0 0 24 24"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
										className="mr-2"
									>
										<path
											d="M6 9V2H18V9"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M6 18H4C3.46957 18 2.96086 17.7893 2.58579 17.4142C2.21071 17.0391 2 16.5304 2 16V11C2 10.4696 2.21071 9.96086 2.58579 9.58579C2.96086 9.21071 3.46957 9 4 9H20C20.5304 9 21.0391 9.21071 21.4142 9.58579C21.7893 9.96086 22 10.4696 22 11V16C22 16.5304 21.7893 17.0391 21.4142 17.4142C21.0391 17.7893 20.5304 18 20 18H18"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
										<path
											d="M18 14H6V22H18V14Z"
											stroke="#4E4B66"
											stroke-width="2"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
									Print
								</Button>
							</div>
						</Card.Body>
					</Card>
				</Container>
			</div>
		);
	}
}
const mapStateToProps = (state) => ({
	order: state.order,
});

const mapDispatchToProps = { createOrder, createSeat };

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(TicketComponent)
);
