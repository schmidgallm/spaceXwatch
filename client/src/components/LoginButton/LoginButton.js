import React, { Component} from 'react';
import './LoginButton.css';


class LoginButton extends Component {
	
	render(){
		return (
			<button className={this.props.panelShown ? "login-button login-button__panelShown" : "login-button"} onClick={this.props.cbProp}>{this.props.value}</button>
		);
	}
}


export default LoginButton;