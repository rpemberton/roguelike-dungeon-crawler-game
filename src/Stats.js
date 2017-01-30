import React from 'react';

const Stats = (props) => {

  if (!props.gameOver) {
    return(
      <div className='stats'>
        Health: {props.health}<br/>
        Weapon: {props.weapon}<br/>
        XP: {props.xp}<br/>
        Sprite Health: {props.sprite}<br/>
        Attack: {props.attack}
      </div>
    )
  } else {
    return(
      <div className='stats'>
        <div>GAME OVER</div>
        <button>RESTART</button>
      </div>
    )
  }
}

export default Stats;