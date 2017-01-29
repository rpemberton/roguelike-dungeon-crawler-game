import React from 'react';
import Stats from './Stats'
import Board from './Board';
import mapGenerator from './mapGenerator';
import './App.css';

class App extends React.Component {
  constructor() {
    const mapValues = mapGenerator();
    super();
    this.state = {
      floorMap: mapValues.floorMap,
      health: 100,
      weapon: 'Punch',
      xp: 10,
      attack: 25,
      pos: {
        y: mapValues.playerYX[0],
        x: mapValues.playerYX[1],
      },
      sprite: 'na',
    }
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handlePlayerMove);
  }

  handlePlayerMove = (e) => {
    let floorMap = JSON.parse(JSON.stringify(this.state.floorMap));
    let oldPos = JSON.parse(JSON.stringify(this.state.pos));
    let newPos = JSON.parse(JSON.stringify(this.state.pos));

    switch (e.keyCode) {
      case 65:
      case 37:
        newPos.x--;
        break;
      case 87:
      case 38:
        newPos.y--;
        break;
      case 68:
      case 39:
        newPos.x++;
        break;
      case 83:
      case 40:
        newPos.y++;
        break;
      default: break;
    }

    const newCell = floorMap[newPos.y][newPos.x];
    const oldCell = floorMap[oldPos.y][oldPos.x];

    if (newCell.type === 'health') {
      this.setState({
        health: this.state.health + newCell.value
      });
    }

    if (newCell.type === 'sprite') {
      newCell.health -= this.state.attack;
      this.setState({
        health: this.state.health - newCell.attack,
        sprite: newCell.health,
        floorMap: floorMap,
      });
      if (newCell.health !== 0) {
        return
      }
    }

    if (newCell.type !== 'wall') {
      newCell.type = 'player';
      oldCell.type = 'floor';

      this.setState({
        floorMap: floorMap,
        pos: newPos
      });
    }
  }

  render() {
    return(
      <div>
        <Stats 
          health={this.state.health} 
          weapon={this.state.weapon} 
          xp={this.state.xp} 
          sprite={this.state.sprite}
        />
        <Board floorMap={this.state.floorMap} />
      </div>
    )
  }
}

// prevent keyboard window scrolling
window.addEventListener("keydown", function(e) {
  if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
      e.preventDefault();
  }
}, false);


export default App;