import React from 'react';

const WelcomeBanner = (props) => (
			<div className={props.panelShown ? "content content__panelShown" : "content"}>
				<h1>GLOBAL</h1>
				<h1>DATA</h1>
				<h1>VISUALIZATION</h1>
				<h1>GLOBAL</h1>
			</div>
);

export default WelcomeBanner;
