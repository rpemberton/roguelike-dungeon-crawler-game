import React from 'react';
import Board from './Board';
import './App.css';

const mapWidth = 100;
const mapHeight = 100;
const wall = 0;
const floor = 1;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      board: []
    }
  }
  
  componentDidMount() {
    this.boardGenerator();
  }

  boardGenerator() {
    // create blank board
    let board = [];
    for (let i = 0; i < mapHeight; i++) {
      board.push(Array(mapWidth).fill(wall));
    }

    let newRoom = false;
    while (!newRoom) {
      newRoom = this.addRoom(board);
    }

    this.setState({
      board: newRoom
    });
  }

  addRoom(board) {
    const minLength = 7;
    const maxLength = 12;

    const randY = Math.floor(Math.random() * mapHeight);
    const randX = Math.floor(Math.random() * mapWidth);

    //const randY = 40;
    //const randX = 40;
    
    const randHeight = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randWidth = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let tempBoard = JSON.parse(JSON.stringify(board));

    // check not outside top or bottom of map
    if (randY < 1 || randY + randHeight > mapHeight - 1) {
      return false;
    }

    // check not outside left or right of map
    if (randX < 1 || randX + randWidth > mapWidth - 1) {
      return false;
    }

    // check margin around room
    for (let i = randY - 1; i < randY + randHeight + 1; i++) {
      for (let j = randX - 1; j < randX + randWidth + 1; j++) {
        if (tempBoard[i][j] === floor) {
          return false;
        }
      }
    }

    // add room to map
    for (let i = randY; i < randY + randHeight; i++) {
      for (let j = randX; j < randX + randWidth; j++) {
        tempBoard[i][j] = floor;
      }
    }

    return tempBoard;
  }

  render() {
    return(
      <div>
        <Board board={this.state.board} />
      </div>
    )
  }
}

export default App;
