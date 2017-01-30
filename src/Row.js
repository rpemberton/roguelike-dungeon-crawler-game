import React from 'react';
import Cell from './Cell';

class Row extends React.Component {
  render() {

    const cols = 50;
    const padding = 10;

    const x = this.props.playerYX.x;

    const cells = this.props.row.map((cell, i) => {
      if (x >= padding && x <= cols - padding + 1) {
        if (i > x - padding && i < x + padding) {
          return <Cell id={'c' + i} key={i} cell={cell} />
        }
      }

      if (x < padding) {
        if (i < padding * 2 - 1) {
          return <Cell id={'c' + i} key={i} cell={cell} />
        }
      }

      if (x > cols - padding) {
        if (i > cols - padding * 2) {
          return <Cell id={'c' + i} key={i} cell={cell} />
        }
      }
      return null
    })

    return(
      <div id={this.props.id} className="row">
        {cells}
      </div>
    )
  }
}

export default Row;