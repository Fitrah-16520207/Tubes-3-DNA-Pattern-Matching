import React, { Component } from 'react'
import axios from 'axios'

const api = 'http://localhost:3001'
export default class Search extends Component {
  constructor(props) {
    super(props)

    this.state = {
      results: [],
      responses: '',
      query: '',
      ok: false
    }
  }

  searchQuery = () => {
    axios.get(api + '/api/searchTest?query=' + encodeURI(this.state.query) )
      .then(res => {
        this.setState({
          results: res.data.result,
          ok : res.data.ok
        })
      })
  
  }
  handleChange = (e) => {
    this.setState({
      query: e.target.value
    })
  }
  render() {
    return (
      <main class="mt-10 mx-auto max-w-screen-lg px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <p className=" text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
              Search result
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
                    name="query"
                    id="query"
                    value ={this.state.query}
                    onChange={this.handleChange}
                    className="mt-5 h-8 pl-5 w-4/5 focus:ring-indigo-500 focus:border-indigo-500 shadow-sm sm:text-sm border-gray-300 rounded-md"
                    placeholder="Search by Date or Name"
                  />
                </div>

              </div>
            </div>
            <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
              <button
                type="button"
                className="mt-3 inline-flex justify-center py-2 px-4 w-52 border-transparent shadow-sm text-sm  rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={this.searchQuery}
              >
                Search
              </button>
            </div>
          </div>
        </form>
        {this.state.ok ?
        <div>
          <table className="w-full mt-10">
            <thead className="bg-gray-100 border-b-2 border-gray-300">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">test_id</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">test_date</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">patient_name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">disease_name</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">positive</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">similarity</th>
              </tr>
            </thead>
            <tbody className="shadow">
              {this.state.results.map(result =>
                <tr className="bg-white" key={result.test_id}>
                  <td className="p-3 text-sm text-indigo-600">{result.test_id}</td>
                  <td className="p-3 text-sm text-gray-900">{result.test_date}</td>
                  <td className="p-3 text-sm text-gray-900">{result.patient_name}</td>
                  <td className="p-3 text-sm text-gray-900">{result.disease_name}</td>
                  <td className="p-3 text-sm text-gray-900">{result.positive}</td>
                  <td className="p-3 text-sm text-gray-900">{result.similarity}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        : null}
      </main>
      
  )}
}