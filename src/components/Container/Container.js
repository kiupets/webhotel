import React, { useContext, useEffect, useState, useCallback, useRef } from 'react';
import { ScrollBar } from '../Scrollbar/ScrollBar';
import { Grid } from '../Grid/Grid';
import { NavDays } from '../NavDays/NavDays';
import { Context } from '../../context/DatesContext';
import { Context as FormContext } from '../../context/FormContext';
import axios from 'axios';
import TextField from '@mui/material/TextField';
import { Context as ThumbContext } from '../../context/ThumbContext';
import { FormContainer } from '../Form/FormContainer';

import _ from 'lodash';
import zIndex from '@mui/material/styles/zIndex';
// const websocket = new WebSocket('ws://localhost:8080/ws');
export const Container = () => {
	const { containerWidthMsg } = useContext(ThumbContext);
	const containerRef = useRef();

	const { loadIntervals_db_msg } = useContext(Context);

	const { showForm } = useContext(FormContext).state;

	const getRentedArray = async () => {
		const res = await axios.get(`http://localhost:8080/all`);
		const data = res.data.map((d) => JSON.parse(d.interval_rented_array));
		loadIntervals_db_msg(data);
	};
	useEffect(() => {
		// websocket.onopen = () => console.log('open');
		getRentedArray();
	}, []);

	return (
		<div
			style={{
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				marginTop: '10px'
				// zIndex: 10
				// backgroundColor: 'black'
			}}
		>
			<div
				ref={containerRef}
				style={{
					// padding: '10px',
					display: 'flex',
					flexDirection: 'column',
					width: '80%'
					// margin: '10%',
					// zIndex: 10
					// overflowX: 'hidden'
				}}
			>
				<Grid />
				{showForm ? (
					<div style={{ width: '60%', position: 'absolute', left: '10%', top: '7%', zIndex: 1000 }}>
						<FormContainer />
					</div>
				) : null}

				<div style={{}}>
					<ScrollBar />
				</div>
				<NavDays />
			</div>
		</div>
	);
};
