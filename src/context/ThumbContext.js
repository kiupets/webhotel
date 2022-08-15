import createDataContext from './createDataContext';

const MSGS = {
	THUMB_POS: 'THUMB_POS',
	CLICK_POS: 'CLICK_POS',
	INIT_WIDTH_POS: 'INIT_WIDTH_POS',
	CONTAINER_WIDTH: 'CONTAINER_WIDTH',
	THUMB_WIDTH: 'THUMB_WINDTH'
};
const thumbWidthMsg = (dispatch) => (ThumbWidth) => {
	dispatch({ type: MSGS.THUMB_WIDTH, ThumbWidth });
};

const containerWidthMsg = (dispatch) => (width) => {
	dispatch({
		type: MSGS.CONTAINER_WIDTH,
		width
	});
};

const thumbPosMsg = (dispatch) => (pos) => {
	dispatch({
		type: MSGS.THUMB_POS,
		pos
	});
};
const initWidthPosMsg = (dispatch) => (width) => {
	dispatch({
		type: MSGS.INIT_WIDTH_POS,
		width
	});
};

const thumbClickPosMsg = (dispatch) => (clickPos) => {
	dispatch({
		type: MSGS.CLICK_POS,
		clickPos
	});
};

const ThumbContext = (state, msg) => {
	switch (msg.type) {
		case MSGS.INIT_WIDTH_POS: {
			const { width } = msg;

			return { ...state, width };
		}

		case MSGS.THUMB_POS: {
			const { pos } = msg;
			const prevPos = pos;

			return { ...state, pos };
		}
		case MSGS.THUMB_WIDTH: {
			const { ThumbWidth } = msg;

			return { ...state, ThumbWidth };
		}

		default:
			return state;
	}
};
export const { Context, Provider } = createDataContext(
	ThumbContext,
	{
		thumbPosMsg,
		thumbWidthMsg,
		initWidthPosMsg,
		thumbClickPosMsg,
		containerWidthMsg
	},
	{
		pos: 0,
		width: 0,
		thumbWidth: 0,
		clickPos: 0
	}
);
