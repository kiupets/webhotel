// import guid from "generate-unique-id";
import React, { useEffect, useState, useId } from 'react';
import axios from 'axios';
import { Context as FormContext } from '../../context/FormContext';
import { Context as DatesContext } from '../../context/DatesContext';
import { addYears, formatWithOptions } from 'date-fns/fp';

import { useContext } from 'react';

import { FormInput } from './FormInput';
import { es } from 'date-fns/locale';
import { TextField } from '@mui/material';

// var HOST = window.location.origin.replace(/^http/, 'ws');
// const socketUrl = `${HOST}/ws`;

const websocket = new WebSocket('ws://localhost:8080/ws');
// const websocket = new WebSocket(socketUrl);
// const websocket = new WebSocket('ws://localhost:8080/ws');

export const Form = () => {
	const id = useId();
	const {
		state: { calendar: { intervalRentedArray } },
		addIntervalToArrayRentedMsg,
		loadIntervals_db_msg
	} = useContext(DatesContext);

	const {
		startMsg,
		endMsg,
		phoneMsg,
		nameMsg,
		emailMsg,
		roomMsg,
		priceMsg,
		showFormMsg,
		nightsNumberMsg
	} = useContext(FormContext);

	const { intervalRented, showForm } = useContext(FormContext).state;

	const { name, email, phone, room, start, end, nights, price } = intervalRented;

	const interval_Array_db = JSON.stringify(intervalRentedArray);
	const intervalDB = {
		name,
		email,
		phone,
		room,
		id,
		start: formatWithOptions({ locale: es }, 'MM/dd/yyyy')(start),
		end: formatWithOptions({ locale: es }, 'MM/dd/yyyy')(end),
		nights,
		price
	};
	const interval_db = JSON.stringify(intervalDB);

	const handleSubmit = async (e) => {
		e.preventDefault();

		showFormMsg(false);
		// addIntervalToArrayRentedMsg({
		// 	name,
		// 	email,
		// 	phone,
		// 	id,
		// 	room,
		// 	start,
		// 	end,
		// 	nights
		// });

		const res = await axios.post(`http://localhost:8080/rented`, {
			id: '',
			interval_rented_array: interval_db
		});

		const dat = JSON.parse(JSON.parse(res.config.data).interval_rented_array);
		const data = {
			name,
			email,
			phone,
			id,
			room,
			start: new Date(dat.start),
			end: new Date(dat.end),
			nights,
			price
		};

		addIntervalToArrayRentedMsg(data);
	};

	useEffect(
		() => {
			websocket.onmessage = (msg) => {
				const _msg = JSON.parse(msg.data);

				const msg_to = JSON.parse(_msg.data.interval_rented_array);

				const msgg = {
					phone: msg_to.phone,
					email: msg_to.email,
					name: msg_to.name,
					id: msg_to.id,
					end: new Date(msg_to.end),
					start: new Date(msg_to.start),
					room: msg_to.room,
					price: msg_to.price,
					nights: msg_to.nights
				};

				addIntervalToArrayRentedMsg(msgg);
				// websocket.close();`
			};
			// websocket.onclose = (msg) => {
			// 	console.log(websocket.readyState);
			// };
		},
		[ intervalDB ]
	);
	useEffect(
		() => {
			nightsNumberMsg(nights);
		},
		[ nights ]
	);

	return (
		<div style={{ width: '100%', backgroundColor: 'blue', padding: '20px' }}>
			<form noValidate autoComplete="off" onSubmit={handleSubmit}>
				<div style={{ display: 'flex', justifyContent: 'space-around' }}>
					<div>
						<FormInput
							value={start}
							handleChange={(newVal) => {
								startMsg(newVal);
							}}
							type="date"
							label="Desde"
						/>

						<FormInput value={end} handleChange={(newVal) => endMsg(newVal)} type="date" label="Hasta" />
						<FormInput
							value={nights}
							handleChange={(e) => nightsNumberMsg(e.target.value, e)}
							type="number"
							label="Noches"
						/>
						<FormInput
							value={phone}
							handleChange={(e) => phoneMsg(e.target.value)}
							type="text"
							label="Horario de Llegada"
						/>
					</div>
					<div>
						<FormInput
							value={room}
							handleChange={(e) => roomMsg(e.target.value)}
							type="text"
							label="Habitacion"
						/>
						<FormInput
							value={name}
							handleChange={(e) => nameMsg(e.target.value)}
							type="text"
							label="Nombre"
						/>
						<FormInput
							value={email}
							handleChange={(e) => emailMsg(e.target.value)}
							type="text"
							label="Email"
						/>
						<FormInput
							value={phone}
							handleChange={(e) => phoneMsg(e.target.value)}
							type="text"
							label="Telefono"
						/>
					</div>

					<div>
						{/* <FormInput name={'hola'} value={'hola'} handleChange={priceMsg} type='text' label='Precio' /> */}
						{/* <FormInput value={nombre} handleChange={(e) => nombreMsg(e.target.value)} type='text' label='name' /> */}
						{/* <FormInput name={'hola'} value={'hola'} handleChange={() => { }} type='text' label='Total' /> */}
					</div>
				</div>

				<button type="submit">SAVE </button>
			</form>
		</div>
	);
};
