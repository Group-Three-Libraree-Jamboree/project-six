import React, { Component } from 'react';
import firebase from 'firebase';
import TransactionRecords from './TransactionRecords';

class DisplayMoney extends Component {
	constructor() {
		super();
		this.state = {
			total: 0,
			amountToSave: 0,
			daysToNextCheck: 0,
			paycheck: 0,
			dailybudget: 0,
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
				}, ()=> {
                    this.calcDailyBudget();
                });
			}
		});
	}

	calcDailyBudget = () => {
		console.log('something');
		const dailybudget = this.state.total / this.state.daysToNextCheck;
		this.setState({
			dailybudget: dailybudget,
		});
	};

	render() {
		const { total, paycheck } = this.state;
		return (
			<div>
				<p className="dailyInfo">
					Your Total budget is $<span>{paycheck}</span>
				</p>
			</div>
		);
	}
}

export default DisplayMoney;
