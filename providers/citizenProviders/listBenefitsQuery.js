import { Requests } from '../../utils';
import { useQuery } from 'react-query';

export function useListBenefitsQuery() {
	const listBenefits = async () => {
		return Requests({
			url: 'beneficio',
			type: 'get',
		});
	};
	return useQuery('listBenefits', listBenefits, {
		refetchOnWindowFocus: false,
	});
}
