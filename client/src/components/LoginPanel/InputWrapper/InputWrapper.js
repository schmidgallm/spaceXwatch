import React from 'react';

class InputWrapper extends React.Component {

	constructor(props) {
		super(props);
	}

	handleInputChange = (value) => {
		this.props.cbInput(value, this.props.title);

	}
	

	render(){
		return (
		<div className="input-wrapper">
			<input type={this.props.type} placeholder={this.props.title} onInput={this.props.cbInput} />
			<div className="input-placeholder-flyout">{this.props.title}</div>
		</div>
		)
	}
};

export default InputWrapper;