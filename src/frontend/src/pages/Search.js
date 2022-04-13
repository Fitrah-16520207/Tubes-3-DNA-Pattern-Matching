import React from 'react'

export const Search = () => {
  return (
    <main class="mt-10 mx-auto max-w-screen-lg px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:text-center">
          <p className=" text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
            Search Disease
          </p>
        </div>
      </div>
      <form action="#" method="POST">
        <div className="shadow overflow-hidden sm:rounded-md text-center items-center mt-10">
          <div className="px-4 py-5 bg-white sm:p-6">
            <div className="grid grid-cols-2 gap-2">

              <div className="col-span-2 sm:col-span-2 content-center ">
                <input
                  type="text"
                  name="diseaseName"
                  id="diseaseName"
                  autoComplete="on"
                  className="mt-5 h-8 pl-5 w-4/5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                  placeholder="Search by Date or Name"
                />
              </div>

            </div>
          </div>
          <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
            <button
              type="submit"
              className="mt-3 inline-flex justify-center py-2 px-4 w-52 border-transparent shadow-sm text-sm  rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </main>
  )
}

export default Search