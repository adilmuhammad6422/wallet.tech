import React from 'react';
import Typed from 'react-typed';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Hero = () => {
  const navigate = useNavigate(); // Initialize useNavigate hook

  return (
    <div className='text-black'>
      <div className='max-w-[800px] mt-[-96px] w-full h-screen mx-auto text-center flex flex-col justify-center'>
        <p className='text-[#00df9a] font-bold p-2'>
          LEARN FINANCIAL RESPONSIBILITY
        </p>
        <h1 className='md:text-7xl sm:text-6xl text-4xl font-bold md:py-6'>
          Grow your fiscal knowledge.
        </h1>
        <div className='flex justify-center items-center'>
          <p className='md:text-5xl sm:text-4xl text-xl font-bold py-4'>
            Plan your 
          </p>
          <Typed
            className='md:text-5xl sm:text-4xl text-xl font-bold md:pl-4 pl-2'
            strings={['Monthly Budget.', 'Meal Swipes.', 'Flex Dollars.']}
            typeSpeed={120}
            backSpeed={140}
            loop
          />
        </div>
        <p className='md:text-2xl text-xl font-bold text-gray-500'>Track your budget and make smart money moves.</p>
        <button
          className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'
          onClick={() => navigate('/login')} // Use navigate to change the route
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
