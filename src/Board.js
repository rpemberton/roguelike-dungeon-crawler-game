import React from 'react';
import Row from './Row';

const Board = (props) => {
  if (props.gameOver) {
    return(
      <div className='board'>
        <h1 className='game-over-txt lose'>GAME OVER</h1>
        <button onClick={props.handleRestart}>RESTART</button>
      </div>
    )
  }

  if (props.spritesAlive < 1) {
    return(
      <div className='board'>
        <h1 className='game-over-txt win'>YOU WIN!</h1>
        <button onClick={props.handleRestart}>RESTART</button>
      </div>
    )
  }

  const y = props.playerYX.y;
  const black = {
    backgroundColor: 'black'
  };

  const rowsArr = props.floorMap.map((row, i) => {
    if (i > y - 5 && i < y + 5) {
      return <Row id={'r' + i} key={i} rowNumber={i} row={row} black={black} playerYX={props.playerYX}/>
    }
    return null
  })

  return(
    <div className='board'>
      {rowsArr}
    </div>
  )
}

export default Board;