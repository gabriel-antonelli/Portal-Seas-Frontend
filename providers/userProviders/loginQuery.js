import { useQuery } from 'react-query';
import { Requests } from '../../utils';

export function useLogin(email, password) {
	const loginUser = async () => {
		return Requests({
			url: 'auth',
			body: { senha: password, usuario: email },
			type: 'post',
		});
	};
	return useQuery('user', loginUser, {
		enabled: false,
	});
}
