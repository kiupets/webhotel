import createDataContext from './createDataContext';

const MSGS = {
	ID: 'ID'
};
const idMsg = (dispatch) => (id) => {
	dispatch({
		type: MSGS.ID,
		id
	});
};

const IdContext = (state, msg) => {
	switch (msg.type) {
		case MSGS.ID: {
			const { id } = msg;

			return { ...state, id };
		}

		default:
			return state;
	}
};
export const { Context, Provider } = createDataContext(
	IdContext,
	{ idMsg },
	{
		id: ''
	}
);
