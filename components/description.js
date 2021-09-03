export function Description(props) {
	return (
		<div className='justify-center items-center'>
			<div className='md:col-span-2'>
				<div className='px-4 shadow rounded-md mx-5'>
					<h3 className='text-lg font-medium leading-6 text-gray-900'>
						{props.title}
					</h3>
					<p className='mt-1 text-sm text-gray-600'>{props.desc}</p>
				</div>
			</div>
		</div>
	);
}
