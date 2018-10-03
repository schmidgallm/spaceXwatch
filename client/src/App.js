import React, { Component } from 'react';
import Globe from './components/Globe/Globe';
import './app.css';

class App extends Component {
  render() {
    return (
      <div>
        <Globe />
        <div className="content">
          <h3>Data Visualization</h3>
          <h1>GLOBALLY</h1>
          <p>Visualizing data across the globe</p>
        </div>
      </div>
    );
  }
}

export default App;
