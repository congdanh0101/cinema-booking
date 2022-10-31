import React, { Component } from 'react';
import {
	Navbar,
	Nav,
	Form,
	Image,
	Container,
	NavDropdown,
} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import tickitz_purple from '../../assets/images/tickitz-purple.svg';
import { connect } from 'react-redux';
import { userDetail } from '../../redux/actions/user';
import './styles.css';

class NavbarComponent extends Component {
	async componentDidMount() {
		this.props.userDetail(this.props.auth.token);
	}

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
							<Nav.Link href="/">Movies</Nav.Link>
							<Nav.Link href="/">Cinemas</Nav.Link>
							<Nav.Link href="/">Buy Ticket</Nav.Link>
						</Nav>
						<Nav className="nav-link justify-content-end" activeKey="/home">
							<Nav.Item>
								<Form action="" className="search-form">
									<input type="search" className="search-input" />
									<i className="fa fa-search"></i>
								</Form>
							</Nav.Item>

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
									<NavDropdown.Item href="#action/3.4">
										Sign out
									</NavDropdown.Item>
								</NavDropdown>
							) : (
								<Nav.Item>
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

const mapDispatchToProps = { userDetail };

export default connect(mapStateToProps, mapDispatchToProps)(NavbarComponent);
