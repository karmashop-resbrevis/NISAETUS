import React from 'react';
import { ThreeDotsScale } from 'react-svg-spinners';

const Loading = () => {
  return (
    <div className='flex justify-center items-center h-[5vh]'>
      <ThreeDotsScale/>
    </div>
  );
};

export default Loading;