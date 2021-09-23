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
