import React, { Component } from 'react';
import Globe from './components/Globe/Globe';
import Modal from './components/Modal/Modal';
import WelcomeBanner from './components/WelcomeBanner/WelcomeBanner';
import LoginButton from './components/LoginButton/LoginButton';
import CloseButton from './components/CloseButton/CloseButton';
import TopButton from './components/TopButton/TopButton';
import LoginPanel from './components/LoginPanel/LoginPanel';
import Section from './components/Section/Section';
import './app.css';
import API from './utils/API';


class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      showLoginPanel: false,
			display: 'block',
			modalState: {},
			loginValue: "Login / Register",
			user: false,
			controlPanel: false
		};
		

    this.toggleLoginPanel = this.toggleLoginPanel.bind(this);
  }
	
	sendModalState = (stateObject) => {
		this.setState({
			modalState: stateObject
		});
		console.log(this.state);
	}


  toggleLoginPanel() {
	  console.log("USER", this.state.user);
	  if(!this.state.user)
	  {
		this.setState(state => ({ showLoginPanel: !state.showLoginPanel }));
	  }
	  else
	  {
		this.setState(state => ({ controlPanel: !state.controlPanel }));  
	  }
  }
  
  closeMe = () =>
  {
	  this.setState({ modalState: {}});
  }

  // listen for click on button and hide content text
  hideText = () => {
    const btn = document.getElementsByClassName('login-button');
    btn.addEventListener('click', () => {
      document.getElementById('content').style.display = 'none';
    })
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        display: 'none'
      })  
    }, 2000);
	
	API.session().then(response => {
			if(response.data.username)
			{
				this.setState({
					loginValue: response.data.username,
					user: "true"
				}) 
				
				document.getElementById('content').style.display = "none";
			} 
        })
        .catch(err => {
          console.log(err);
        });
}
	
  render() {
    return (
      <div className="section_wrapper">
	    <div className="globe">
			<div className="logo">GDV</div>
			<Modal closeMe={this.closeMe} name={this.state.modalState.name} flightNumber={this.state.modalState.flightNumber} flightYear={this.state.modalState.flightYear} image={this.state.modalState.image} desc={this.state.modalState.desc}  />
			<Globe user={this.state.user} username={this.state.loginValue} controlPanel={this.state.controlPanel} panelShown={this.state.showLoginPanel} cbProp={this.sendModalState}/>
			<WelcomeBanner panelShown={this.state.showLoginPanel} cbProp={this.toggleLoginPanel}/>
			<LoginButton   panelShown={this.state.showLoginPanel} cbProp={this.toggleLoginPanel} value={this.state.loginValue}/>
			<TopButton />
			<CloseButton   panelShown={this.state.showLoginPanel} cbProp={this.toggleLoginPanel}/>
			<LoginPanel    panelShown={this.state.showLoginPanel}/>
		</div>
		<Section image="ace.jpg" title="Visual Data" details="Create points of interest using location data" direction="left"/>
		<Section image="spacex.jpg" title="SpaceX" details="View data from the SpaceX API" direction="right"/>
		<Section image="share.jpg" title="Collaboration" details="Share your data with the communitity" direction="left"/>
			<div id="footer">
					<div className="michael">
						<div className="card">
							<div className="img">
								<img src="spacex/images/michael" />
							</div>
							<div className="name">
								<h2>Michael Schmidgall</h2>
							</div>
							<div className="icons">
							<a href="https://github.com/schmidgallm"><i class="fab fa-github"></i></a>
							<a href="https://www.linkedin.com/in/michael-schmidgall/"><i class="fab fa-linkedin"></i></a>
							</div>
						</div>
					</div>
					<div className="steven">
						<div className="card">
							<div className="img">
								<img src="spacex/images/steven" />
							</div>
							<div className="name">
								<h2>Steven Passey</h2>
							</div>
							<div className="icons">
							<a href="https://github.com/stevenpassey"><i class="fab fa-github"></i></a>
							<a href="https://www.linkedin.com/in/stevenpassey/"><i class="fab fa-linkedin"></i></a>
							</div>
						</div>
					</div>
			</div>
		</div>
    );
  }
}

export default App;
