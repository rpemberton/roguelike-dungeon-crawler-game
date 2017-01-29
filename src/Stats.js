import React from 'react';

const Stats = (props) => {
	return(
		<div className='stats'>
			Health: {props.health}<br/>
      Weapon: {props.weapon}<br/>
      XP: {props.xp}<br/>
      Sprite Health: {props.sprite}
		</div>
	)
}

export default Stats;