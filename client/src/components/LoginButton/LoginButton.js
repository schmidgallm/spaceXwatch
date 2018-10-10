import React from "react";
import './LoginButton.css';

const LoginButton = (props) => (
  <button className={props.panelShown ? "login-button login-button__panelShown" : "login-button"} onClick={props.cbProp}>Login / Register</button>
);

export default LoginButton;