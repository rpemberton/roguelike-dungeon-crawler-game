import React from 'react';

const Cell = (props) => {
	let cellType = props.cell.type;
  if (props.cell.type !== 'wall') {
    cellType = 'floor ' + props.cell.name;
  }
  if (props.black) {
    cellType = props.black;
  }

  return(
    <div id={props.id} className={'cell ' + cellType}></div>
  )
}

export default Cell;