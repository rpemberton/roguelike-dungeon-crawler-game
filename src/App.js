import React from 'react';
import Board from './Board';
import mapGenerator from './mapGenerator';
import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      floorMap: mapGenerator()
    }
  }

  render() {
    return(
      <div>
        <Board floorMap={this.state.floorMap} />
      </div>
    )
  }
}

export default App;