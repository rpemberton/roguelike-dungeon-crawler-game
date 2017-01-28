import React from 'react';
import Row from './Row';

class Board extends React.Component {
  render() {
    const rows = this.props.floorMap.map((row, i) => {
      return <Row id={'r' + i} key={i} row={row} />
    })
    return(
      <div className='container'>
        {rows}
      </div>
    )
  }
}

export default Board;