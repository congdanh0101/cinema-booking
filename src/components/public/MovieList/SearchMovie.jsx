import useSWR from 'swr';
import styled from 'styled-components';

import { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import { getMovies } from '../../../service/actions/movie';
import { useDebounce } from '../../../shared/hooks/useDebounce';
import { usePagination } from '../../../shared/hooks/usePagination';

import { fetcher, tmdbAPI } from '../../../shared/apis/tmdbApi';
import SearchInput from '../Search/SearchInput';
import SearchList from '../Search/SearchList';
import { scrollTop } from '../../../shared/utils/utils';

const StyledSearchMovie = styled.div``;

const SearchMovie = () => {
	const { pagination, handlePageChange, setPagination } = usePagination();
	const [filter, setFilter] = useState('');
	const [movieList, setMovieList] = useState({ loading: true, data: [] });
	const [url, setUrl] = useState(
		tmdbAPI.getMovieList('popular', pagination.page)
	);
	const filterDebounce = useDebounce(filter, 500);
	const { data, error } = useSWR(url, fetcher);
	const loading = !data && !error;

	const fetchMovieList = async () => {
		setMovieList({ ...movieList, loading: true });
		try {
			const { data } = await this.getMovies();
			setPagination({
				...pagination,
				totalPages: data.data.pagination.totalPages,
			});
			setMovieList({ data: data.data.movies, loading: false });
		} catch (err) {
			setMovieList({ ...movieList, loading: false });
			console.log(err);
		}
	};

	useEffect(() => {
		fetchMovieList();
	}, [pagination.page]);
	const movies = data?.results || [];
	useEffect(() => {
		if (!data || !data.total_results) return;
		setPagination({
			...pagination,
			page: data.page,
			totalPages: data.total_pages,
		});
		scrollTop();
	}, [data]);

	return (
		<StyledSearchMovie>
			<div className="container">
				<SearchInput
					height="54px"
					placeholder="Search Movie..."
					setSearchValue={setFilter}
				/>
				<SearchList
					data={movies}
					loading={loading}
					pagination={pagination}
					handlePageChange={handlePageChange}
				/>
			</div>
		</StyledSearchMovie>
	);
};

const mapStateToProps = (state) => ({
	movie: state.movie,
});

const mapDispatchToProps = {
	getMovies,
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchMovie);
