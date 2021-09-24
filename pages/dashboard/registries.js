import { useListCitizensQuery } from '../../providers/citizenProviders/listCitizensQuery';
import Head from 'next/head';
import { Description } from '../../components';
import { withAuth } from '../../utils';
import { useEffect, useState } from 'react';

function Registries() {
	const { data, isSuccess } = useListCitizensQuery();
	const [citizensList, setCitizensList] = useState([]);
	const [inputValue, setInputValue] = useState('');

	useEffect(() => {
		if (isSuccess && data.success) {
			setCitizensList(data.data.content);
		}
	}, [isSuccess, data]);

	const filteredCitizensList = (searchValue) => {
		return data.data.content.filter((item) => {
			if (
				item.nome.toUpperCase().includes(searchValue.toUpperCase()) ||
				item.cidadeNascimento.nome
					.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				item.cidadeNascimento.estado.nome
					.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				item.sexo.nomeclatura
					.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				item.cor.nomeclatura
					.toUpperCase()
					.includes(searchValue.toUpperCase()) ||
				(new Date().getUTCFullYear() - item.dataNascimento[0])
					.toLocaleString()
					.includes(searchValue)
			) {
				return item;
			}
		});
	};

	const handleInput = (e) => {
		setInputValue(e.target.value);
		if (e.target.value !== '') {
			setCitizensList(filteredCitizensList(e.target.value));
		} else {
			setCitizensList(data.data.content);
		}
	};

	return (
		<>
			<Head>
				<title>Cadastro de Cidadão</title>
			</Head>
			<div className='justify-center items-center mt-10'>
				<div className='md:grid md:grid-cols-4'>
					<Description
						title='Listagem de cidadão'
						desc='Procure cidadãos e edite registros.'
					/>
					<div className='md:col-span-3 mx-3'>
						<div className='sm:w-max w-auto lg:w-full h-auto bg-white rounded-lg shadow my-2 justify-center items-center flex'>
							<input
								type='text'
								value={inputValue}
								onChange={handleInput}
								id='"form-subscribe-Filter'
								className='rounded-lg w-full border-transparent flex-1 appearance-none border border-gray-300 w-100 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:border-transparent'
								placeholder='Pesquisar'
							/>
						</div>
						<div className='sm:w-full h-max overflow-y-auto justify-center bg-white rounded-lg shadow'>
							<ul className='divider divide-y h-max'>
								{citizensList.map((citizen) => {
									return (
										<li key={citizen.id}>
											<div className='select-none cursor-pointer flex flex-1 p-4'>
												<div className='flex-1 pl-1 mr-16'>
													<div className='font-medium dark:text-white'>
														{citizen.nome.toUpperCase()}
													</div>
													<div className='text-gray-600 dark:text-gray-200 text-sm'>
														Idade:{' '}
														{new Date().getUTCFullYear() - citizen.dataNascimento[0]}
													</div>
												</div>
												<div className='flex-1 pl-1 mr-16'>
													<div className='font-medium dark:text-white'>
														{citizen.cidadeNascimento.estado.nome.toUpperCase()}
													</div>
													<div className='text-gray-600 dark:text-gray-200 text-sm'>
														{citizen.cidadeNascimento.nome.toUpperCase()}
													</div>
												</div>
												<div className='flex-1 pl-1 mr-16'>
													<div className='font-medium dark:text-white'>
														{citizen.sexo.nomeclatura}
													</div>
													<div className='text-gray-600 dark:text-gray-200 text-sm'>
														{citizen.cor.nomeclatura}
													</div>
												</div>
												<button className='w-24 text-right flex justify-end'>
													<svg
														width='20'
														fill='currentColor'
														height='20'
														className='hover:text-gray-800 dark:hover:text-white dark:text-gray-200 text-gray-500'
														viewBox='0 0 1792 1792'
														xmlns='http://www.w3.org/2000/svg'>
														<path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z' />
													</svg>
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						<div className='px-3 py-3 flex flex-col xs:flex-row items-center xs:justify-between'>
							<div className='flex items-center'>
								<button
									type='button'
									className='w-full p-4 border text-base rounded-l-xl text-gray-600 bg-white hover:bg-gray-100'>
									<svg
										width='9'
										fill='currentColor'
										height='8'
										className=''
										viewBox='0 0 1792 1792'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M1427 301l-531 531 531 531q19 19 19 45t-19 45l-166 166q-19 19-45 19t-45-19l-742-742q-19-19-19-45t19-45l742-742q19-19 45-19t45 19l166 166q19 19 19 45t-19 45z'/>
									</svg>
								</button>
								<button
									type='button'
									className='w-full px-4 py-2 border-t border-b text-base text-indigo-500 bg-white hover:bg-gray-100 '>
									1
								</button>
								<button
									type='button'
									className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'>
									2
								</button>
								<button
									type='button'
									className='w-full px-4 py-2 border-t border-b text-base text-gray-600 bg-white hover:bg-gray-100'>
									3
								</button>
								<button
									type='button'
									className='w-full px-4 py-2 border text-base text-gray-600 bg-white hover:bg-gray-100'>
									4
								</button>
								<button
									type='button'
									className='w-full p-4 border-t border-b border-r text-base  rounded-r-xl text-gray-600 bg-white hover:bg-gray-100'>
									<svg
										width='9'
										fill='currentColor'
										height='8'
										className=''
										viewBox='0 0 1792 1792'
										xmlns='http://www.w3.org/2000/svg'>
										<path d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z'/>
									</svg>
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default withAuth(Registries);
