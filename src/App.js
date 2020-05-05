import React, { Component } from 'react';
import Calendar from './components/Calendar';
import './App.scss';
// import axios from 'axios';
import firebase from './components/firebase';

class App extends Component {
	// constructor() {
	// 	super();
	// }

	componentDidMount() {
		const dbRef = firebase.database().ref();
		console.log(dbRef);
	}



	render() {
		return (
		<div className='App'>
			<h1>Budget App</h1>
			{/* You need to install Calendar in iTerm: npm install react-datepicker --save */}
			<Calendar />
		</div>
		);
	}
}
export default App;
