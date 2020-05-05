import React, { Component } from 'react';
import './App.scss';
import axios from 'axios';
import firebase from './components/firebase';

class App extends Component {
	constructor() {
		super();
	}

	componentDidMount() {
		const dbRef = firebase.database().ref();
		console.log(dbRef);
	}

	render() {
		return (
			<div className="App">
				<h1>Budget App</h1>
			</div>
		);
	}
}
export default App;
