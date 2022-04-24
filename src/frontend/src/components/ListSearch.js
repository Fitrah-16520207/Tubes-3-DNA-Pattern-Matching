import React, { Component } from 'react'
import axios from 'axios'

const api = 'http://localhost:3001'
export default class ListSearch extends Component {
    constructor(props) {
        super(props)

        this.state = {
            diseases: [],
            responses: '',
            display: 'none'
        }
    }

    componentDidMount() {
        axios.get(api+'/api/searchTest')
            .then(res => {
                this.setState({
                    diseases: res.data.result
                })
            }
            )
            // .catch(err => {
            //     console.log(err)
            // }
            // )
    }

    render() {
        return (
            <div>
            <table class="w-full mt-10"> 
                <thead class="bg-gray-100 border-b-2 border-gray-300">
                    <tr>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">test_id</th>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">test_date</th>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">patient_name</th>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">disease_name</th>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">positive</th>
                        <th className ="p-3 text-sm font-semibold tracking-wide text-left">similarity</th>
                    </tr>
                </thead>
                <tbody className="shadow">
                    {this.state.diseases.map(disease => 
                        <tr className = "bg-white" key={disease.test_id}>
                            <td  className ="p-3 text-sm text-indigo-600">{disease.test_id}</td>
                            <td  className ="p-3 text-sm text-gray-900">{disease.test_date}</td>
                            <td  className ="p-3 text-sm text-gray-900">{disease.patient_name}</td>
                            <td  className ="p-3 text-sm text-gray-900">{disease.disease_name}</td>
                            <td  className ="p-3 text-sm text-gray-900">{disease.positive}</td>
                            <td  className ="p-3 text-sm text-gray-900">{disease.similarity}</td>
                        </tr>
                    )}
                </tbody>
            </table>
            </div>
        )
    }
}


