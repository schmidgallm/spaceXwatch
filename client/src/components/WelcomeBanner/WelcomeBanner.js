import React from 'react';
import './WelcomeBanner.css';

// settimeout function to add fadeout css class after 7 seconds
setTimeout(() => {
	document.getElementById('content').classList.add('fadeOut');
}, 7000)

const WelcomeBanner = (props) => (
			<div id="content" className={props.panelShown ? "content content__panelShown" : "content"}>
				<h1>GLOBAL</h1>
				<h1>DATA</h1>
				<h1>VISUALIZATION</h1>
				<h1>GLOBAL</h1>
			</div>
);

export default WelcomeBanner;
