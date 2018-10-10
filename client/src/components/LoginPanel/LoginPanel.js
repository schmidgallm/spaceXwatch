import React, { Component} from 'react';
import './LoginPanel.css';
import InputWrapper from './InputWrapper/InputWrapper';
import API from '../../utils/API';

class LoginPanel extends Component {
	
	constructor(props) {
		super(props);
		
		this.myRef = React.createRef();
	}
	
	submitForm2 = () =>
	{
		let myInputs = this.myRef.current.getElementsByTagName("input");
		
		const data = {
			username: myInputs[3].value,
			password: myInputs[4].value,
			email: myInputs[2].value,
		}
		
		API.signUp(data)
        .then( res => {
          window.location.reload();
        })
        .catch( err => {
          console.log(err);
        })
	}
	
	render() {
		return (
				<div className={this.props.panelShown ? "login-panel login-panel__panelShown" : "login-panel"} ref={this.myRef}>
					<br />
					<div className="panel-title">
						Login
					</div>
					<InputWrapper type="text" title="Username"/>
					<InputWrapper type="password" title="Password"/>
					<br />
					<div className="panel-title">
						Sign Up
					</div>
					<InputWrapper type="text" title="Email&nbsp; &nbsp;"/>
					<InputWrapper type="text" title="Username"/>
					<InputWrapper type="password" title="Password"/>
					<button onClick={this.submitForm2}>Sign Up</button>
				</div>
		);
	}
}


export default LoginPanel;