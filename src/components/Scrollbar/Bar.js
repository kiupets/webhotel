import React, { useState, useContext, useEffect, useRef, useMemo } from 'react';
import Draggable from 'react-draggable';
// import { Draggable } from 'typescript-react-draggable';
import { Context as DatesContext } from '../../context/DatesContext';
import { Context as ThumbContext } from '../../context/ThumbContext';

import { Context } from '../../context/ThumbContext';
export const Bar = () => {
	const { state, thumbPosMsg } = useContext(Context);
	const { addIntervalMsg } = useContext(DatesContext);
	const { state: { width, thumbWidth }, initWidthPosMsg, thumbWidthMsg } = useContext(ThumbContext);
	const { pos } = state;
	const [ dragging, setDragging ] = useState(false);
	const [ onBarDown, setonBarDawn ] = useState(false);
	const [ onBarUp, setonBarUp ] = useState(false);

	const barRef = useRef(null);
	const thumbRef = useRef(null);

	// const [ width, setWidth ] = useState(0);
	const [ right, setRight ] = useState(false);
	// const [ thumWidth2, setThumbWidth ] = useState(0);

	const initPos = width / 2;

	useEffect(() => {
		if (barRef.current !== null && thumbRef.current !== null) {
			thumbWidthMsg(thumbRef.current.clientWidth);
			initWidthPosMsg(barRef.current.clientWidth);
			const handleResize = () => {
				if (barRef.current !== null) {
					const newWidth = barRef.current.clientWidth;
					initWidthPosMsg(newWidth);
				}
			};
			window.addEventListener('resize', handleResize);
			return () => window.removeEventListener('resize', handleResize);
		}
	}, []);

	useEffect(
		() => {
			thumbPosMsg(width / 2 - thumbWidth - 50);
		},
		[ width, thumbWidth ]
	);
	//@ts-ignore
	const handleDrag = (e, data) => {
		const right = data.x > data.lastX;

		// thumbPosMsg(data.x)
		right ? addIntervalMsg('+') : addIntervalMsg('-');
	};
	const handleStart = () => {
		setDragging(true);
	};
	const handleStop = () => {
		setDragging(false);
	};

	const BarStyles = {
		width: '100%',
		height: '20px',
		backgroundColor: 'orange',
		// borderRadius: '4px',
		display: 'flex',
		alignItems: 'center'
	};
	return (
		<div ref={barRef} style={BarStyles}>
			<Draggable
				// @ts-ignore-next-line
				offsetParent={barRef.current}
				// onMouseDown={handleMouseDown}
				axis="x"
				handle=".handle"
				// defaultPosition={{ x: initPos, y: 0 }}
				position={{ x: pos, y: 0 }}
				grid={[ 10, 10 ]}
				scale={1}
				bounds={{ left: 0, right: width - thumbWidth }}
				onStart={handleStart}
				onStop={handleStop}
				onDrag={handleDrag}
			>
				<div
					ref={thumbRef}
					style={{ zIndex: 10, width: '100px', height: '20px', backgroundColor: 'black' }}
					className="handle"
				/>
			</Draggable>
		</div>
	);
};
