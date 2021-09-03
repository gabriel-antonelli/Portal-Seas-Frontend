import Select from 'react-select';

export function SelectComponent(props) {
	const returnOptionsMulti = (data) => {
		const options = [];
		if (data && data.status === 200) {
			data.data.map((entry) =>
				options.push({ value: entry.id, label: entry.nomeclatura })
			);
			return options;
		}
		return [{ value: 'Sem opções', label: 'Sem Opções' }];
	};

	return (
		<div className={`col-span-6 sm:${props.size}`}>
			<label className='block text-sm font-medium text-gray-700'>
				{props.label}
			</label>
			<Select
				onChange={props.handleChange}
				options={returnOptionsMulti(props.options)}
				name={props.name}
				placeholder={<div className='text-black'>Selecione</div>}
				isSearchable={false}
				isMulti={props.isMulti}
				required={true}
				className='block mt-1 w-full placeholder-gray-500 border-gray-300 shadow-sm sm:text-sm'
			/>
		</div>
	);
}
