import React from 'react';
import Row from './Row';

class Board extends React.Component {
  render() {

    const rows = 50;
    const padding = 10;

    const y = this.props.playerYX.y;

    const rowsArr = this.props.floorMap.map((row, i) => {
      if (y >= padding && y <= rows - padding + 1) {
        if (i > y - padding && i < y + padding) {
          return <Row id={'r' + i} key={i} row={row} playerYX={this.props.playerYX}/>
        }
      }

      if (y < padding) {
        if (i < padding * 2 - 1) {
          return <Row id={'r' + i} key={i} row={row} playerYX={this.props.playerYX}/>
        }
      }

      if (y > rows - padding) {
        if (i > rows - padding * 2) {
          return <Row id={'r' + i} key={i} row={row} playerYX={this.props.playerYX}/>
        }
      }
      return null
    })

    return(
      <div className='board'>
        {rowsArr}
      </div>
    )
  }
}

export default Board;