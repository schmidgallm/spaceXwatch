import React from 'react';
import './WelcomeBanner.css';
import scrollTo from './scrollTo.js';

// settimeout function to add fadeout css class after 7 seconds
setTimeout(() => {
	//document.getElementById('content').style.translate = "true";
}, 7000)

const WelcomeBanner = (props) => (
			<div id="content" data-hide="false" className={props.panelShown ? "content content__panelShown" : "content"}>
				<h1>GLOBAL DATA</h1>
				<h3>Ready to start adding your data?</h3>
				<button onClick={props.cbProp}>Sign Up</button>
				<p></p>
				<br />
				<hr />
				<span className="content-line-label">Returning User?</span>
				<button onClick={props.cbProp}>Sign In</button>
				<p></p>
				<br />
				<button onClick={callScroll}>Learn More</button>
			</div>
);

function callScroll()
{
	scrollTo(window.innerHeight + 100, 1000);
}



export default WelcomeBanner;
