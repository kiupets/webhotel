import React from 'react';
import { Context } from '../../context/DatesContext';
import { useContext, useEffect, useState } from 'react';

export const MonthRef2 = ({ label, w }) => {
	const { state } = useContext(Context);
	const { calendar } = state;
	const { intervalSignFront } = calendar;

	const { intervalMonth } = calendar;
	const slice = 13;
	const start = intervalMonth[0].monthDay;
	const end = intervalMonth.slice(0, slice)[intervalMonth.slice(0, slice).length - 1].monthDay;
	const middle = intervalMonth.slice(0, slice)[6].monthDay;
	const superWidth = end * w;
	const paddingLeft = end * w;
	const [ counterBack, setCounterBack ] = useState(30);

	useEffect(
		() => {
			if (start >= 15 && intervalMonth[0].month === label) {
				setCounterBack(counterBack - 1);
			}
		},
		[ intervalMonth ]
	);

	return (
		<div
			style={{
				boxSizing: 'border-box',
				display: 'flex',
				justifyContent: 'center',
				textAlign: 'center',
				width: `${start >= 16 && intervalMonth[0].month === label ? counterBack * w : superWidth}px`
				// width: `${w}px`,
				// backgroundColor: 'orange'
			}}
		>
			<div
				style={
					start >= 1 && start <= 15 ? (
						{
							paddingLeft: `${start * w}px`,
							boxSizing: 'border-box'
						}
					) : start >= 15 && intervalMonth[0].month === label ? (
						{
							paddingLeft: `${start * w}px`,
							boxSizing: 'border-box'
						}
					) : (
						{}
					)
				}
			>
				{label}
			</div>
		</div>
	);
};
