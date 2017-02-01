import React from 'react';
import Stats from './Stats'
import Board from './Board';
import mapGenerator from './mapGenerator';
import './App.css';

//const audio = new Audio("http://zeldauniverse.s3.amazonaws.com/soundtracks/alinktothepastost/dark_world_dungeon.mp3");
let mapValues = mapGenerator();

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
      sprite: 'na',
      gameOver: false,
      spritesAlive: 20
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
    const spritesAlive = this.state.spritesAlive;

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

    if (newCell.type === 'sprite') {
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
        sprite: newCell.health > 0 ? newCell.health : 'dead',
        floorMap: floorMap,
      });

      if (newCell.health > 0) {
        return
      } else {
        this.setState({
          xp: xp += newCell.xp,
          attack: attack += newCell.xp,
          spritesAlive: spritesAlive - 1
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
      sprite: 'na',
      gameOver: false,
      spritesAlive: 20
    })
  }

  componentWillMount() {
    //audio.play();
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
            sprite={this.state.sprite}
            attack={this.state.attack}
          />
          <Board 
            floorMap={this.state.floorMap} 
            playerYX={this.state.pos}
            gameOver={this.state.gameOver}
            handleRestart={this.handleRestart}
            spritesAlive={this.state.spritesAlive}
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