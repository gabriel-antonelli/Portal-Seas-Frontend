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

export const shouldShowAnyValue = (needed, value) => {
	if (!verifyValue(needed)) {
		return value;
	}
	return null;
};
