import React, { Component} from 'react';
import './LoginPanel.css';
import InputWrapper from './InputWrapper/InputWrapper';
import API from '../../utils/API';

class LoginPanel extends Component {
	
	constructor(props) {
		super(props);

		this.state = {
			signUpUser: '',
			signUpPassword: '',
			signUpEmail: ''
		}
	}

	handleInputChange = (value, title) => {
		switch(title){
			case 'Username':
			this.setState({
				signUpUser: value
			})
			break;
			case 'Email':
			this.setState({
				signUpEmail: value
			})
			break;
			case 'Password':
			this.setState({
				signUpPassword: value
			})
			break;
		}
	}

	postSignUp = () => {
		
	}
	
	
	render() {
		return (
				<div className={this.props.panelShown ? "login-panel login-panel__panelShown" : "login-panel"}>
					<br />
					<div className="panel-title">
						Login
					</div>
					<InputWrapper type="text" title="Username" cbInput={this.handleInputChange}/>
					<InputWrapper type="password" title="Password" cbInput={this.handleInputChange}/>
					<br />
					<div className="panel-title">
						Sign Up
					</div>
					<InputWrapper type="text" title="Email&nbsp; &nbsp;" cbInput={this.handleInputChange}/>
					<InputWrapper type="text" title="Username" cbInput={this.handleInputChange}/>
					<InputWrapper type="password" title="Password" cbInput={this.handleInputChange}/>
					<button type="submit" onClick={this.postSignUp}>Sign Up</button>
				</div>
		);
	}
}


export default LoginPanel;