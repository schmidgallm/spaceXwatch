import React, { Component } from 'react';
import Globe from './components/Globe/Globe';
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
      <div className="globe">
        <Globe panelShown={this.state.showLoginPanel}/>
        <div className="content" onClick={this.toggleLoginPanel}>
          <h3>Data Visualization</h3>
          <h1>GLOBALLY</h1>
          <p>Visualizing data across the globe</p>
        </div>
      </div>
    );
  }
}

export default App;
