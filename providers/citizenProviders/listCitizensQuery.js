import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListCitizensQuery() {
	const listCitizens = async () => {
		return Requests({
			url: 'cidadao',
			type: 'get',
		});
	};
	return useQuery('listCitizens', listCitizens, {
		refetchOnWindowFocus: false,
	});
}
