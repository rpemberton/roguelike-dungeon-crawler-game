import React from 'react';
import Cell from './Cell';

const Row = (props) => {
  const x = props.playerYX.x;
  const y = props.playerYX.y;

  const cells = props.row.map((cell, i) => {

    if (i > x - 5 && i < x + 5) {

      if ((props.rowNumber === y - 4 || props.rowNumber === y + 4) && i !== x) {
        return <Cell id={'c' + i} key={i} cell={cell} fog={true} />
      }

      if ((props.rowNumber === y - 3 || props.rowNumber === y + 3) && (i < x - 1 || i > x + 1)) {
        return <Cell id={'c' + i} key={i} cell={cell} fog={true} />
      }

      if ((props.rowNumber === y - 2 || props.rowNumber === y + 2) && (i < x - 2 || i > x + 2)) {
        return <Cell id={'c' + i} key={i} cell={cell} fog={true} />
      }

      if ((props.rowNumber === y - 1 || props.rowNumber === y + 1)  && (i < x - 3 || i > x + 3)) {
        return <Cell id={'c' + i} key={i} cell={cell} fog={true} />
      }

      return <Cell id={'c' + i} key={i} cell={cell} />
    }

    return null;
  })

  return(
    <div id={props.id} className="row">
      {cells}
    </div>
  )
}

export default Row;