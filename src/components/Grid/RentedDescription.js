import React, { useState, useContext } from 'react';
import { useSpring, animated } from 'react-spring';
import { Context as IdContext } from '../../context/IdContext';
import { Rented } from './Rented';
import { DescDetail } from './DescDetail';
export const RentedDescription = ({ pos }) => {
	const { state: { id } } = useContext(IdContext);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'flex-start',
				alignItems: 'flex-start',
				cursor: 'pointer',
				zIndex: 50,
				position: 'absolute',
				left: `${pos.x - 50}px`,
				top: `${pos.y + 50}px`,
				backgroundColor: 'orange',
				width: '30%',
				height: '30%',
				color: 'white'
			}}
		>
			<DescDetail name={id.name} phone={id.phone} email={id.email} end={id.end} start={id.start} room={id.room} />
		</div>
	);
};

// {id.name}
// {id.phone}
// {id.email}
// {id.end}
// {id.start}
// {id.room}
