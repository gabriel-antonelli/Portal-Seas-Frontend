import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useIncomeSourcesQuery() {
	const listIncomeSources = async () => {
		return Requests({
			url: 'fontederenda',
			type: 'get',
		});
	};
	return useQuery('listIncomeSources', listIncomeSources, {
		refetchOnWindowFocus: false,
	});
}
