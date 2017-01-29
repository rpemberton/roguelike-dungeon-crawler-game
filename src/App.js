import React from 'react';
import Board from './Board';
import mapGenerator from './mapGenerator';
import './App.css';

// prevent keyboard window scrolling
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);

const mapValues = mapGenerator();

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      floorMap: mapValues.floorMap,
      playerYX: {
        y: mapValues.playerYX[0],
        x: mapValues.playerYX[1]
      }
    }
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleCharacterMove);
  }

  handleCharacterMove = (e) => {
    let floorMap = JSON.parse(JSON.stringify(this.state.floorMap));
    let oldPos = JSON.parse(JSON.stringify(this.state.playerYX));
    let newPos = {
      y: 0,
      x: 0
    }

    switch (e.key) {
      case 'w':
        newPos = {
          y: oldPos.y - 1, 
          x: oldPos.x
        };
        break;
      case 'a':
        newPos = {
          y: oldPos.y,
          x: oldPos.x - 1
        };
        break;
      case 's':
        newPos = {
          y: oldPos.y + 1,
          x: oldPos.x
        };
        break;
      case 'd':
        newPos = {
          y: oldPos.y,
          x: oldPos.x + 1
        };
        break
      default: break;
    }

    if (floorMap[newPos.y][newPos.x] !== 0) {
      floorMap[newPos.y][newPos.x] = 5;
      floorMap[oldPos.y][oldPos.x] = 1;

      this.setState({
        floorMap: floorMap,
        playerYX: newPos
      });
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