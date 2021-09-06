//Libs
import { useState } from 'react';
//Providers
import {
	useIncomeSourcesQuery,
	useListBenefitsQuery,
	useListCitiesQuery,
	useListColorsQuery,
	useListEspecialCasesQuery,
	useListReasonsQuery,
	useListSexQuery,
	useListStatesQuery,
} from '../../providers';
//Aux
import { verifyValue, withAuth } from '../../utils';
//Components
import { Alert, Description } from '../../components';
import { Input, SelectComponent } from '../../components/form';
import Head from 'next/head';
import { useCreateCitizenQuery } from '../../providers/citizenProviders/createCitizenQuery';

function Dashboard() {
	const [values, setValues] = useState({});
	const [alert, setAlert] = useState({ show: false });
	const [state, setState] = useState();
	const { data: sexData } = useListSexQuery();
	const { data: colorsData } = useListColorsQuery();
	const { data: reasonsData } = useListReasonsQuery();
	const { data: benefitsData } = useListBenefitsQuery();
	const { data: especialCasesData } = useListEspecialCasesQuery();
	const { data: statesData } = useListStatesQuery();
	const { data: citiesData, refetch: fetchCities } = useListCitiesQuery(state);
	const { data: incomingSourcesData } = useIncomeSourcesQuery();
	const { refetch: createRefetch } = useCreateCitizenQuery(values);

	const handleChangeInput = (e) => {
		const auxValues = { ...values };
		auxValues[e.target.name] = e.target.value;
		setValues(auxValues);
	};

	const handleChangeSelect = (e, name) => {
		const auxValues = { ...values };
		if (e.length > 0) {
			e.map((val) => {
				if (auxValues[name] === undefined) {
					auxValues[name] = [];
					auxValues[name].push(val.value);
				} else {
					auxValues[name].push(val.value);
				}
				auxValues[name] = Array.from(new Set(auxValues[name]));
			});
		} else {
			if (name === 'state') {
				getCities(e.value);
			}
			auxValues[name] = e.value;
		}
		setValues(auxValues);
	};

	const getCities = async (id) => {
		await setState(id);
		if (!verifyValue(id)) {
			await fetchCities();
		}
	};

	const handleSubmit = async (e) => {
		await e.preventDefault();
		const newFetch = await createRefetch();
		if (newFetch.data.status === 200 && newFetch.isSuccess) {
			setAlert({
				show: true,
				color: 'blue',
				msg: 'Cadastro realizado com sucesso.',
			});
		} else {
			setAlert({
				show: true,
				label: 'Não foi possível realizar o cadastro.',
				type: 'Erro',
			});
		}
	};

	const shouldShowMultiValues = (value, name) => {
		if (!verifyValue(value)) {
			return undefined;
		} else if (!verifyValue(values[name])) {
			const auxValues = { ...values };
			auxValues[name] = null;
			setValues(auxValues);
		}
		return null;
	};

	return (
		<>
			<Alert
				show={alert.show}
				func={() => setAlert({ show: !alert.show })}
				label={alert.label}
				type={alert.type}
			/>
			<Head>
				<title>Cadastro de Cidadão</title>
			</Head>
			<div className='justify-center items-center mt-10'>
				<div className='md:grid md:grid-cols-4 md:gap-6'>
					<Description
						title='Cadastro de cidadão'
						desc='Preencha as informações necessárias para cadastrar um cidadão.'
					/>
					<div className='md:col-span-3'>
						<form onSubmit={handleSubmit}>
							<div className='overflow-hidden mt-4 shadow sm:rounded-md md:mt-0 md:mr-8'>
								<div className='px-4 py-5 bg-white sm:p-6'>
									<div className='grid grid-cols-6 gap-6'>
										<Input
											name='name'
											label='Nome'
											type='text'
											handleChange={handleChangeInput}
											required={true}
											size='col-span-3 md:col-span-3'
										/>
										<Input
											name='lastName'
											label='Sobrenome'
											type='text'
											required={true}
											handleChange={handleChangeInput}
											size='md:col-span-3'
										/>
										<SelectComponent
											label='Sexo'
											size='sm:col-span-2'
											handleChange={(e) => handleChangeSelect(e, 'sex')}
											// options={sexData}
											value={values.sex}
											options={'yesAndNo'}
											required={true}
										/>
										<SelectComponent
											label='Cor'
											size='sm:col-span-2'
											handleChange={(e) => handleChangeSelect(e, 'color')}
											// options={colorsData}
											value={values.color}
											options={'yesAndNo'}
											required={true}
										/>
										<div className='col-span-6 sm:col-span-2'>
											<label className='block text-sm font-medium text-gray-700'>
												Data de nascimento
											</label>
											<input
												name='birthday'
												type='date'
												onChange={handleChangeInput}
												required
												className='block mt-1 w-full rounded-md border-gray-300 shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
											/>
										</div>
										<SelectComponent
											label='Estado'
											size='lg:col-span-3'
											handleChange={(e) => handleChangeSelect(e, 'state')}
											// options={statesData}
											value={values.state}
											isSearchable
											options={'yesAndNo'}
											required={true}
										/>
										<SelectComponent
											label='Cidade'
											size='lg:col-span-3'
											isSearchable
											handleChange={(e) => handleChangeSelect(e, 'city')}
											// options={citiesData}
											isDisabled={verifyValue(values.state)}
											options={'yesAndNo'}
											value={values.city}
											required={!verifyValue(values.state)}
										/>
										<SelectComponent
											label='Fonte de Renda'
											size='lg:col-span-3'
											handleChange={(e) =>
												handleChangeSelect(e, 'incomingSource')
											}
											// options={incomingSourcesData}
											options={'yesAndNo'}
											required={true}
											value={values.incomingSource}
										/>
										<Input
											label='O que precisa para sair das ruas?'
											name='getOutReasons'
											type='text'
											required={true}
											handleChange={handleChangeInput}
											size='lg:col-span-3'
										/>
										<SelectComponent
											label='Quer sair das ruas?'
											size='lg:col-span-1'
											handleChange={(e) => handleChangeSelect(e, 'getOut')}
											options={'yesAndNo'}
											required={true}
											value={values.getOut}
										/>
										<SelectComponent
											label='Motivos para estar na rua:'
											size='lg:col-span-5'
											handleChange={(e) => handleChangeSelect(e, 'reasons')}
											// options={reasonsData}
											options={'yesAndNo'}
											isMulti={true}
											required={true}
											value={values.reasons}
										/>
										<SelectComponent
											label='Caso especial?'
											size='lg:col-span-1'
											handleChange={(e) =>
												handleChangeSelect(e, 'isEspecialCase')
											}
											options={'yesAndNo'}
											required={true}
											value={values.isEspecialCase}
										/>
										<SelectComponent
											label='Se sim, quais casos?'
											size='lg:col-span-5'
											handleChange={(e) =>
												handleChangeSelect(e, 'especialCases')
											}
											// options={especialCasesData}
											options={'yesAndNo'}
											isDisabled={verifyValue(values.isEspecialCase)}
											isMulti={true}
											required={!verifyValue(values.isEspecialCase)}
											value={values.especialCases}
										/>
										<SelectComponent
											label='Recebe benefício?'
											size='lg:col-span-1'
											handleChange={(e) => handleChangeSelect(e, 'hasBenefits')}
											options={'yesAndNo'}
											required={true}
											value={values.hasBenefits}
										/>
										<SelectComponent
											label='Se sim, quais benefícios?'
											size='lg:col-span-5'
											handleChange={(e) => handleChangeSelect(e, 'benefits')}
											// options={benefitsData}
											options={'yesAndNo'}
											isDisabled={verifyValue(values.hasBenefits)}
											isMulti={true}
											required={!verifyValue(values.hasBenefits)}
											value={shouldShowMultiValues(
												values.hasBenefits,
												'benefits'
											)}
										/>
									</div>
								</div>
								<div className='px-4 py-3 text-right bg-gray-50 sm:px-6'>
									<button className='inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md border border-transparent shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
										Cadastrar
									</button>
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>
		</>
	);
}

export default withAuth(Dashboard);
