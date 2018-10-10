import React, { Component } from 'react';
import Globe from './components/Globe/Globe';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';
import LoginButton from './components/LoginButton/LoginButton';
import CloseButton from './components/CloseButton/CloseButton';
import TopButton from './components/TopButton/TopButton';
import LoginPanel from './components/LoginPanel/LoginPanel';
import Section from './components/Section/Section';
import './app.css';

class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {showLoginPanel: false};
	this.toggleLoginPanel = this.toggleLoginPanel.bind(this);
  }
  
  toggleLoginPanel() {
	this.setState(state => ({ showLoginPanel: !state.showLoginPanel }));
  }
	
  render() {
    return (
      <div className="section_wrapper">
	    <div className="globe">
			<div className="logo">GDV</div>
			<Globe 		   panelShown={this.state.showLoginPanel}/>
			<WelcomeBanner panelShown={this.state.showLoginPanel}/>
			<LoginButton   panelShown={this.state.showLoginPanel} cbProp={this.toggleLoginPanel}/>
			<TopButton />
			<CloseButton   panelShown={this.state.showLoginPanel} cbProp={this.toggleLoginPanel}/>
			<LoginPanel    panelShown={this.state.showLoginPanel}/>
		</div>
		<Section image="ace.jpg" title="Visual Data" details="Create points of interest using location data" direction="left"/>
		<Section image="spacex.jpg" title="SpaceX" details="View data from the SpaceX API" direction="right"/>
		<Section image="share.jpg" title="Collaboration" details="Share your data with the communitity" direction="left"/>
		<div id="footer">
			<div className="footer-flexbox">
			  <div className="footer-sidebar">
				 Github
				<ul>
				  <li>
					<a href="https://github.com/stevenpassey" target="_blank" rel="noopener noreferrer">
						github.com/stevenpassey
					</a>
				  </li>
				  <li>
					<a href="https://github.com/schmidgallm" target="_blank" rel="noopener noreferrer">
						github.com/schmidgallm
					</a>
				  </li>
				</ul>  
			  </div>
			  <div className="footer-main">
				 Linkedin
				<ul>
				  <li>
					<a href="https://www.linkedin.com/in/stevenpassey/" target="_blank" rel="noopener noreferrer">
						linkedin.com/in/stevenpassey
					</a>
				  </li>
				  <li>
					<a href="https://www.linkedin.com/in/michael-schmidgall/" target="_blank" rel="noopener noreferrer">
						linkedin.com/in/michael-schmidgall
					</a>
				  </li>
				</ul>  
			  </div>  
			</div>
		</div>
	  </div>
    );
  }
}

export default App;
