import React from 'react'
import img1profile from '../assets/img/profile.png'

export const AboutUs = () => {
  return (
    <div className="mt-10 mx-auto max-w-screen-lg px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className=" text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl ">
            About Us
          </p>
        </div>
      </div>
      <div className="shadow overflow-hidden sm:rounded-md text-center items-center mt-10 ">
        <div className="px-4 py-5 bg-white sm:p-6">
          <div className="grid grid-cols-6 gap-6">

            <div className="col-span-6 sm:col-span-6 lg:col-span-2 mx-10">
              <img src={img1profile} className= "rounded-full"/>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-3">
                13520116 Mahesa Lizardy
              </label>
              
            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2 mx-10">
              <img src={img1profile} className="rounded-full"/>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-3">
                13520030 Fitrah Ramadhani N.
              </label>

            </div>
            <div className="col-span-6 sm:col-span-6 lg:col-span-2 mx-10">
              <img src={img1profile} className="rounded-full"/>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mt-3">
                13520146 Bryan Amirul Husna
              </label>

            </div>
            
          </div>
        </div>
      </div>
      
    </div>
  )
}

export default AboutUs