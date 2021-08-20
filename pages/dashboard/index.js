//Libs
import {useState} from "react";

//Providers
import {
    useIncomeSourcesQuery,
    useListBenefitsQuery,
    useListCitiesQuery,
    useListColorsQuery,
    useListEspecialCasesQuery,
    useListReasonsQuery,
    useListSexQuery,
    useListStatesQuery
} from "../../providers";

//Aux
import {withAuth} from "../../utils";

//Components
import {Alert, Description} from "../../components";
import Head from "next/head";

function Dashboard() {

    const [values, setValues] = useState({});
    const [alert, setAlert] = useState({show: false});
    const [state, setState] = useState();

    const {data: sexData} = useListSexQuery();
    const {data: colorsData} = useListColorsQuery();
    const {data: reasonsData} = useListReasonsQuery();
    const {data: benefitsData} = useListBenefitsQuery();
    const {data: especialCasesData} = useListEspecialCasesQuery()
    const {data: statesData} = useListStatesQuery();
    const {data: citiesData, refetch} = useListCitiesQuery(state);
    const {data: incomingSourcesData} = useIncomeSourcesQuery();


    const handleChange = (e) => {
        const auxValues = {...values};
        auxValues[e.target.name] = e.target.value;
        setValues(auxValues);
        if (e.target.name === "state")
            getCities(e.target.value)
    };

    const handleSubmit = async (e) => {
        await e.preventDefault();
        if (values.name && values.lastName) {
            setAlert({show: true, color: "red", msg: "Não foi possível realizar o cadastro."})
        } else {
            setAlert({show: true, color: "blue", msg: "Cadastro realizado com sucesso."})
        }
    };

    const handleShow = () => {
        setAlert({show: !alert.show})
    }

    const getCities = async (id) => {
        await setState(id)
        if (!verifyValues(id))
            await refetch()
    }

    const returnOptions = (data, isStateorCity) => {
        if (data && data.status === 200) {
            return data.data.map(entry =>
                <option key={entry.id} value={entry.id}>{isStateorCity ? entry.nome : entry.nomeclatura}</option>
            );
        }
        return null;
    }

    const verifyValues = (value) => {
        return [null, undefined, "Selecione", "Não", "NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES", ""].includes(value);
    }

    const shouldShowValue = (needed, value) => {
        if (!verifyValues(needed))
            return value;
        return "";
    }

    return (
        <>
            <Alert show={alert.show} func={handleShow} label={alert.msg} color={alert.color}/>
            <Head>
                <title>Dashboard Portal-Seas</title>
            </Head>
            <div className="justify-center items-center mt-10">
                <div className="md:grid md:grid-cols-4 md:gap-6">
                    <Description title="Cadastro de cidadão"
                                 desc="Preencha as informações necessárias para cadastrar um cidadão."/>
                    <div className="md:col-span-3">
                        <form onSubmit={handleSubmit}>
                            <div className="overflow-hidden mt-4 shadow sm:rounded-md md:mt-0 md:mr-8">
                                <div className="py-5 px-4 bg-white sm:p-6">
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
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(sexData)}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                className="block text-sm font-medium text-gray-700">
                                                Cor
                                            </label>
                                            <select
                                                name="cor"
                                                onChange={handleChange}
                                                required
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option
                                                    value=""
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(colorsData)}
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                className="block text-sm font-medium text-gray-700">
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
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
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
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(citiesData, true)}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-6">
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
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(incomingSourcesData)}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Quer sair das ruas?
                                            </label>
                                            <select
                                                name="getOut"
                                                onChange={handleChange}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Selecione</option>
                                                <option>Sim</option>
                                                <option>Não</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-5">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Motivos para estar na rua:
                                            </label>
                                            <select
                                                name="reasons"
                                                onChange={handleChange}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option
                                                    value=""
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(reasonsData)}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Recebe benefício?
                                            </label>
                                            <select
                                                name="hasBenefits"
                                                onChange={handleChange}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Selecione</option>
                                                <option>Sim</option>
                                                <option>Não</option>
                                            </select>
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-5">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Se sim, quais benefícios?
                                            </label>
                                            <select
                                                name="benefits"
                                                value={shouldShowValue(values.hasBenefits, values.benefits)}
                                                onChange={handleChange}
                                                disabled={verifyValues(values.hasBenefits)}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            >
                                                <option
                                                    value=""
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(benefitsData)}
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Caso especial?
                                            </label>
                                            <select
                                                name="isEspecialCase"
                                                onChange={handleChange}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option value="">Selecione</option>
                                                <option>Sim</option>
                                                <option>Não</option>
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-5">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Se sim, qual caso?
                                            </label>
                                            <select
                                                name="especialCase"
                                                value={shouldShowValue(values.isEspecialCase, values.especialCase)}
                                                onChange={handleChange}
                                                disabled={verifyValues(values.isEspecialCase)}
                                                required
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            >
                                                <option
                                                    value=""
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {returnOptions(especialCasesData)}
                                            </select>
                                        </div>

                                    </div>
                                </div>
                                <div className="py-3 px-4 text-right bg-gray-50 sm:px-6">
                                    <button
                                        className="inline-flex justify-center py-2 px-4 text-sm font-medium text-white bg-gray-700 rounded-md border border-transparent shadow-sm hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    >
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

export default withAuth(Dashboard)
