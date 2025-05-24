import { useState } from 'react'
import GadgetCarousel from '../components/Carousel'
import {ShieldCheck, Truck, Wrench, Smartphone, Laptop, Headset} from 'lucide-react';
import {Link} from 'react-router-dom'
import iphone from '../assets/iphone.png'
import laptop from '../assets/laptop.png'
import headphones from '../assets/headphones.png'

function Index() {
  return (
    <>
    <GadgetCarousel></GadgetCarousel>
    <div className="md:flex md:justify-center mt-20">
      <div className="flex md:flex-row flex-nowrap overflow-x-auto md:overflow-visible gap-6 sm:gap-10 lg:gap-60 px-4 sm:px-0">
        <div className="flex flex-col items-center min-w-[150px]">
          <ShieldCheck className="w-12 h-12 lg:w-25 lg:h-25" />
          <h1 className="text-center mt-5 text-lg lg:text-2xl">Certified Reseller</h1>
        </div>

        <div className="flex flex-col items-center min-w-[150px]">
          <Truck className="w-12 h-12 lg:w-25 lg:h-25" />
          <h1 className="text-center mt-5 text-lg lg:text-2xl">Nationwide Delivery</h1>
        </div>

        <div className="flex flex-col items-center min-w-[150px]">
          <Wrench className="w-12 h-12 lg:w-25 lg:h-25" />
          <h1 className="text-center mt-5 text-lg lg:text-2xl">Warranty Policy</h1>
        </div>
      </div>
    </div>

    <h1 className='text-4xl lg:text-5xl font-bold text-center mt-20'>Shop Now</h1>
    <hr className="h-px my-8 bg-gray-200 border-2 dark:bg-gray-700 mx-auto w-2/3" />
    <div className="w-full flex flex-col lg:flex-row justify-center items-center gap-7 lg:gap-15 mt-10 mb-10">

      <Link to='/phones'>
        <div className='flex flex-col items-center bg-gray-300 rounded-2xl shadow-2xl group'>
          <h1 className='text-3xl font-bold mt-3'>Phones</h1>
          <img className="rounded-xl w-90 h-90 scale-90 transition-transform transform group-hover:scale-105" src={iphone} alt="Phones" />
        </div>
      </Link>

      <Link to='/laptops'>
        <div className='flex flex-col items-center bg-gray-300 rounded-2xl shadow-2xl group'>
          <h1 className='text-3xl font-bold mt-3'>Laptops</h1>
          <img className="rounded-xl w-90 mt-10 mb-10 h-70 scale-90 transition-transform transform group-hover:scale-105" src={laptop} alt="Laptops" />
        </div>
      </Link>

      <Link to='/accessories'>
        <div className='flex flex-col items-center bg-gray-300 rounded-2xl shadow-2xl group'>
          <h1 className='text-3xl font-bold mt-3'>Accessories</h1>
          <img className="rounded-xl p-5 w-85 h-90 scale-90 transition-transform transform group-hover:scale-105" src={headphones} alt="Accessories" />
        </div>
      </Link>
    </div>
    </>
  )
}

export default Index