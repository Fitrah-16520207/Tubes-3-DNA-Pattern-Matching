import React, { Component} from 'react'
import axios from 'axios'

const api = "http://localhost:3001"

export default class AddDisease extends Component {
  constructor(props) {
    super(props)
    this.state = {
      diseaseName:'',
      sequenceDNA:'',
      message: "",
      overwrite_existing: false,
      visible: false,
      ok: true
    }
    this.uploadFile = this.uploadFile.bind(this)
  }

  AddDisease = () => {
    let data = JSON.stringify({
      disease_name: this.state.diseaseName,
      disease_dna_sequence: this.state.sequenceDNA,
      overwrite_existing: this.state.overwrite_existing,
    });

    axios.post(api + '/api/addDisease', data, 
      {
        headers: { "Content-Type": "application/json"},
    })
    .then(res => {
      this.setState({
        message: "Disease added successfully",
        ok: true
      })
    })
    .catch(err => {
      this.setState({
        message: err.response.data.description,
        ok:false
      })
    })
    this.setState({
      visible: true
    })
  }

  handleChange = (e) => {
    this.setState({ visible: false })
    this.setState({[e.target.name]: e.target.value})
  }

  handleChangeCheckBox = (e) => {
    const { checked } = e.target
    this.setState({
      overwrite_existing : checked
    })
  }

  uploadFile(event) {
    this.setState({ visible: false })
    let file = event.target.files[0];
    let reader = new FileReader();
    reader.onloadend = () => {
      this.setState({
        sequenceDNA: reader.result
      })
    }
    reader.readAsText(file);
  }


  render() {
    
    return (
      <div>
        <div className="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
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
                <div className="grid grid-cols-6 gap-6">

                  <div className="col-span-4 sm:col-span-4 lg:col-span-2 center">
                    <label htmlFor="diseaseName" className=" text-sm font-medium text-gray-700">
                      Disease Name
                    </label>
                    <input
                      type="text"
                      name="diseaseName"
                      value = {this.state.diseaseName}
                      onChange = {this.handleChange}
                      id="diseaseName"
                      autoComplete="on"
                      className="mt-5 h-8 pl-5 w-full focus:ring-indigo-500 focus:border-indigo-500  shadow-sm sm:text-sm border-gray-300 rounded-md"
                      placeholder="<diseaseName>"
                    />
                  </div>

                  <div className="col-span-4 sm:col-span-4 lg:col-span-2 center">
                    <label htmlFor="SequenceDNA" className=" text-sm font-medium text-gray-700">
                      Sequence DNA
                    </label>
                    <div className=" mt-5 w-ful flex justify-center px-6 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">

                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                          >
                            <span>Upload a file</span>
                            <input 
                              id="file-upload" 
                              name="file-upload" 
                              type="file" 
                              className="sr-only content-center" 
                              onChange={this.uploadFile }
                            />
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 sm:col-span-2 lg:col-span-2 center">
                  <div className="flex items-start">
                    <div className="flex items-center h-28">
                      <input
                        id="overwrite_existing"
                        name="overwrite_existing"
                        type="checkbox"
                        // value = {this.state.overwrite_existing}
                        onChange={e => this.handleChangeCheckBox(e)}
                        className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="comments" className="text-sm font-medium text-gray-700 pt-3">
                        Overwrite
                      </label>
                      <p className="text-gray-500 pt-5">Change the curent sequence DNA if has same name disease</p>
                    </div>
                  </div>
                </div>
                </div>
              </div>
              <div className=" px-4 py-3 bg-gray-50 text-center sm:px-6">
                <button
                  type="button"
                  className="mt-5 inline-flex justify-center py-2 px-4 w-52 border-transparent shadow-sm text-sm  rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  onClick={this.AddDisease}
                >
                  Send
                </button>
              </div>
            </div>
          </form>
          
        </div>
        {this.state.visible ?
        <div className="mt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden sm:rounded-md text-center items-center ">
              <div className={this.state.ok ? "px-4 py-5 bg-indigo-600 sm:p-6" : "px-4 py-5 bg-red-500 sm:p-6"}>
              <div className="lg:text-center">
                <p className= "text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl" >
                  {this.state.message}
                  </p>
              </div>
            </div>
          </div>
        </div>
        : null} 
      </div>
    )
  }
  
}