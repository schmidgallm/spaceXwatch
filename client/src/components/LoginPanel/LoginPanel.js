import React, { Component} from 'react';
import './LoginPanel.css';
import InputWrapper from './InputWrapper/InputWrapper';

class LoginPanel extends Component {
	
	/*constructor(props) {
		super(props)
	}*/
	
	render() {
		return (
				<div className={this.props.panelShown ? "login-panel login-panel__panelShown" : "login-panel"}>
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
				</div>
		);
	}
}


export default LoginPanel;