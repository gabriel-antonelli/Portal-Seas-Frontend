import {withAuth} from "../../utils";
import Description from "../../components/description";
import {useState} from "react";
import {useListSexQuery} from "../../providers/listSexQuery";

function Dashboard() {

    const [values, setValues] = useState({});
    const {data} = useListSexQuery()

    const handleChange = (event) => {
        const auxValues = {...values};
        auxValues[event.target.name] = event.target.value;
        setValues(auxValues);
    };

    console.log(values)

    return (
        <div className="justify-center items-center mt-10">
            <div className="md:grid md:grid-cols-4 md:gap-6">
                <Description title="Cadastro de cidadão"
                             desc="Preencha as informações necessárias para cadastrar um cidadão."/>
                <div className="md:col-span-3">
                    <form>
                        <div className="shadow overflow-hidden sm:rounded-md md:mt-0 md:mr-8 mt-4">
                            <div className="px-4 py-5 bg-white sm:p-6">
                                <div className="grid grid-cols-6 gap-6">
                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Nome
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="name"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Sobrenome
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="lastName"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Sexo
                                        </label>
                                        <select
                                            onChange={handleChange}
                                            name="sex"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        >
                                            <option>Selecione uma opção</option>
                                            {data.data.map(entry =>
                                                <option key={entry.id}>{entry.nomeclatura}</option>
                                            )}
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-gray-700">
                                            Cor
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="cor"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                        <label
                                            className="block text-sm font-medium text-gray-700">
                                            Data de nascimento
                                        </label>
                                        <input
                                            type="date"
                                            onChange={handleChange}
                                            name="birthday"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md cursor-pointer"
                                        />
                                    </div>


                                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Cidade
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="city"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-3">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Estado
                                        </label>
                                        <input
                                            type="text"
                                            onChange={handleChange}
                                            name="state"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Quer sair das ruas?
                                        </label>
                                        <select
                                            name="getOut"
                                            onChange={handleChange}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
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
                                            onChange={handleChange}
                                            name="reasons"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Recebe benefício?
                                        </label>
                                        <select
                                            name="hasBenefits"
                                            onChange={handleChange}
                                            onChange={handleChange}
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option value="Sim">Sim</option>
                                            <option value="Não">Não</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-5">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Se sim, quais benefícios?
                                        </label>
                                        <input
                                            disabled={values.hasBenefits === "Não"}
                                            type="text"
                                            onChange={handleChange}
                                            name="benefits"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-300"
                                        />
                                    </div>

                                    <div className="col-span-6 sm:col-span-6 lg:col-span-1">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Caso especial?
                                        </label>
                                        <select
                                            name="isEspecialCase"
                                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        >
                                            <option>Sim</option>
                                            <option>Não</option>
                                        </select>
                                    </div>
                                    <div className="col-span-6 sm:col-span-6 lg:col-span-5">
                                        <label className="block text-sm font-medium text-gray-700">
                                            Se sim, qual caso?
                                        </label>
                                        <input
                                            disabled
                                            type="text"
                                            onChange={handleChange}
                                            name="cases"
                                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md disabled:bg-gray-300"
                                        />
                                    </div>

                                </div>
                            </div>
                            <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                                <button
                                    type="submit"
                                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                >
                                    Cadastrar
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withAuth(Dashboard)
