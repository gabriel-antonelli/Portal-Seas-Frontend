export function ListItem(props) {
	return (
		<div className='flex-1 '>
			<div className='font-medium text-sm mr-1'>
				{props.title.toUpperCase()}
			</div>
			<div className='text-gray-600 text-sm'>
				{props.subtitle}
			</div>
		</div>
	);
}
