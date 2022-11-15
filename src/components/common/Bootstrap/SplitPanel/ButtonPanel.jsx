import React from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './styles.css';

function ButtonPanel(props) {
	return (
		<div className="pt-3 checkout">
			<Link to={props.gobuttonleft}>
				<Button
					{...props}
					variant="outline-primary"
					block
					className="float-left col-12 col-md-5"
				>
					{props.buttonleft}
				</Button>
			</Link>
			<Link to={props.gobuttonright}>
				<Button
					{...props}
					variant="outline-primary"
					block
					className="float-right col-12 col-md-5"
				>
					{props.buttonright}
				</Button>
			</Link>
		</div>
	);
}

export default ButtonPanel;
