import { height } from '@mui/system';
import React from 'react';

export const DescDetail = ({ name, phone, email, end, start, room }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '40%' }}>
			<h3>Nombre: {name}</h3>
			<h3>Habitacion: {room}</h3>
			<h3>Entrada: {end}</h3>
			<h3>Salida: {start}</h3>
		</div>
	);
};
{
	/* <h3>nombre:{name}</h3>
			<h3>habitacion:{room}</h3>
			<h3>telefono:{phone}</h3>
			<h3>email:{email}</h3>
			<h3>entrada:{start}</h3>
			<h3>salida:{end}</h3> */
}
