import createDataContext from './createDataContext';

import { addYears, formatWithOptions, format } from 'date-fns/fp';
import { es } from 'date-fns/locale';
import {
	eachDayOfInterval,
	add,
	addDays,
	subDays,
	differenceInDays,
	getDaysInMonth,
	isFirstDayOfMonth,
	isLastDayOfMonth
} from 'date-fns';
import _ from 'lodash';

const MSGS = {
	ADD_DAY: 'ADD_DAY',
	SUB_DAY: 'SUB_DAY',
	NEW_DAY: 'NEW_DAY',
	NEW_INTERVAL_RENTED: 'NEW_INTERVAL_RENTED',
	INTERVAL_RENTED_DB: 'INTERVAL_RENTED_DB',
	START_DATE: 'START_DATE'
};
const loadIntervals_db_msg = (dispatch) => (intervalsArray_db) => {
	dispatch({
		type: MSGS.INTERVAL_RENTED_DB,
		intervalsArray_db
	});
};
const newDayMsg = (dispatch) => (day) => {
	dispatch({
		type: MSGS.NEW_DAY,
		day
	});
};

const addIntervalMsg = (dispatch) => (intervalSign, startDate) => {
	dispatch({
		type: MSGS.ADD_DAY,
		intervalSign,
		startDate
	});
};
const addIntervalToArrayRentedMsg = (dispatch) => (intervalRented) => {
	dispatch({
		type: MSGS.NEW_INTERVAL_RENTED,
		intervalRented
	});
};

const DatesContext = (state, msg) => {
	switch (msg.type) {
		case MSGS.START_DATE: {
			const { startDate } = msg;
			return { ...state, startDate };
		}
		case MSGS.INTERVAL_RENTED_DB: {
			const { intervalsArray_db } = msg;

			const { calendar: { intervalRentedArray } } = state;
			const newIntervalRented = intervalsArray_db.map((interval) => {
				return {
					gridStart: new Date(interval.end),
					end: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(new Date(interval.start)),
					start: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(new Date(interval.end)),
					room: interval.room,
					id: interval.id,
					name: interval.name,
					email: interval.email,
					phone: interval.phone,
					width: differenceInDays(new Date(interval.end), new Date(interval.start)) * 100
				};
			});

			const newIntervalRentedArray = [ ...intervalRentedArray, ...newIntervalRented ];
			// console.log(newIntervalRentedArray)
			return {
				...state,
				calendar: {
					...state.calendar,
					intervalRentedArray: newIntervalRentedArray
				}
			};
		}
		case MSGS.NEW_INTERVAL_RENTED: {
			const { intervalRented } = msg;

			const {
				calendar: {
					intervalRentedArray,
					intervalData,
					generalDatesInterval,
					intervalMonth,
					intervalSignFront,
					counter
				},
				hotelRooms
			} = state;

			const newIntervalRented = {
				gridStart: intervalRented.end,
				end: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(intervalRented.start),
				start: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(intervalRented.end),
				room: intervalRented.room,
				name: intervalRented.name,
				id: intervalRented.id,
				email: intervalRented.email,
				phone: intervalRented.phone,
				width: differenceInDays(intervalRented.end, intervalRented.start) * 100
			};

			const newIntervalRentedArray = [ ...intervalRentedArray, newIntervalRented ];

			const newIntervalData = eachDayOfInterval(generalDatesInterval).map((day) => {
				return {
					formDate: day,
					day: formatWithOptions({ locale: es }, 'd')(day),
					dayName: formatWithOptions({ locale: es }, 'EE')(day),
					date: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(day),
					month: formatWithOptions({ locale: es }, 'MMMM')(day)
				};
			});
			const newIntervalMonth = eachDayOfInterval(generalDatesInterval).map((day) => ({
				firstDay: isFirstDayOfMonth(day) ? day : null,
				lastDay: isLastDayOfMonth(day) ? day : null,
				monthDate: day,
				month: formatWithOptions({ locale: es }, 'MMMM')(day),
				year: formatWithOptions({ locale: es }, 'd')(day),
				monthDay: formatWithOptions({ locale: es }, 'd')(day),
				width: getDaysInMonth(day)
			}));

			return {
				...state,
				calendar: {
					counter: counter,
					intervalSignFront: intervalSignFront,
					intervalMonth: newIntervalMonth,
					intervalData: newIntervalData,
					generalDatesInterval,
					intervalRentedArray: newIntervalRentedArray
				}
			};
		}

		case MSGS.ADD_DAY: {
			const { newIntervalSign } = msg;
			const {
				calendar: { intervalData, generalDatesInterval, intervalRentedArray, intervalSignFront, counter },
				hotelRooms
			} = state;

			const { intervalSign, startDate } = msg;

			const start =
				intervalSign === '+'
					? addDays(generalDatesInterval.start, 1)
					: intervalSign === 'startDate' ? startDate : subDays(generalDatesInterval.start, 1);

			const end =
				intervalSign === '+' ? addDays(generalDatesInterval.end, 1) : subDays(generalDatesInterval.end, 1);
			const newGeneralDatesInterval = { start, end };

			const newIntervalData = eachDayOfInterval(newGeneralDatesInterval).map((day) => {
				return {
					formDate: day,
					day: formatWithOptions({ locale: es }, 'd')(day),
					dayName: formatWithOptions({ locale: es }, 'EE')(day),
					date: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(day),
					month: formatWithOptions({ locale: es }, 'MMMM')(day)
				};
			});
			const newIntervalMonth = eachDayOfInterval(newGeneralDatesInterval).map((day) => ({
				firstDay: isFirstDayOfMonth(day) ? day : null,
				lastDay: isLastDayOfMonth(day) ? day : null,
				monthDate: day,
				date: day,
				month: formatWithOptions({ locale: es }, 'MMMM')(day),
				year: formatWithOptions({ locale: es }, 'd')(day),
				monthDay: formatWithOptions({ locale: es }, 'd')(day),
				width: getDaysInMonth(day)
			}));
			const newCounter = intervalSign === '+' ? counter + 1 : counter - 1;
			return {
				...state,
				calendar: {
					counter: newCounter,
					intervalSignFront: intervalSign,
					intervalMonth: newIntervalMonth,
					intervalData: newIntervalData,
					generalDatesInterval: newGeneralDatesInterval,
					intervalRentedArray,
					startDate
				}
			};
		}

		default:
			return state;
	}
};
export const { Context, Provider } = createDataContext(
	DatesContext,
	{ newDayMsg, addIntervalMsg, addIntervalToArrayRentedMsg, loadIntervals_db_msg },
	{
		hotelRooms: _.range(15),
		calendar: {
			generalDatesInterval: { start: new Date(), end: add(new Date(), { months: 4 }) },

			intervalRentedArray: [],
			startDate: new Date(),
			intervalSignFront: '+',
			intervalData: eachDayOfInterval({ start: new Date(), end: add(new Date(), { months: 4 }) }).map((day) => ({
				formDate: day,
				day: formatWithOptions({ locale: es }, 'd')(day),
				dayName: formatWithOptions({ locale: es }, 'EE')(day),
				date: formatWithOptions({ locale: es }, 'dd/MM/yyyy')(day),
				month: formatWithOptions({ locale: es }, 'MMMM')(day)
			})),
			counter: 0,
			intervalMonth: eachDayOfInterval({
				start: new Date(),
				end: add(new Date(), { months: 4 })
			}).map((day) => ({
				firstDay: isFirstDayOfMonth(day) ? day : null,
				lastDay: isLastDayOfMonth(day) ? day : null,
				monthDate: day,
				month: formatWithOptions({ locale: es }, 'MMMM')(day),
				year: formatWithOptions({ locale: es }, 'd')(day),
				monthDay: formatWithOptions({ locale: es }, 'd')(day),
				date: day,
				width: getDaysInMonth(day)
			}))
		}
	}
);
