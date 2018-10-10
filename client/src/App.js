import React, { Component } from 'react';
import Globe from './components/Globe/Globe';
import './app.css';

class App extends Component {
	
  constructor(props) {
    super(props);
    this.state = {
      showLoginPanel: false,
      display: 'block'
    };
    this.toggleLoginPanel = this.toggleLoginPanel.bind(this);
  }
  
  toggleLoginPanel() {
	this.setState(state => ({ showLoginPanel: !state.showLoginPanel }));
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({
        display: 'none'
      })  
    }, 2000);   
}
	
  render() {
    return (
      <div className="globe">
        <Globe panelShown={this.state.showLoginPanel}/>
        <div className="content" style={{display: this.state.display}} onClick={this.toggleLoginPanel}>
          <h3>Data Visualization</h3>
          <h1>GLOBALLY</h1>
          <p>Visualizing data across the globe</p>
        </div>
      </div>
    );
  }
}

export default App;
