import React, { Component} from 'react';
import API from '../../utils/API';
import './LoginButton.css';


class LoginButton extends Component {

	componentDidMount()
	{
		API.session().then(response => {
			if(response.data.username)
			{
				this.value = response.data.username;
			}
			else
			{
				this.value = "Login / Register";
			}
				
              
        })
        .catch(err => {
          console.log(err);
        });
	}
	
	value = "";
	
	render(){
		return (
			<button className={this.props.panelShown ? "login-button login-button__panelShown" : "login-button"} onClick={this.props.cbProp}>{this.value}</button>
		);
	}
}


export default LoginButton;