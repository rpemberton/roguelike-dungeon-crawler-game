import React from 'react';

class Cell extends React.Component {
  render() {
  	let cellType = this.props.cell.type;
    if (this.props.cell.type !== 'wall') {
      cellType = 'floor ' + this.props.cell.name;
    }
    return(
      <div id={this.props.id} className={'cell ' + cellType}></div>
    )
  }
}

export default Cell;