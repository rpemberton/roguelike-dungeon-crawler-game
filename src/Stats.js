import React from 'react';

const Stats = (props) => {
  return(
    <div className='stats'>
      <h1 className='title-txt'>DUNGEON CRAWLER</h1>
      <p>Use arrow keys or WASD to move. Move into a monster to attack it. Kill all monsters to win.</p>
      <p>
      Health: {props.health}<br/>
      Skill: {props.xp}<br/>
      Weapon: {props.weapon}<br/>
      Monster Health: {props.enemy}
      </p>
      {!props.enemiesAlive && <p className='lastChallenge'>Find and kill the boss!</p>}
    </div>
  )
}

export default Stats;