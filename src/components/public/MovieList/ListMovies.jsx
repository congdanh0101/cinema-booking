import { useEffect, useState } from 'react';
import { usePagination } from '../../../shared/hooks/usePagination';
import { MovieList } from '../../common';
import { scrollTop } from '../../../shared/utils/utils';
import axiosClient from '../../../shared/apis/axiosClient';

const ListMovies = () => {
	const [movieList, setMovieList] = useState({ loading: true, data: [] });
	const { pagination, handlePageChange, setPagination } = usePagination(0, 10);

	const fetchMovieList = async () => {
		setMovieList({ ...movieList, loading: true });
		try {
			const { data } = await axiosClient().get(
				`movies?pageNumber=${pagination.page}`
			);
			setPagination({
				...pagination,
				limit: data.pageSize,
				totalPages: data.totalPages - 1,
			});
			setMovieList({ data: data.content, loading: false });
		} catch (err) {
			setMovieList({ ...movieList, loading: false });
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMovieList();
	}, [pagination.page]); // eslint-disable-line react-hooks/exhaustive-deps
	useEffect(() => {
		scrollTop();
	}, []);

	return (
		<div className="home">
			<div className="home-main">
				<div className="container">
					<h1 className="text-center">Movie List</h1>
					<MovieList
						loading={movieList.loading}
						data={movieList.data}
						heading="Now showing"
						pagination={pagination}
						handlePageChange={handlePageChange}
					/>
				</div>
			</div>
		</div>
	);
};

export default ListMovies;
