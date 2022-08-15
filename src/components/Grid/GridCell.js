import React, { useId, useContext, useState, useRef } from 'react';
import { Context as IdContext } from '../../context/IdContext';

import './Grid.css';

import { Rented } from './Rented';
export const GridCell = ({
	reference,
	rented,
	className,
	index,
	w,
	onDClick,
	containerWidth,
	containerLeft,
	containerWidth2,
	containerLeft2
}) => {
	const { state: { id }, idMsg } = useContext(IdContext);

	return index !== 13 ? (
		<div onDoubleClick={onDClick} ref={reference} className={className}>
			{rented ? (
				<Rented
					containerLeft={containerLeft}
					containerWidth={containerWidth}
					containerLeft2={containerLeft2}
					containerWidth2={containerWidth2}
					index={index}
					id={rented.id}
					className={'draggable '}
					w={w}
					rented={rented}
				/>
			) : null}
		</div>
	) : (
		<div ref={reference} className="grid1" />
	);
};
