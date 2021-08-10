import {withAuth} from "../../utils";
import Description from "../../components/description";
import {useState} from "react";
import {useListSexQuery} from "../../providers/listSexQuery";
import {Alert} from "../../components";

function Dashboard() {

    const [values, setValues] = useState({});
    const [alert, setAlert] = useState({show: false});
    const {data} = useListSexQuery()

    const handleChange = (e) => {
        const auxValues = {...values};
        auxValues[e.target.name] = e.target.value;
        setValues(auxValues);
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

    console.log(values)

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
                                                <option value="">Selecione</option>
                                                {data.data ? data.data.map(entry =>
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
                                                Cidade
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="city"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
                                        </div>
                                        <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                            <label className="block text-sm font-medium text-gray-700">
                                                Estado
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="state"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
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
                                            <input
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="reasons"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            />
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
                                            <input
                                                disabled={["Não", "Selecione", undefined].includes(values.hasBenefits)}
                                                required
                                                type="text"
                                                onChange={handleChange}
                                                name="benefits"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            />
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
                                            <input
                                                disabled={["Não", "Selecione", undefined].includes(values.isEspecialCase)}
                                                type="text"
                                                required
                                                onChange={handleChange}
                                                name="cases"
                                                className="block mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm disabled:bg-gray-300"
                                            />
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
