import { withAuth } from '../../utils';
import { useListCitizensQuery } from '../../providers/citizenProviders/listCitizensQuery';
import Head from 'next/head';
import { Description } from '../../components';

function Registries() {
	const { data: citizensList, isSuccess } = useListCitizensQuery();

	return (
		<>
			<Head>
				<title>Cadastro de Cidadão</title>
			</Head>
			<div className='justify-center items-center mt-10 overflow-hidden fixed'>
				<div className='md:grid md:grid-cols-4 md:gap-6'>
					<Description
						title='Listagem de cidadão'
						desc='Procure cidadãos por nome e edite registros.'
					/>
					<div className='sm:w-max h-5/6 overflow-y-scroll justify-center bg-white rounded-lg shadow'>
						<ul className='divider divide-y '>
							{isSuccess &&
								citizensList.data.content.map((citizen) => {
									return (
										<li key={citizen.id}>
											<div className='select-none cursor-pointer flex flex-1 p-4'>
												<div className='flex-1 pl-1 mr-16'>
													<div className='font-medium dark:text-white'>
														{citizen.nome.toUpperCase()}
													</div>
													<div className='text-gray-600 dark:text-gray-200 text-sm'>
														{citizen.fonteDeRenda.nomeclatura}
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
				</div>
			</div>
		</>
	);
}

export default withAuth(Registries);
