import React from 'react';

const wall = 0;

class Cell extends React.Component {
  render() {
    if (this.props.cell === wall) {
      return <div id={this.props.id} className="cell wall"></div>
    } else {
      return <div id={this.props.id} className="cell floor"></div>
    }
  }
}

export default Cell;