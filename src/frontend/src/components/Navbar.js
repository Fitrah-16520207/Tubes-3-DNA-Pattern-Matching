import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
      <div className="min-h-full">
          <nav className="bg-gray-800">
              <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex items-center justify-between h-16">
                      <div className="flex items-center">
                          <div className="flex-shrink-0">
                              {/* add image here */}
                              <img className="h-8 w-8" src="" alt="Aj"/>
                          </div>
                          <div className=" md:block">
                              <div className="ml-10 flex items-baseline space-x-4">
                                  <Link to="/Dashboard" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium" >Dashboard</Link>
                                    
                                  <Link to="/TestDNA" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Test DNA</Link>

                                  <Link to="/AddDisease" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Add Disease</Link>

                                  <Link to="/Search" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">Search</Link>

                                  <Link to="/AboutUs" className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">About Us</Link>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </nav>
      </div>
  )
}

export default Navbar