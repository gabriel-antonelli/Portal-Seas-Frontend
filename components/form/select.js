import Select, { components } from 'react-select';

export function SelectComponent(props) {
	const returnOptionsMulti = (data) => {
		const options = [];
		if (data === 'yesAndNo') {
			return [
				{
					value: 'Sim',
					label: 'Sim',
				},
				{
					value: 'Não',
					label: 'Não',
				},
				{
					value: 'Sim',
					label: 'Sim',
				},
				{
					value: 'Não',
					label: 'Não',
				},
				{
					value: 'Sim',
					label: 'Sim',
				},
				{
					value: 'Não',
					label: 'Não',
				},
				{
					value: 'Sim',
					label: 'Sim',
				},
				{
					value: 'Não',
					label: 'Não',
				},
			];
		}
		if (data && data.status === 200) {
			data.data.map((entry) =>
				options.push({ value: entry.id, label: entry.nomeclatura })
			);
			return options;
		}
		return [];
	};

	const NoOptionsMessage = (propsSelect) => {
		return (
			<components.NoOptionsMessage {...propsSelect}>
				<span className='custom-css-class'>
					Não foi possível carregar as opções
				</span>
			</components.NoOptionsMessage>
		);
	};

	const customStyles = {
		control: (base) => ({
			...base,
			'*': {
				boxShadow: 'none !important',
			},
		}),
	};

	return (
		<div className={`col-span-6 ${props.size}`}>
			<label className='block text-sm font-medium text-gray-700'>
				{props.label}
			</label>
			<Select
				onChange={props.handleChange}
				options={returnOptionsMulti("yesAndNo")}
				// value={props.isDisabled && ""}
				placeholder={<div className='text-black'>Selecione</div>}
				isSearchable={!!props.isSearchable}
				components={{ NoOptionsMessage }}
				isMulti={!!props.isMulti}
				isDisabled={props.isDisabled}
				styles={customStyles}
				maxMenuHeight={80}
				className='block mt-1 w-full sm:border-red-300 sm:text-sm'
			/>
			<input
				autoComplete='off'
				style={{
					opacity: 0,
					height: '1px',
					position: 'absolute',
				}}
				required={props.required}
				value={props.value}
			/>
		</div>
	);
}
