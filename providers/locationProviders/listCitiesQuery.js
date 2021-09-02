import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListCitiesQuery(id) {
	const listCities = async () => {
		return Requests({
			url: 'cidade/' + id,
			type: 'get',
		});
	};
	return useQuery('listCities', listCities, {
		enabled: false,
	});
}
