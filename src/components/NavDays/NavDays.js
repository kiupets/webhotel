import React, { useContext } from 'react';
import { FormInput } from '../Form/FormInput';
import { Context as DatesContext } from '../../context/DatesContext';

export const NavDays = () => {
	const {
		state: { calendar: { startDate } },

		addIntervalMsg
	} = useContext(DatesContext);

	return (
		<div style={{ display: 'flex', flexDirection: 'column', width: '10%' }}>
			<div style={{}}>
				<FormInput
					handleChange={(newDate) => {
						addIntervalMsg('startDate', newDate);
					}}
					value={startDate}
					type="date"
					label="desde"
				/>
			</div>
			<div style={{}}>
				<FormInput
					handleChange={(newDate) => {
						addIntervalMsg('startDate', newDate);
					}}
					value={startDate}
					type="date"
					label="desde"
				/>
			</div>
		</div>
	);
};
