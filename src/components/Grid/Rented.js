import React, { useState, useEffect, useContext, useId, useRef } from 'react';
import Draggable from 'react-draggable';
import { Context } from '../../context/IdContext';

export const Rented = ({
	w,
	className,
	rented,
	index,
	containerWidth,
	containerLeft,
	containerWidth2,
	containerLeft2,
	...props
}) => {
	const { state: { id }, idMsg } = useContext(Context);

	const [ width, setWidth ] = useState(0);

	const [ left, setLeft ] = useState(0);

	const rentedRef = useRef(null);
	useEffect(() => {
		if (rentedRef.current !== null) {
			const RR = rentedRef.current.getBoundingClientRect();
			const left = RR.left - containerLeft;
			setLeft(left);
			setWidth(containerWidth - left);
		}
	});
	// clip-path: polygon(15% 0, 87% 0, 100% 50%, 87% 100%, 15% 100%, 0% 50%);
	const nextId = useId();
	// setPos({ x: e.clientX, y: e.clientY })
	return (
		<Draggable grid={[ 100, 40 ]}>
			<div style={{ display: 'flex', boxSizing: 'border-box', paddingRight: '-2px', zIndex: 0 }}>
				<div
					style={{
						// width: 0,
						// height: 0,
						borderTop: '10px solid transparent',
						borderRight: '10px solid #5abe9d',
						borderBottom: '10px solid transparent'
					}}
				/>
				<div
					ref={rentedRef}
					key={id}
					onMouseOver={() => idMsg(rented)}
					onMouseOut={() => idMsg(false)}
					className={className}
					style={{
						display: 'flex',
						justifyContent: 'flex-start',
						cursor: 'pointer',
						// clipPath: `polygon(calc(0.5% - 0.1em) 0, calc(100% - 0.9em) 0, 100% 50%, calc(100% - 0.9em) 100%, calc(0.5% - 0.1em) 100%, 0% 50%)`,
						// clipPath: `polygon( 0% 0%, calc(100% - 0.4em) 0%, 100% 50%, calc(100% - 0.4em) 100%, 0% 100%)`,
						width: `${rented.width / 100 * (w * 2) - 21}px`
					}}
				>
					<div
						style={{
							width: `${width}px`,
							display: 'flex',
							justifyContent: 'center',
							// backgroundColor: 'orange',   ===
							boxSizing: 'border-box'
						}}
					>
						<div
							style={{
								paddingLeft: `${left < 0 ? -left : 0}px`,
								boxSizing: 'border-box'
							}}
						>
							{rented.name}
						</div>
					</div>
				</div>
				<div
					style={{
						// width: 0,
						// height: 0,
						borderTop: '10px solid transparent',
						borderLeft: '10px solid #5abe9d',
						borderBottom: '10px solid transparent'
					}}
				/>
			</div>
		</Draggable>
	);
};
