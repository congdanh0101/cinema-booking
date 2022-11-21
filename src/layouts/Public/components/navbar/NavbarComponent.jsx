import { path } from '../../../../shared/constants/path';
import React, { Component } from 'react';
import { Navbar, Nav, Image, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../../../service/actions/auth';
import {
	getUserDetail,
	getUserDetailById,
} from '../../../../service/actions/user';
import tickitz_purple from '../../../../assets/images/tickitz-purple.svg';
import './styles.css';

class NavbarComponent extends Component {
	componentDidMount() {
		if (this.props.auth.token !== null)
			this.props.getUserDetail(this.props.auth.token).then(async () => {
				sessionStorage.setItem('userId', this.props.user.detail.id);
				await this.props.getUserDetailById(sessionStorage.getItem('userId'));
				sessionStorage.setItem('firstName', this.props.user.detail.firstName);
				sessionStorage.setItem('lastName', this.props.user.detail.lastName);
				sessionStorage.setItem(
					'phoneNumber',
					this.props.user.detail.phoneNumber
				);
				sessionStorage.setItem('email', this.props.user.detail.email);
				sessionStorage.setItem('gender', this.props.user.detail.gender);
			});
	}

	render() {
		const { user } = this.props;
		return (
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="#home" as={Link} to="/" className="m-0">
						<Image src={tickitz_purple} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="navbar-list mr-auto">
							<Nav.Link className="nav-link" href={path.movies}>
								Movies
							</Nav.Link>
							{user.detail.roles?.map((item) => {
								if (item.name === 'ROLE_ADMIN') {
									return (
										<Nav.Link
											className="nav-link"
											key={item.id}
											href={path.movieManage}
										>
											My Dashboard
										</Nav.Link>
									);
								} else return null;
							})}
						</Nav>
						<Nav className="nav-link justify-content-end" activeKey="/home">
							{this.props.auth.token !== null ? (
								<NavDropdown
									title={
										<Image
											src={
												'https://icon-library.com/images/default-user-icon/default-user-icon-4.jpg'
											}
											className="img-avatar"
										/>
									}
									id="basic-nav-dropdown"
									className="m-0"
								>
									<NavDropdown.Item href={path.home}>Home</NavDropdown.Item>
									<NavDropdown.Item href={path.profile}>
										Your Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										href={path.home}
										onClick={(e) => this.props.logout()}
									>
										Sign out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Item>
									<Link
										to={path.signIn}
										className="btn btn-primary btn-nav mx-2"
									>
										Sign in
									</Link>
								</Nav.Item>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		);
	}
}

const mapStateToProps = (state) => ({
	auth: state.auth,
	user: state.user,
});

const mapDispatchToProps = { logout, getUserDetail, getUserDetailById };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
