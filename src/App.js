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
      gameOver: false
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
    let health = this.state.health;
    let attack = this.state.attack;
    let xp = this.state.xp;

    if (newCell.name === 'health') {
      this.setState({
        health: health + newCell.value
      });
    }

    if (newCell.type === 'weapon') {
      this.setState({
        weapon: newCell.name,
        attack: attack += newCell.damage
      });
    }

    if (newCell.type === 'sprite') {
      newCell.health -= attack;
      health -= newCell.attack;

      if (health <= 0) {
        this.setState({
          health: 0,
          gameOver: true
        });

        this.handleGameOver();
        return
      }

      this.setState({
        health: health >= 0 ? health : 0,
        sprite: newCell.health > 0 ? newCell.health : 'dead',
        floorMap: floorMap,
      });

      if (newCell.health > 0) {
        return
      } else {
        this.setState({
          xp: xp += newCell.xp,
          attack: attack += newCell.xp
        });
      }
    }

    if (newCell.name !== 'wall') {
      newCell.type = 'player';
      newCell.name = 'player';
      oldCell.type = 'floor';
      oldCell.name = 'floor';
      this.setState({
        floorMap: floorMap,
        pos: newPos
      });
    }
  }

  handleGameOver = () => {
    console.log('game over')
  }

  render() {
    return(
      <div className='container'>
        <Stats 
          health={this.state.health} 
          weapon={this.state.weapon} 
          xp={this.state.xp} 
          sprite={this.state.sprite}
          attack={this.state.attack}
          gameOver={this.state.gameOver}
        />
        <Board 
          floorMap={this.state.floorMap} 
          playerYX={this.state.pos}
        />
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