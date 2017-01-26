import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  render() {
    const cells = this.props.row.map((cell, i) => {
      return <Cell id={'c' + i} key={i} cell={cell} />
    })
    return(
      <div id={this.props.id} className="row">
        {cells}
      </div>
    )
  }
}

export default Row;