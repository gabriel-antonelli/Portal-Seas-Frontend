import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListCitizensQuery() {
	const listCitizens = async () => {
		return Requests({
			url: 'cidadao?page=0',
			type: 'get',
		});
	};
	return useQuery('listCitizens', listCitizens, {});
}
