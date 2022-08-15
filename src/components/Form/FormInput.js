import React from 'react';
import TextField from '@mui/material/TextField';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { NumberTextField } from './NumberTextField';

export const FormInput = ({ value, label, type, handleChange, ...other }) => {
	console.log(value, type);
	return (
		<div
			style={{
				padding: '10px',

				backgroundColor: 'white'
			}}
		>
			{/* {label ? <label>{label}</label> : null} */}

			{type === 'number' ? (
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
					{label ? <label>{label}</label> : null}
					{/* <TextField type={type} /> */}
					<TextField
						id="outlined-number"
						value={value}
						size="small"
						type={type}
						onChange={handleChange}
						InputProps={{ inputProps: { min: 1, max: 100 } }}
						{...other}
					/>
				</div>
			) : type === 'text' ? (
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
					{label ? <label>{label}</label> : null}

					<TextField value={value} size="small" type={type} onChange={handleChange} {...other} />
				</div>
			) : (
				<div style={{ display: 'flex', flexDirection: 'column', marginTop: '4px' }}>
					<div style={{}}>{label ? <label>{label}</label> : null}</div>
					<LocalizationProvider size="small" dateAdapter={AdapterDateFns}>
						<DesktopDatePicker
							size="small"
							inputFormat="MM/dd/yyyy"
							value={value}
							onChange={handleChange}
							renderInput={(params) => <TextField size="small" {...params} />}
						/>
					</LocalizationProvider>
				</div>
			)}
		</div>
	);
};
