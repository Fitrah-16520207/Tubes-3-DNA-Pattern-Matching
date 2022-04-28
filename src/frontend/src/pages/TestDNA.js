
import React, { Component } from 'react'
import axios from 'axios'

const api = process.env.BACKEND_ADDRESS || 'http://localhost:3001'

export default class TestDNA extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            diseasePredict: '',
            sequenceDNA: '',
            visible: false,
            ok: true,
            message: '',
            result:[],
        }
        this.uploadFile = this.uploadFile.bind(this)

    }
    handleChange = (e) => {
        this.setState({ visible: false})
        this.setState({ [e.target.name]: e.target.value })
    }
    
    AddTest = () => {
        let data = JSON.stringify({
            patient_name: this.state.name,
            disease_name: this.state.diseasePredict,
            patient_dna_sequence: this.state.sequenceDNA,
        });

        axios.post(api + '/api/testDisease', data,
            {
                headers: { "Content-Type": "application/json" },
            }).then
            (res => {
                this.setState({
                    result: res.data.result,
                    ok : true
                })
            }
            ).catch(err => {
                this.setState({
                    message: err.response.data.description,
                    ok: false
                })
            })
        
        this.setState({ visible: true })
    }

    uploadFile(event) {
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

            <main class="mt-10 mx-auto max-w-screen-xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-10 lg:px-8 xl:mt-15 " >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <p className=" text-3xl leading-8 font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Test Your DNA
                        </p>
                    </div>
                </div>
                <form action="#" method="POST">
                    <div className="shadow overflow-hidden sm:rounded-md text-center items-center mt-10">
                        <div className="px-4 py-5 bg-white sm:p-6">
                            <div className="grid grid-cols-6 gap-6">

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        id="name"
                                        value = {this.state.name}
                                        onChange={this.handleChange}
                                        autoComplete="on"
                                        className="mt-5 h-8 pl-5 w-full focus:ring-indigo-500 focus:border-indigo-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="<Name>"
                                    />
                                </div>

                                <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                                    <label htmlFor="postal-code" className="block text-sm font-medium text-gray-700">
                                        Sequence DNA
                                    </label>
                                    <div className=" mt-5 flex justify-center px-6 pt-1 pb-1 border-2 border-gray-300 border-dashed rounded-md">
                                        <div className="space-y-1 text-center">

                                            <div className="flex  text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload" 
                                                        name="file-upload" 
                                                        type="file" 
                                                        className="sr-only" 
                                                        onChange={this.uploadFile}
                                                        />
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                                    <label htmlFor="diseasePredict" className="block text-sm font-medium text-gray-700">
                                        Disease Prediction
                                    </label>
                                    <input
                                        type="text"
                                        name="diseasePredict"
                                        id="diseasePredict"
                                        autoComplete="diseasePredict"
                                        value = {this.state.diseasePredict}
                                        onChange={this.handleChange}
                                        className="mt-5 h-8 focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-5 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        placeholder="<Disease>"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-center sm:px-6">
                            <button
                                type="button"
                                onClick={this.AddTest}
                                className="mt-5 inline-flex justify-center py-2 px-4 w-52 border-transparent shadow-sm text-sm  rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                            >
                                Send
                            </button>
                        </div>
                    </div>
                </form>
                {this.state.visible ? 
                <div>
                {this.state.ok ?
                    <div className="mt-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden sm:rounded-md text-center items-center ">
                            <div className="px-4 py-5 bg-indigo-600 sm:p-6">
                                <div className="lg:text-center">
                                    <p className=" text-7xl leading-8 font-bold tracking-tight text-white sm:text-4xl">
                                        Test Result
                                    </p>
                                </div>

                            </div>
                            <div className="lg:text-center">    
                                <p className=" text-xl leading-8 font-medium tracking-tight text-gray-900 sm:text-2xl py-8">
                                    {this.state.result.test_date} - {this.state.name} - {this.state.diseasePredict} - {this.state.result.positive? 'true':'false'} - {this.state.result.similarity}
                                </p>
                            </div>
                        </div>
                    </div>
                :
                    <div className="mt-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden sm:rounded-md text-center items-center ">
                            <div className= "px-4 py-5 bg-red-500 sm:p-6">
                                <div className="lg:text-center">
                                    <p className="text-3xl leading-8 font-bold tracking-tight text-white sm:text-4xl" >
                                        {this.state.message}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                }    
                </div>      
                : null}
                

            </main>
        )
    }
}
