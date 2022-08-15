import React, { useContext, useEffect, useMemo, useState, useRef } from 'react';
import { Context } from '../../context/DatesContext';
import { Context as FormContext } from '../../context/FormContext';
import { FormContainer } from '../Form/FormContainer';
import { Context as IdContext } from '../../context/IdContext';
import { GridCell } from './GridCell';

import './Grid.css';
import { MonthRef2 } from './MonthRef2';
import { Rented } from './Rented';

import { RentedDescription } from './RentedDescription';
import { subDays } from 'date-fns';
import zIndex from '@mui/material/styles/zIndex';

export const Grid = () => {
	const rentedRef = useRef(null);
	const containerRef = useRef(null);
	const containerRef2 = useRef(null);
	const [ w, setW ] = useState(0);
	const [ containerWidth, setContainerWidth ] = useState(0);
	const [ containerLeft, setContainerLeft ] = useState(0);

	const [ containerWidth2, setContainerWidth2 ] = useState(0);
	const [ containerLeft2, setContainerLeft2 ] = useState(0);

	useEffect(() => {
		if (containerRef.current !== null && containerRef2.current !== null) {
			// console.log(containerRef.current.getBoundingClientRect());
			setContainerWidth(containerRef.current.getBoundingClientRect().width);
			setContainerLeft(containerRef.current.getBoundingClientRect().left);
			setContainerWidth2(containerRef2.current.getBoundingClientRect().width);
			setContainerLeft2(containerRef2.current.getBoundingClientRect().left);
		}
	}, []);
	// console.log('containerWidth', containerWidth);
	useEffect(() => {
		if (rentedRef.current !== null) setW(rentedRef.current.getBoundingClientRect().width);
	}, []);
	useEffect(() => {
		const onResize = (e) => {
			setW(rentedRef.current.getBoundingClientRect().width);
			setContainerWidth(containerRef.current.getBoundingClientRect().width);
			setContainerLeft(containerRef.current.getBoundingClientRect().left);
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
		};
	}, []);

	const { state } = useContext(Context);
	const { calendar, hotelRooms } = state;
	const { intervalData, intervalMonth, intervalRentedArray } = calendar;
	const { showFormMsg } = useContext(FormContext);

	const showFormHandler = (date, room) => {
		showFormMsg(true, date, room);
	};

	const { state: { id }, idMsg } = useContext(IdContext);

	const [ pos, setPos ] = useState({ x: 0, y: 0 });
	const handlePos = (e) => {
		e.preventDefault();

		setPos({ x: e.clientX, y: e.clientY });
	};

	const grid = hotelRooms.map((room, r) => {
		return intervalData.slice(0, 14).map((day, i) => {
			const rented = intervalRentedArray.find((rented) => {
				return day.date === rented.start && rented.room === r;
			});
			return (
				<GridCell
					containerLeft={containerLeft}
					containerWidth={containerWidth}
					rented={rented}
					index={i}
					reference={rentedRef}
					className="grid-item-rooms grid1"
					w={w}
					onDClick={() => showFormHandler(subDays(day.formDate, 1), r)}
				/>
			);
		});
	});
	const grid2 = hotelRooms.map((room, r) => {
		return intervalData.slice(13, 120).map((day) => {
			const rented = intervalRentedArray.find((rented) => {
				return day.date === rented.start && rented.room === r;
			});

			return (
				<div className="grid-item-rooms grid2" onDoubleClick={(e) => showFormHandler((day.formDate, r), r)}>
					{/* {day.day} */}
					{rented ? (
						<Rented
							containerLeft={containerLeft}
							containerWidth={containerWidth}
							id={rented.id}
							className={'draggable2'}
							w={w}
							rented={rented}
						/>
					) : null}
				</div>
			);
		});
	});

	const superMonths = useMemo(
		() => {
			return intervalMonth.slice(0, 13).map((day, i) => {
				return (
					<div className="grid-item-rooms supermonth">
						{day.lastDay ? (
							<div className="lastday" style={{ width: `${day.width * (w * 2)}px` }}>
								<MonthRef2 w={w * 2} label={day.month} />
							</div>
						) : null}
					</div>
				);
			});
		},
		[ intervalMonth ]
	);
	const superMonths2 = useMemo(
		() => {
			return intervalMonth.slice(13, 118).map((day, i) => {
				return (
					<div className="grid-item-rooms supermonth">
						{day.lastDay ? (
							<div className="lastday" style={{ width: `${day.width * (w * 2)}px` }}>
								<MonthRef2 w={w * 2} label={day.month} />
								{/* </div> */}
							</div>
						) : null}
					</div>
				);
			});
		},
		[ intervalMonth ]
	);

	const monthDays = intervalData.slice(0, 13).map((day) => {
		return (
			<div className="monthdays">
				<div
					style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}
				>
					<div>{day.dayName}</div>
					<div>{day.day}</div>
				</div>
			</div>
		);
	});

	const monthGridStyle = {
		display: 'grid',
		gridTemplateColumns: `repeat(13, minmax(0, 1fr))`
	};
	const weekGridStyle = {
		display: 'grid',
		gridTemplateColumns: ` repeat(13,minmax(0, 1fr))  `
	};
	const roomsGridStyle = {
		display: 'grid',
		gridTemplateColumns: `minmax(0, 0.5fr) repeat(11,minmax(0, 1fr)) minmax(0, 1fr)  minmax(${w * 2}, 0.5fr) `,
		gridTemplateRows: `repeat(15, minmax(20px, 1fr))`
	};
	return (
		<div onMouseMove={handlePos} style={{}}>
			<div>
				{id ? <RentedDescription pos={pos} /> : null}
				<div style={{ marginLeft: '10%' }}>
					<div style={monthGridStyle}>{superMonths}</div>
				</div>
				<div style={{ float: 'right' }}>
					<div
						style={{
							position: 'absolute',
							top: 0,
							display: 'grid',
							gridTemplateColumns: `repeat(105,minmax(${w * 2}px, 1fr))`
						}}
					>
						{superMonths2}
					</div>
				</div>

				<div style={{}}>
					<div style={weekGridStyle}>{monthDays}</div>
				</div>
				<div style={{}}>
					<div
						style={{
							position: 'absolute',
							left: 0,
							zIndex: 30,
							backgroundColor: 'white',
							width: '10%',
							height: '47.5%'
						}}
					/>
					<div ref={containerRef} style={roomsGridStyle}>
						{grid}
					</div>
				</div>

				{/* </div> */}
				<div style={{ float: 'right' }}>
					<div
						ref={containerRef2}
						style={{
							position: 'absolute',
							top: 62,
							display: 'grid',
							gridTemplateColumns: `${w}px  repeat(105, minmax(${w * 2}px, 1fr))  ${w}px `,
							gridTemplateRows: `repeat(15, minmax(20px, 1fr))`
						}}
					>
						{grid2}
					</div>
					<div
						style={{
							position: 'absolute',
							top: 62,
							backgroundColor: 'white',
							width: '500px',
							height: '600px'
						}}
					/>
				</div>
			</div>
		</div>
	);
};
