import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListReasonsQuery() {
	const listReasons = async () => {
		return Requests({
			url: 'motivo',
			type: 'get',
		});
	};
	return useQuery('listReasons', listReasons, {
		refetchOnWindowFocus: false,
	});
}
