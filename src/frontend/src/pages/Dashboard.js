import React from 'react'
import { Link } from "react-router-dom";
export const Dashboard = () => {
    return (
        <div>
            <main className="mt-10 mx-auto max-w-screen-2xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                <div className="sm:text-center lg:text-left">
                    <h1 className="text-6xl tracking-tight font-extrabold text-gray-900 sm:text-7xl md:text-8xl">
                        <span className="block xl:inline">Astra</span>
                        <span className="block text-indigo-600 xl:inline">Jenaka</span>
                    </h1>
                    <h2 className="text-2xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-6xl">
                        <span className="block xl:inline">Get a free DNA test to check </span>
                    </h2>
                    <h2 className="text-2xl tracking-tight font-bold text-gray-900 sm:text-4xl md:text-6xl">
                        <span>if you have genetic disorder</span>
                    </h2>
                    <p className="mt-3 text-base text-gray-500 sm:mt-6 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-7 md:text-xl lg:mx-0">
                        check your DNA to see if you have a genetic disorder. You can also enter disease and DNA data into our database, and view other people's disease history
                    </p>
                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                        <div className="rounded-md shadow">
                            <Link to="/TestDNA" className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"> Get started </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}

export default Dashboard