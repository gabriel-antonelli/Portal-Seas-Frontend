export const verifyValue = (value) => {
	return [
		null,
		undefined,
		'Selecione',
		'Não',
		'NÃO FOI POSSÍVEL CARREGAR AS OPÇÕES',
		'',
	].includes(value);
};

const getIdsOnly = (array) => {
	const newArray = [];
	array.forEach(e => newArray.push(e.id));
	return newArray;
}

export const convertValues = (values, send) => {
	if (send) {
		return {
			beneficios: values.benefits,
			casosEspeciais: values.especialCases,
			cidadeNascimento: values.city,
			cor: values.color,
			dataNascimento: values.birthday,
			fonteDeRenda: values.incomingSource,
			motivos: values.reasons,
			nome: values.name,
			precisaParaSairRua: values.getOutReasons,
			querSairDasRuas: values.getOut,
			sexo: values.sex,
		};
	}
	return {
		benefits: getIdsOnly(values.beneficios),
		especialCases: getIdsOnly(values.casosEspeciais),
		city: values.cidadeNascimento.id,
		name: values.nome,
		sex: values.sexo.id,
		color: values.cor.id,
		birthday: values.dataNascimento,
		state: values.cidadeNascimento.estado.id,
		incomingSource: values.fonteDeRenda.id,
		getOutReasons: values.precisaParaSairRua,
		getOut: values.querSairDasRuas ? "Sim" : "Não",
		reasons: getIdsOnly(values.motivos),
		isEspecialCase: values.casosEspeciais.length > 0 ? "Sim" : "Não",
		hasBenefits: values.beneficios.length > 0 ? "Sim" : "Não",
	};
};



