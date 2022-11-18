import axiosClient from '../../shared/apis/axiosClient';

export const getAllTheater = () => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`theaters`);
			dispatch({
				type: 'GET_ALL_THEATER',
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: err,
			});
		}
	};
};

export const getTheaterById = (id) => {
	return async (dispatch) => {
		try {
			const response = await axiosClient().get(`theaters/${id}`);
			dispatch({
				type: 'GET_THEATER_DETAIL',
				payload: response.data,
			});
		} catch (err) {
			dispatch({
				type: 'SET_THEATER_MESSAGE',
				payload: err,
			});
		}
	};
};
