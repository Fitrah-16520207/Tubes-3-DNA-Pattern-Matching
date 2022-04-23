import React from 'react'
import axios from 'axios'

export const AddDisease = () => {
  // const [diseaseName, setDiseaseName] = React.useState('')
  // const [diseaseDescription, setDiseaseDescription] = React.useState('')
  // const [diseaseSymptoms, setDiseaseSymptoms] = React.useState('')
  
  // const handleSubmit = (e) => {
  //   e.preventDefault()
  //   axios.post('http://localhost:5000/api/diseases', {
  //     diseaseName,
  //     diseaseDescription,
  //     diseaseSymptoms
  //   })
  //   .then(res => {
  //     console.log(res.data)
  //   }
  //   )
  //   .catch(err => {
  //     console.log(err)
  //   }
  //   )
  return (
    <div>
      <div class="mt-10 mx-auto max-w-screen-lg px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className=" text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Add Disease
            </p>
          </div>
        </div>
        <form action="#" method="POST">
          <div className="shadow overflow-hidden sm:rounded-md text-center items-center mt-10">
            <div className="px-4 py-5 bg-white sm:p-6">
              <div className="grid grid-cols-4 gap-4">

                <div className="col-span-4 sm:col-span-4 lg:col-span-2 center">
                  <label htmlFor="diseaseName" className=" text-sm font-medium text-gray-700">
                    Disease Name
                  </label>
                  <input
                    type="text"
                    name="diseaseName"
                    id="diseaseName"
                    autoComplete="on"
                    className="mt-5 h-8 pl-5 w-full focus:ring-indigo-500 focus:border-indigo-500  shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="<diseaseName>"
                  />
                </div>

                <div className="col-span-4 sm:col-span-4 lg:col-span-2 center">
                  <label htmlFor="SequenceDna" className=" text-sm font-medium text-gray-700">
                    Sequence DNA
                  </label>
                  <div className=" mt-5 w-ful flex justify-center px-6 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">

                      <div className="flex  text-sm text-gray-600">
                        <label
                          htmlFor="file-upload"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                        >
                          <span>Upload a file</span>
                          <input id="file-upload" name="file-upload" values= "" type="file" className="sr-only content-center" />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-10 px-4 py-3 bg-gray-50 text-center sm:px-6">
              <button
                type="submit"
                className="mt-5 inline-flex justify-center py-2 px-4 w-52 border-transparent shadow-sm text-sm  rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Send
              </button>
            </div>
          </div>
        </form>
        
      </div>
      <div className="mt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="shadow overflow-hidden sm:rounded-md text-center items-center ">
          <div className="px-4 py-5 bg-indigo-600 sm:p-6">
            <div className="lg:text-center">
              <p className=" text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl">
                Sucessfully added!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddDisease