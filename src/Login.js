import React, { Component } from 'react';
import { Input, Form } from 'formsy-react-components'

class Login extends Component {
	render() {
		const displayLogin = (showLogin) => {
			if (showLogin) {
				return (
					<div>
					<Form onSubmit={data => this.props.checkSecret(data.secret)} >
					<Input
					name="secret"
					value=""
					label="enter the secret code"
					type="password"
					buttonAfter={<button className="btn btn-primary" type="button">Go!</button>}
					/>
					</ Form>
					</div>
				)
			}
		}

		return (
			<div>
				{ displayLogin(this.props.showLogin) }
			    { this.props.failed ? "login failed!" : "" }
			</div>
		);
	}
}

export default Login
