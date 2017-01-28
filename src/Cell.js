import React from 'react';

const wall = 0;

class Cell extends React.Component {
  render() {
    const cellType = this.props.cell === wall ? 'wall' : 'floor';
    return(
      <div id={this.props.id} className={'cell ' + cellType}></div>
    )
  }
}

export default Cell;