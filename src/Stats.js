import React from 'react';

const Stats = (props) => {
  return(
    <div className='stats'>
      <h1 className='title-txt'>DUNGEON CRAWLER</h1>
      Health: {props.health}<br/>
      Weapon: {props.weapon}<br/>
      Skill: {props.xp}<br/>
      Sprite Health: {props.sprite}<br/>
    </div>
  )
}

export default Stats;