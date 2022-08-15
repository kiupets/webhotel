import React, { useContext, useEffect, useState, useRef } from 'react';
import { Bar } from './Bar';
import { Context } from '../../context/ThumbContext';
import { Context as DatesContext } from '../../context/DatesContext';
import { Context as ThumbContext } from '../../context/ThumbContext';

export const ScrollBar = () => {
	const intervalRef = useRef(null);

	const { state: { width, thumbWidth }, initWidthPosMsg } = useContext(ThumbContext);

	const [ counter, setCounter ] = useState(0);
	const [ counter2, setCounter2 ] = useState(0);
	const [ bmDown, setbmDown ] = useState(false);

	const { addIntervalMsg } = useContext(DatesContext);

	const { state, thumbPosMsg } = useContext(Context);
	const { pos } = state;

	useEffect(
		() => {
			addIntervalMsg('+');
			thumbPosMsg(pos + 1);
		},
		[ counter ]
	);
	useEffect(
		() => {
			addIntervalMsg('-');
			thumbPosMsg(pos - 1);
		},
		[ counter2 ]
	);

	const startCounter = () => {
		addIntervalMsg('+');
		// setbmDown(true);
		if (intervalRef.current) return;
		intervalRef.current = setInterval(() => {
			setCounter((pos) => pos + 1);
		}, 100);
	};
	const stopCounter = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const startCounter2 = () => {
		addIntervalMsg('-');
		// setbmDown(true);
		if (intervalRef.current) return;
		intervalRef.current = setInterval(() => {
			setCounter2((pos) => pos + 1);
		}, 100);
	};
	const stopCounter2 = () => {
		if (intervalRef.current) {
			clearInterval(intervalRef.current);
			intervalRef.current = null;
		}
	};

	const mouseEnter = () => {
		// setbmDown(false);
	};
	const mouseLeave = () => {
		thumbPosMsg(width / 2 - thumbWidth - 50);
	};

	return (
		<div style={{ display: 'flex', width: '100%', justifyContent: 'center' }}>
			<div
				style={{
					height: '20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'grey'
				}}
				onMouseDown={startCounter}
				onMouseUp={stopCounter2}
				onMouseEnter={mouseEnter}
				onMouseLeave={mouseLeave}
			>
				<button>-</button>
			</div>
			<Bar />
			<div
				style={{
					height: '20px',
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: 'grey'
				}}
				onMouseDown={startCounter2}
				onMouseUp={stopCounter}
				onMouseEnter={mouseEnter}
				onMouseLeave={mouseLeave}
			>
				<button>+</button>
			</div>
		</div>
	);
};
