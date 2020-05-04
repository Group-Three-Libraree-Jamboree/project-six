import React, { Component } from 'react';
import axios from 'axios';
import './App.scss';



class App extends Component {
	getAxios = () => {
		axios({
			url: `https://opendata.tpl.ca/resources/events`,
			method: `GET`,
			responseType: `json`,
			params: {
			}
		}).then(() => {

		})
	}
	
	render() {
		return (
			<div className="App">
				<h1>Library Jamboree</h1>
				<p>Nikita adding a paragraph to test</p>
			</div>
		);
	}
}
export default App;
