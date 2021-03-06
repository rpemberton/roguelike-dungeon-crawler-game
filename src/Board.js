import React from 'react';
import Row from './Row';

const Board = (props) => {
  if (props.gameOver) {
    return(
      <div className='board'>
        <h1 className='game-over-txt lose'>YOU DIED</h1>
        <button onClick={props.handleRestart}>NEW GAME</button>
      </div>
    )
  }

  if (props.gameComplete) {
    return(
      <div className='board'>
        <h1 className='game-over-txt win'>YOU WIN!</h1>
        <button onClick={props.handleRestart}>NEW GAME</button>
      </div>
    )
  }

  const y = props.playerYX.y;

  const rowsArr = props.floorMap.map((row, i) => {
    if (i > y - 5 && i < y + 5) {
      return <Row id={'r' + i} key={i} rowNumber={i} row={row} playerYX={props.playerYX}/>
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