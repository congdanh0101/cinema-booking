export const createOrder = (
	dataLocation,
	dataDate,
	dataShowtime,
	dataMovie
) => {
	return async (dispatch) => {
		const params = new URLSearchParams();
		params.append('dataShowtime', dataShowtime);
		params.append('dataMovie', dataMovie);
		params.append('dataDate', dataDate);
		params.append('dataLocation', dataLocation);
		const data = { dataLocation, dataDate, dataShowtime, dataMovie };
		try {
			dispatch({
				type: 'CREATE_ORDER',
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_CREATE_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const createSeat = (data = []) => {
	return async (dispatch) => {
		try {
			dispatch({
				type: 'GET_SEAT',
				payload: data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_CREATE_ORDER_MESSAGE',
				payload: err,
			});
		}
	};
};
