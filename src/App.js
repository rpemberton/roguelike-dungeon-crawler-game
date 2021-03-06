import React from 'react';
import Stats from './Stats'
import Board from './Board';
import {mapGenerator, addItem} from './utils';
import './App.css';

let temp = mapGenerator();
let mapValues = JSON.parse(JSON.stringify(temp));

class App extends React.Component {  
  constructor() {
    super();
    this.state = {
      floorMap: mapValues.floorMap,
      health: 100,
      weapon: 'knuckles',
      xp: 10,
      attack: 25,
      pos: {
        y: mapValues.playerYX[0],
        x: mapValues.playerYX[1],
      },
      enemy: null,
      gameOver: false,
      enemiesAlive: mapValues.enemiesTotal,
      gameComplete: false
    }
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
    const enemiesAlive = this.state.enemiesAlive;

    if (enemiesAlive === 0) {
      const boss = {
        type: 'enemy',
        name: 'boss',
        health: 300,
        attack: 35,
        xp: 0
      }
      floorMap = addItem(floorMap, boss, 1);
      this.setState({
        floorMap: floorMap,
        enemiesAlive: null
      })
      return
    }

    if (newCell.name === 'health') {
      this.setState({
        health: health + newCell.value < 100 ? health + newCell.value : 100
      });
    }

    if (newCell.type === 'weapon') {
      this.setState({
        weapon: newCell.name,
        attack: attack += newCell.damage
      });
    }

    if (newCell.type === 'enemy') {
      newCell.health -= Math.floor((Math.random() * (attack*1.4 - attack*0.6)) + attack*0.6);
      health -= Math.floor((Math.random() * (newCell.attack*1.4 - newCell.attack*0.6)) + newCell.attack*0.6);

      if (health <= 0) {
        this.setState({
          health: 0,
          gameOver: true
        });
        return
      }

      this.setState({
        health: health >= 0 ? health : 0,
        enemy: newCell.health > 0 ? newCell.health : null,
        floorMap: floorMap,
      });

      if (newCell.health > 0) {
        return
      } else {
        this.setState({
          xp: xp += newCell.xp,
          attack: attack += newCell.xp,
          enemiesAlive: enemiesAlive - 1
        });
      }
    }

    if (newCell.name === 'boss' && newCell.health < 1) {
      this.setState({
        gameComplete: true
      })
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

  handleRestart = () => {
    mapValues = mapGenerator();
    this.setState({
      floorMap: mapValues.floorMap,
      health: 100,
      weapon: 'knuckles',
      xp: 10,
      attack: 25,
      pos: {
        y: mapValues.playerYX[0],
        x: mapValues.playerYX[1],
      },
      enemy: null,
      gameOver: false,
      enemiesAlive: mapValues.enemiesTotal,
      gameComplete: false
    })
  }

  componentWillMount() {
    window.addEventListener('keydown', this.handlePlayerMove);
  }

  render() {
    return(
      <div className='container'>
        <div className='wrap'>
          <Stats 
            health={this.state.health} 
            weapon={this.state.weapon} 
            xp={this.state.xp} 
            enemy={this.state.enemy}
            attack={this.state.attack}
            enemiesAlive={this.state.enemiesAlive}
          />
          <Board 
            floorMap={this.state.floorMap}
            playerYX={this.state.pos}
            gameOver={this.state.gameOver}
            handleRestart={this.handleRestart}
            enemiesAlive={this.state.enemiesAlive}
            gameComplete={this.state.gameComplete}
          />
        </div>
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