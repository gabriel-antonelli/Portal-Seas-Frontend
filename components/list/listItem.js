export function ListItem(props) {
	return (
		<div className='flex-1 pl-1 mr-16'>
			<div className='font-medium dark:text-white'>
				{props.title.toUpperCase()}
			</div>
			<div className='text-gray-600 dark:text-gray-200 text-sm'>
				{props.subtitle}
			</div>
		</div>
	);
}
