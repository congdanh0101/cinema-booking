import React, { Component } from 'react';
import { Navbar, Nav, Image, Container, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tickitz_purple from '../../../../assets/images/tickitz-purple.svg';
import { connect } from 'react-redux';
import { logout } from '../../../../service/actions/auth';
import { getUserDetail, getUserDetailById } from '../../../../service/actions/user';
import './styles.css';

class NavbarComponent extends Component {
	render() {
		return (
			<Navbar expand="lg">
				<Container>
					<Navbar.Brand href="#home" as={Link} to="/" className="m-0">
						<Image src={tickitz_purple} />
					</Navbar.Brand>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="nav-link mr-auto">
							<Nav.Link href="/movies">Movies</Nav.Link>
							{/* <Nav.Link href="/">Cinemas</Nav.Link> */}
							<Nav.Link href="/">Buy Ticket</Nav.Link>
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
									<NavDropdown.Item href="/">Home</NavDropdown.Item>
									<NavDropdown.Item href="/profile-page">
										Your Profile
									</NavDropdown.Item>
									<NavDropdown.Divider />
									<NavDropdown.Item
										href="/"
										onClick={(e) => this.props.logout()}
									>
										Sign out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Item>
									<Link to="/login" className="btn btn-primary btn-nav mx-2">
										Sign in
									</Link>
									<Link to="/sign-up" className="btn btn-primary btn-nav">
										Sign up
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
