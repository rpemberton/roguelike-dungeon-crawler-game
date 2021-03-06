import React from 'react';

const Cell = (props) => {
	let cellType = props.cell.type;
  if (props.cell.type !== 'wall') {
    cellType = 'floor ' + props.cell.name;
  }
  if (props.fog) {
    cellType = 'fog';
  }

  return(
    <div id={props.id} className={'cell ' + cellType}></div>
  )
}

export default Cell;