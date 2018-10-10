import React from 'react';

const InputWrapper = (props) => (
			<div className="input-wrapper">
				<input type={props.type} placeholder={props.title} />
				<div className="input-placeholder-flyout">{props.title}</div>
			</div>
);

export default InputWrapper;