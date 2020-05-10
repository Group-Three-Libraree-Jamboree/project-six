import React, { Component } from 'react';
import firebase from 'firebase';

class DisplayMoney extends Component {
	constructor() {
		super();
		this.state = {
			total: 0,
			amountToSave: 0,
			daysToNextCheck: 0,
			paycheck: 0,
			dailybudget: 0,
			transactionsAmount: 0,
			newTotal: 0,
		};
	}

	// grabs data from DB and loops though it, pushing it to state so that it can be displayed on screen.
	componentDidMount() {
		const userRef = firebase.database().ref('user');
		userRef.on('value', (result) => {
			const data = result.val();

			for (let key in data) {
				// userMoney.push({ [key]: data[key] });
				this.setState(
					{
						[key]: parseInt(data[key]),
					},
					() => {
						this.calcDailyBudget();
					}
				);
			}
		});

		this.checkExpenses();
	}

	calcDailyBudget = () => {
		const dailybudget =
			(this.state.total - this.state.amountToSave) / this.state.daysToNextCheck;

		this.setState(
			{
				dailybudget: dailybudget,
			},
			() => {
				this.subtractExpenses();
			}
		);
	};

	checkExpenses = () => {
		const exRef = firebase.database().ref('Transactions');
		exRef.on('value', (result) => {
			const tran = result.val();

			// loop through the transactions object and get the amount values and store them in an array
			const holdTrans = [];
			for (let key in tran) {
				holdTrans.push(tran[key].amount);
			}
			// turn transaction values from a string to a number
			const sumOfEx = holdTrans.map((v) => parseInt(v));

			// adds up all numbers in the array
			const reducer = (accumulator, currentValue) => accumulator + currentValue;

			// Checks to see if the array empty if so it sets the value to 0
			this.setState(
				{
					transactionsAmount: sumOfEx.length > 0 ? sumOfEx.reduce(reducer) : 0,
				},
				() => {
					this.subtractExpenses();
				}
			);
		});
	};

	subtractExpenses = () => {
		const { total, transactionsAmount, daysToNextCheck } = this.state;
		let newTotal = (total - transactionsAmount) / daysToNextCheck;
		//makes sure the value is non NaN

		newTotal = newTotal ? newTotal : 0

		this.setState({
			newTotal: newTotal,
		});
	};

	render() {
		const {
			paycheck,
			daysToNextCheck,
			amountToSave,
			newTotal,
		} = this.state;
		return (
			<div>
				<ul className="dailyInfo">
					<li>
						Your started with $<span>{paycheck.toFixed(2)}</span>
					</li>
					<li>
						You plan to save $<span>{amountToSave.toFixed(2)}</span>
					</li>
					<li>
						You have <span>{daysToNextCheck}</span> days till your next paycheck
					</li>
					<li>
						Your Daily Budget is $<span>{newTotal.toFixed(2)}</span>
					</li>
				</ul>
			</div>
		);
	}
}

export default DisplayMoney;
