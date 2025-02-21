import React from 'react';
import { ThreeDotsScale } from 'react-svg-spinners';

const Loading = () => {
	return (
		<div className='flex justify-center items-center min-h-screen'>
			<ThreeDotsScale />
		</div>
	);
};

export default Loading;