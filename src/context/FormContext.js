import createDataContext from './createDataContext';
import { addYears, formatWithOptions } from 'date-fns/fp';
import { es } from 'date-fns/locale';
import { add } from 'date-fns';
import _ from 'lodash';
import {
	eachDayOfInterval,
	addDays,
	subDays,
	differenceInDays,
	getDaysInMonth,
	isFirstDayOfMonth,
	isLastDayOfMonth
} from 'date-fns';

const MSGS = {
	INTERVAL_RENTED: 'INTERVAL_RENTED',
	NAME: 'NAME',
	START: 'START',
	END: 'END',
	PHONE: 'PHONE',
	EMAIL: 'EMAIL',
	ROOM: 'ROOM',
	PRICE: 'PRICE',
	SHOW_FORM: 'SHOW_FORM',
	NIGHTS_NUMBER: 'NIGHTS_NUMBER'
};
const nightsNumberMsg = (dispatch) => (nights, kind) => {
	dispatch({
		type: MSGS.NIGHTS_NUMBER,
		nights,
		kind
	});
};
const showFormMsg = (dispatch) => (showForm, start, room) => {
	dispatch({
		type: MSGS.SHOW_FORM,
		showForm,
		start,
		room
	});
};
const startMsg = (dispatch) => (start) => {
	dispatch({
		type: MSGS.START,
		start
	});
};
const endMsg = (dispatch) => (end) => {
	dispatch({
		type: MSGS.END,
		end
	});
};
const phoneMsg = (dispatch) => (phone) => {
	dispatch({
		type: MSGS.PHONE,
		phone
	});
};
const nameMsg = (dispatch) => (name) => {
	dispatch({
		type: MSGS.NAME,
		name
	});
};
const emailMsg = (dispatch) => (email) => {
	dispatch({
		type: MSGS.EMAIL,
		email
	});
};
const roomMsg = (dispatch) => (room) => {
	dispatch({
		type: MSGS.ROOM,
		room
	});
};
const priceMsg = (dispatch) => (price) => {
	dispatch({
		type: MSGS.PRICE,
		price
	});
};

const intervalRentedMsg = (dispatch) => (intervalRented) => {
	dispatch({
		type: MSGS.INTERVAL_RENTED,
		intervalRented
	});
};

///////////FORM MESSAGES///////////////////////////

const FormContext = (state, msg) => {
	switch (msg.type) {
		case MSGS.SHOW_FORM: {
			const { showForm, start, room } = msg;

			const end = add(start, { days: 1 });
			const { intervalRented } = state;

			return { ...state, showForm, intervalRented: { ...intervalRented, start, room, end } };
		}
		case MSGS.NIGHTS_NUMBER: {
			const { nights, kind } = msg;

			const { intervalRented } = state;
			const { start, end } = intervalRented;
			const endFromNights = add(start, { days: nights });
			return {
				...state,
				intervalRented: { ...intervalRented, nights, end: endFromNights }
			};
		}

		case MSGS.START: {
			const { start } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, start }
			};
		}
		case MSGS.END: {
			const { end } = msg;

			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, end }
			};
		}
		case MSGS.PHONE: {
			const { phone } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, phone }
			};
		}
		case MSGS.EMAIL: {
			const { email } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, email }
			};
		}
		case MSGS.NAME: {
			const { name } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, name }
			};
		}
		case MSGS.ROOM: {
			const { room } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, room }
			};
		}
		case MSGS.PRICE: {
			const { price } = msg;
			const { intervalRented } = state;
			return {
				...state,
				intervalRented: { ...intervalRented, price }
			};
		}

		case MSGS.INTERVAL_RENTED: {
			const { intervalRented } = msg;
			return { ...state, intervalRented };
		}

		default:
			return state;
	}
};
export const { Context, Provider } = createDataContext(
	FormContext,
	{
		intervalRentedMsg,
		startMsg,
		endMsg,
		phoneMsg,
		nameMsg,
		emailMsg,
		roomMsg,
		priceMsg,
		showFormMsg,
		nightsNumberMsg
	},
	{
		showForm: false,
		intervalRented: {
			room: 1,
			name: '',
			start: new Date(),
			end: add(new Date(), { days: 1 }),
			width: 0,
			email: '',
			phone: '',
			nights: '',
			price: ''
		}
	}
);
