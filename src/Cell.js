import React from 'react';

class Cell extends React.Component {
  render() {
  	let cellType = '';

  	switch(this.props.cell) {
  		case 1:
  			cellType = 'floor'
  			break;
  		case 2:
  			cellType = 'floor sprite'
  			break;
  		case 3:
  			cellType = 'floor health'
  			break;
  		case 4:
  			cellType = 'floor weapon'
  			break;
  		case 5:
  			cellType = 'floor player'
  			break;
  		default: 
  			cellType = 'wall'
  	}
    return(
      <div id={this.props.id} className={'cell ' + cellType}></div>
    )
  }
}

export default Cell;