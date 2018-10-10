import React from "react";
import './CloseButton.css';

const CloseButton = (props) => (
  <button className={props.panelShown ? "close-button close-button__panelShown" : "close-button"} onClick={props.cbProp}>X</button>
);

export default CloseButton;