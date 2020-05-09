import React, { Component } from 'react';
import firebase from 'firebase';
import TransactionRecords from './TransactionRecords';

class DisplayMoney extends Component {
	constructor() {
		super();
		this.state = {
			total: 0,
			daysToNextCheck: 0,
			paycheck: 0,
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
		const { total, daysToNextCheck, paycheck } = this.state;
		return (
			<div>
				<div>
					<p className="dailyInfo">You currently have <span>{total}</span></p>
					<p className="dailyInfo">
						You have <span>{daysToNextCheck}</span> days till your next paycheck
					</p>
					<p className="dailyInfo">Your last paycheck was for <span>{paycheck}</span> </p>
				</div>
                <TransactionRecords />
                
			</div>
		);
	}
}

export default DisplayMoney;
