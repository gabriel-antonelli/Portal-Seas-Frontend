import { useListCitizensQuery } from '../../providers/citizenProviders/listCitizensQuery';
import Head from 'next/head';
import { Alert, Description, Loading } from '../../components';
import { convertValues, withAuth } from '../../utils';
import { useEffect, useState } from 'react';
import { Pagination } from '../../components/list/pagination';
import { ListItem } from '../../components/list/listItem';
import { CitizenForm } from '../../components/form';

function Registries() {
	const [citizensList, setCitizensList] = useState([]);
	const [loading, setLoading] = useState(false);
	const [values, setValues] = useState({});
	const [editValues, setEditValues] = useState({});
	const [alert, setAlert] = useState({ show: false });
	const [pages, setPages] = useState(1);
	const [selectedPage, setSelectedPage] = useState(1);
	const [inputValue, setInputValue] = useState('');
	const { data, isSuccess, refetch } = useListCitizensQuery(selectedPage, values);

	useEffect(() => {
		if (isSuccess && data.success) {
			setCitizensList(data.data.content);
			setPages(data.data.totalPages);
		}
	}, [isSuccess, data]);

	useEffect(() => {
		const fetchNewPage = async () => {
			setLoading(true);
			await refetch();
			setLoading(false);
		};
		fetchNewPage();
	}, [refetch, selectedPage]);

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			const newFetch = await refetch();
			if (newFetch.data.status !== 200 || newFetch.isError) {
				setAlert({
					show: true,
					label: 'Não foi possível buscar pelos cidadãos.',
					type: 'Erro',
				});
			}
			setLoading(false);
		};
		fetchData();
	}, [refetch, values]);

	const normalizeString = (str) => {
		return str
			.toString()
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '').replace(/ /g, '');
	};

	const getAge = (year) => {
		const today = new Date();
		const birthDate = new Date(...year);
		const yearsDifference = today.getFullYear() - birthDate.getFullYear();
		if (
			(today.getMonth() < birthDate.getMonth() ||
				(today.getMonth() === birthDate.getMonth() &&
					today.getDate() < birthDate.getDate())) &&
			yearsDifference >= 1
		) {
			return (yearsDifference - 1).toString();
		}
		return yearsDifference.toString();
	};

	const filteredCitizensList = (searchValue) => {
		return data.data.content.filter((item) => {
			if (
				normalizeString(item.nome).includes(normalizeString(searchValue)) ||
				normalizeString(item.cidadeNascimento.nome).includes(
					normalizeString(searchValue),
				) ||
				normalizeString(item.cidadeNascimento.estado.nome).includes(
					normalizeString(searchValue),
				) ||
				normalizeString(item.sexo.nomeclatura).includes(
					normalizeString(searchValue),
				) ||
				normalizeString(item.cor.nomeclatura).includes(
					normalizeString(searchValue),
				) ||
				getAge(item.dataNascimento).includes(searchValue)
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

	const handlePage = (page) => {
		if (page < 1) {
			return setSelectedPage(pages);
		}
		if (page > pages) {
			return setSelectedPage(1);
		}
		setSelectedPage(page);
	};

	const handleSubmit = (e, formValues) => {
		e.preventDefault();
		setValues(formValues);
	};

	return (
		<>
			<Loading show={loading} />
			<Alert
				show={alert.show}
				func={() => setAlert({ show: !alert.show })}
				label={alert.label}
				type={alert.type}
			/>
			<Head>
				<title>Cadastro de Cidadão</title>
			</Head>
			<div className='justify-center items-center mt-5'>
				<div className='md:grid md:grid-cols-3'>
					<div>
						<Description
							title='Listagem de cidadão'
							desc='Procure cidadãos e edite registros.'
						/>
						<div className='sm:ml-7 mt-2'>
							<CitizenForm
								editValues={editValues}
								submitFunction={handleSubmit}
								buttonText={Object.keys(editValues).length > 0 ? 'Editar' : 'Buscar'}
							/>
						</div>
					</div>
					<div className='md:col-span-2 mx-3'>
						<div
							className='sm:w-max w-auto lg:w-full h-auto bg-white rounded-lg shadow my-2 justify-center items-center flex'>
							<input
								type='text'
								value={inputValue}
								onChange={handleInput}
								id='"form-subscribe-Filter'
								className='rounded-lg w-full border-transparent flex-1 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:border-transparent'
								placeholder='Pesquisar'
							/>
						</div>
						<div className='sm:w-full h-max overflow-y-auto justify-center bg-white rounded-lg shadow'>
							<ul className='divider divide-y h-max'>
								{citizensList.map((citizen) => {
									return (
										<li key={citizen.id}>
											<div className='select-none cursor-pointer flex flex-1 p-4'>
												<ListItem
													title={citizen.nome}
													subtitle={'Idade: ' + getAge(citizen.dataNascimento)}
												/>
												<ListItem
													title={citizen.cidadeNascimento.estado.nome}
													subtitle={citizen.cidadeNascimento.nome}
												/>
												<ListItem
													className='sm:hidden'
													title={citizen.sexo.nomeclatura}
													subtitle={citizen.cor.nomeclatura}
												/>
												<button className='text-right flex justify-end'
																onClick={() => setEditValues(convertValues(citizen))}
												>
													<svg
														width='20'
														fill='currentColor'
														height='20'
														className='hover:text-gray-800 text-gray-500'
														viewBox='0 0 1792 1792'
														xmlns='http://www.w3.org/2000/svg'>
														<path
															d='M1363 877l-742 742q-19 19-45 19t-45-19l-166-166q-19-19-19-45t19-45l531-531-531-531q-19-19-19-45t19-45l166-166q19-19 45-19t45 19l742 742q19 19 19 45t-19 45z' />
													</svg>
												</button>
											</div>
										</li>
									);
								})}
							</ul>
						</div>
						<Pagination
							pages={pages}
							handleClick={handlePage}
							selected={selectedPage}
						/>
					</div>
				</div>
			</div>
		</>
	);
}

export default withAuth(Registries);
