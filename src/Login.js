import React, { Component } from 'react';
import { Input, Form } from 'formsy-react-components'
import { withFirebase } from './Firebase'

class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {failed: false}    
        }

    onSubmit = event => {
        const {email, password} = event
        this.props.firebase
            .doSignInWithEmailAndPassword(email, password)
            .then(() => {
              this.props.handleLogin()
                })
            .catch(() => {
                this.setState({failed: true})
                })
    }

	render() {
		const displayLogin = (showLogin) => {
			if (showLogin) {
				return (
					<div>
					<Form onSubmit={data => this.onSubmit(data)} >
                    <Input
                    name="email"
                    type='text'
                    placeholder='Email Address'
                    />
					<Input
					name="password"
					placeholder="enter the secret code"
					type="password"
					/>
 <input style={{textAlign: 'center'}} className="btn btn-primary" formNoValidate={true} type="submit" defaultValue="Login" />
					</ Form>
					</div>
				)
			}
		}

		return (
			<div>
				{ displayLogin(this.props.showLogin) }
			    { this.state.failed ? "login failed!" : "" }
			</div>
		);
	}
}


export default withFirebase(Login)
