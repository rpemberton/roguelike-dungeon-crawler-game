import React from 'react';
import Board from './components/Board';
import './App.css';

const mapWidth = 50;
const mapHeight = 50;
const wall = 0;
const floor = 1;

function addRoom(board) {
    const minLength = 3;
    const maxLength = 9;

    const randY = Math.floor(Math.random() * 50);
    const randX = Math.floor(Math.random() * 50);
    
    const randHeight = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;
    const randWidth = Math.floor(Math.random() * (maxLength - minLength + 1)) + minLength;

    let tempBoard = JSON.parse(JSON.stringify(board));
    let check = true;

    for (let i = randY; i < randY + randHeight; i++) {
      for (let j = randX; j < randX + randWidth; j++) {
        if (i < mapHeight && tempBoard[i][j] === wall) {
          tempBoard[i][j] = floor;
        } else {
          check = false;
        }
      }
    }

    if (check) {return tempBoard}
}

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
    let board = [];

    // create blank board
    for (let i = 0; i < mapHeight; i++) {
      board.push(Array(mapWidth).fill(wall));
    }

    // create left and right borders
    for (let i = 0; i < mapHeight; i++) {
      board[i][0] = 1;
      board[i][mapWidth - 1] = 1;
    }

    // create top and bottom borders
    for (let i = 0; i < mapWidth; i++) {
      board[0][i] = 1;
      board[mapHeight - 1][i] = 1;
    }

    let newRoom = false;

    while (!newRoom) {
      newRoom = addRoom(board);
    }

    this.setState({
      board: newRoom
    });
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
