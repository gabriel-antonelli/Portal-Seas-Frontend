//Libs
import { useState } from 'react';
import Select from 'react-select';

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
import { withAuth } from '../../utils';

//Components
import { Alert, Description } from '../../components';
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
	const { data: citiesData, refetch } = useListCitiesQuery(state);
	const { data: incomingSourcesData } = useIncomeSourcesQuery();
	const { refetch: createRefetch } = useCreateCitizenQuery(values);

	const handleChange = (e, name) => {
		const auxValues = { ...values };
		if (name) {
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
			auxValues[e.target.name] = e.target.value;
			if (e.target.name === 'state') {
				getCities(e.target.value);
			}
		}
		setValues(auxValues);
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
				color: 'red',
				msg: 'Não foi possível realizar o cadastro.',
			});
		}
	};

	const getCities = async (id) => {
		await setState(id);
		if (!verifyValues(id)) {
			await refetch();
		}
	};

	const returnOptions = (data, isStateorCity) => {
		if (data && data.success) {
			return data.data.map((entry) => (
				<option key={entry.id} value={entry.id}>
					{isStateorCity ? entry.nome : entry.nomeclatura}
				</option>
			));
		}
		return null;
	};

	const verifyValues = (value) => {
		return [
			null,
			undefined,
			'Selecione',
			'Não',
			'NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES',
			'',
		].includes(value);
	};

	const shouldShowMultiValues = (value, name) => {
		if (!verifyValues(value)) {
			return undefined;
		} else if (!verifyValues(values[name])) {
			const auxValues = { ...values };
			auxValues[name] = null;
			setValues(auxValues);
		}
		return null;
	};

	const shouldShowValue = (needed, value) => {
		if (!verifyValues(needed)) {
			return value;
		}
		return null;
	};

	const returnOptionsMulti = (data) => {
		let options = [];
		if (data && data.status === 200) {
			data.data.map((entry) =>
				options.push({ value: entry.id, label: entry.nomeclatura })
			);
			return options;
		}
		return [];
	};

	return (
		<>
			<Alert
				show={alert.show}
				func={() => setAlert({ show: !alert.show })}
				label={alert.msg}
				color={alert.color}
			/>
			<Head>
				<title>Cadastro de Cidadão</title>
			</Head>
			<div className="justify-center items-center mt-10">
				<div className="md:grid md:grid-cols-4 md:gap-6">
					<Description
						title="Cadastro de cidadão"
						desc="Preencha as informações necessárias para cadastrar um cidadão."
					/>
					<div className="md:col-span-3">
						<form onSubmit={handleSubmit}>
							<div className="overflow-hidden mt-4 shadow sm:rounded-md md:mt-0 md:mr-8">
								<div className="px-4 py-5 bg-white sm:p-6">
									<div className="grid grid-cols-6 gap-6">
										<div className="col-span-6 sm:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												Nome
											</label>
											<input
												name="name"
												type="text"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												Sobrenome
											</label>
											<input
												name="lastName"
												type="text"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-2">
											<label className="block text-sm font-medium text-gray-700">
												Sexo
											</label>
											<select
												name="sex"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option
													value=""
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm"
												>
													Selecione
												</option>
												{returnOptions(sexData)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label className="block text-sm font-medium text-gray-700">
												Cor
											</label>
											<select
												name="color"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option
													value=""
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm"
												>
													Selecione
												</option>
												{returnOptions(colorsData)}
											</select>
										</div>
										<div className="col-span-6 sm:col-span-3 lg:col-span-2">
											<label className="block text-sm font-medium text-gray-700">
												Data de nascimento
											</label>
											<input
												name="birthday"
												type="date"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												Estado
											</label>
											<select
												name="state"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option
													value=""
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm"
												>
													Selecione
												</option>
												{returnOptions(statesData, true)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												Cidade
											</label>
											<select
												name="city"
												value={shouldShowValue(values.state, values.city)}
												onChange={handleChange}
												disabled={verifyValues(state)}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
											>
												<option
													value=""
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm"
												>
													Selecione
												</option>
												{returnOptions(citiesData, true)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												Fonte de Renda
											</label>
											<select
												name="incomingSource"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
											>
												<option
													value=""
													className="block mt-1 w-full rounded-md border-gray-300 shadow-sm"
												>
													Selecione
												</option>
												{returnOptions(incomingSourcesData)}
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-3">
											<label className="block text-sm font-medium text-gray-700">
												O que precisa para sair das ruas?
											</label>
											<input
												name="getOutReasons"
												type="text"
												onChange={handleChange}
												required
												className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-1">
											<label className="block text-sm font-medium text-gray-700">
												Quer sair das ruas?
											</label>
											<select
												name="getOut"
												onChange={handleChange}
												required
												className="block px-3 py-2 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option value="">Selecione</option>
												<option value={true}>Sim</option>
												<option value={false}>Não</option>
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-5">
											<label className="block text-sm font-medium text-gray-700">
												Motivos para estar na rua:
											</label>
											<Select
												onChange={(e) => handleChange(e, 'reasons')}
												options={returnOptionsMulti(reasonsData)}
												placeholder={
													<div className="text-black">Selecione</div>
												}
												isSearchable={false}
												isMulti
												className="block mt-1 w-full placeholder-gray-500 border-gray-300 shadow-sm sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-1">
											<label className="block text-sm font-medium text-gray-700">
												Caso especial?
											</label>
											<select
												name="isEspecialCase"
												onChange={handleChange}
												required
												className="block px-3 py-2 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option value="">Selecione</option>
												<option>Sim</option>
												<option>Não</option>
											</select>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-5">
											<label className="block text-sm font-medium text-gray-700">
												Se sim, quais casos?
											</label>
											<Select
												onChange={(e) => handleChange(e, 'especialCases')}
												options={returnOptionsMulti(especialCasesData)}
												value={shouldShowMultiValues(
													values.isEspecialCase,
													'especialCases'
												)}
												isDisabled={verifyValues(values.isEspecialCase)}
												placeholder={
													<div className="text-black">Selecione</div>
												}
												isSearchable={false}
												maxMenuHeight={80}
												isMulti
												className="block mt-1 w-full placeholder-gray-500 border-gray-300 shadow-sm sm:text-sm"
											/>
										</div>

										<div className="col-span-6 sm:col-span-6 lg:col-span-1">
											<label className="block text-sm font-medium text-gray-700">
												Recebe benefício?
											</label>
											<select
												name="hasBenefits"
												onChange={handleChange}
												required
												className="block px-3 py-2 mt-1 w-full placeholder-gray-500 bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											>
												<option value="" className="bg-fuchsia-500">
													Selecione
												</option>
												<option>Sim</option>
												<option>Não</option>
											</select>
										</div>
										<div className="col-span-6 sm:col-span-6 lg:col-span-5">
											<label className="block text-sm font-medium text-gray-700">
												Se sim, quais benefícios?
											</label>
											<Select
												onChange={(e) => handleChange(e, 'benefits')}
												options={returnOptionsMulti(benefitsData)}
												value={shouldShowMultiValues(
													values.hasBenefits,
													'benefits'
												)}
												isDisabled={verifyValues(values.hasBenefits)}
												placeholder={
													<div className="text-black">Selecione</div>
												}
												isSearchable={false}
												isMulti
												maxMenuHeight={80}
												className="block mt-1 w-full placeholder-gray-500 border-gray-300 shadow-sm sm:text-sm"
											/>
										</div>
									</div>
								</div>
								<div className="px-4 py-3 text-right bg-gray-50 sm:px-6">
									<button className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded-md border border-transparent shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
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
