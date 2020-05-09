import React, { Component } from 'react';
import firebase from 'firebase';
import TransactionRecords from './TransactionRecords';

class DisplayMoney extends Component {
	constructor() {
		super();
		this.state = {
			total: 0,
			amountToSave: 0,
		};
	}

    // grabs data from DB and loops though it, pushing it to state so that it can be displayed on screen. 
	componentDidMount() {
		const dbRef = firebase.database().ref('user');
		dbRef.on('value', (result) => {
			const data = result.val();

			for (let key in data) {
				// userMoney.push({ [key]: data[key] });

				this.setState({
					[key]: data[key],
				});
			}
		});
	}

	render() {
		const { total } = this.state;
		return (
			<div>
				<p className="dailyInfo">Budget for the Month $<span>{total}</span></p>
			</div>
		);
	}
}

export default DisplayMoney;
