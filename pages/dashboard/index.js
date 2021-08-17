import {withAuth} from "../../utils";
import Description from "../../components/description";
import {useState} from "react";
import {useListSexQuery} from "../../providers/listSexQuery";
import {Alert} from "../../components";
import {useListStatesQuery} from "../../providers/listStatesQuery";
import {useListCitiesQuery} from "../../providers/listCitiesQuery";
import {useListReasonsQuery} from "../../providers/listReasonsQuery";
import {useListBenefitsQuery} from "../../providers/listBenefitsQuery";
import {useListEspecialCasesQuery} from "../../providers/listEspecialCasesQuery";

function Dashboard() {

    const [values, setValues] = useState({});
    const [alert, setAlert] = useState({show: false});
    const [state, setState] = useState();

    const {data: sexData, isSuccess: sexSuccess} = useListSexQuery();
    const {data: reasonsData} = useListReasonsQuery();
    const {data: benefitsData} = useListBenefitsQuery();
    const {data: especialCasesData} = useListEspecialCasesQuery()
    const {data: statesData} = useListStatesQuery();
    const {data: citiesData, refetch} = useListCitiesQuery(state);


    const handleChange = (e) => {
        const auxValues = {...values};
        auxValues[e.target.name] = e.target.value;
        setValues(auxValues);
        if (e.target.name === "state")
            getCities(e.target.value)
    };

    const handleSubmit = async (e) => {
        await e.preventDefault();
        if (values.name === "teste") {
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
        if (![null, undefined, "Selecione", "NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES"].includes(id))
            await refetch()
    }
    
    console.log(citiesData ? citiesData.status : citiesData)
    
    return (
        <>
            <Alert show={alert.show} func={handleShow} label={alert.msg} color={alert.color}/>
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
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="name"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sobrenome
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="lastName"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Sexo
                                            </label>
                                            <select
                                                onChange={handleChange}
                                                required
                                                name="sex"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {sexData && sexData.status === 200 ? sexData.data.map(entry =>
                                                        <option key={entry.id}>{entry.nomeclatura}</option>
                                                    ) :
                                                    <option>NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                className="block text-sm font-medium text-gray-700">
                                                Cor
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="cor"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                            <label
                                                className="block text-sm font-medium text-gray-700">
                                                Data de nascimento
                                            </label>
                                            <input
                                                type="date"
                                                required
                                                onChange={handleChange}
                                                name="birthday"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm cursor-pointer focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>


                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Estado
                                            </label>
                                            <select
                                                onChange={handleChange}
                                                required
                                                name="state"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {statesData && statesData.status === 200 ? statesData.data.map(entry =>
                                                        <option key={entry.id} value={entry.id}>{entry.nome}</option>
                                                    ) :
                                                    <option value="">NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Cidade
                                            </label>
                                            <select
                                                onChange={handleChange}
                                                required
                                                disabled={[undefined, "NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES", "Selecione"].includes(state)}
                                                name="city"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {citiesData && citiesData.status === 200 ? citiesData.data.map(entry =>
                                                        <option key={entry.id}>{entry.nome}</option>
                                                    ) :
                                                    <option>NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Quer sair das ruas?
                                            </label>
                                            <select
                                                name="getOut"
                                                required
                                                onChange={handleChange}
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
                                                required
                                                onChange={handleChange}
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {reasonsData && reasonsData.status === 200 ? reasonsData.data.map(entry =>
                                                        <option key={entry.id}>{entry.nomeclatura}</option>
                                                    ) :
                                                    <option>NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Recebe benefício?
                                            </label>
                                            <select
                                                name="hasBenefits"
                                                required
                                                onChange={handleChange}
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option>Selecione</option>
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
                                                required
                                                disabled={["Não", "Selecione", undefined].includes(values.hasBenefits)}
                                                onChange={handleChange}
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {benefitsData && benefitsData.status === 200 ? benefitsData.data.map(entry =>
                                                        <option key={entry.id}>{entry.nomeclatura}</option>
                                                    ) :
                                                    <option>NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
                                            </select>
                                        </div>

                                        <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Caso especial?
                                            </label>
                                            <select
                                                name="isEspecialCase"
                                                required
                                                onChange={handleChange}
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            >
                                                <option>Selecione</option>
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
                                                required
                                                disabled={["Não", "Selecione", undefined].includes(values.isEspecialCase)}
                                                onChange={handleChange}
                                                className="block py-2 px-3 mt-1 w-full bg-white rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            >
                                                <option
                                                    className="block mt-1 w-full rounded-md border-gray-300 shadow-sm">Selecione
                                                </option>
                                                {especialCasesData && especialCasesData.status === 200 ? especialCasesData.data.map(entry =>
                                                        <option key={entry.id}>{entry.nomeclatura}</option>
                                                    ) :
                                                    <option>NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES</option>
                                                }
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
