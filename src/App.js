import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Calendar from './components/Calendar';
import Expenses from './components/Expenses';
import Footer from './components/Footer';
import './App.scss';
import DisplayMoney from './components/DisplayMoney';

class App extends Component {
	constructor() {
		super();
		this.state = {
			paycheck: 0,
			savings: 0,
			days: 0,
			dailybudget: 0,
			total: 0,
			afterSaving: 0,
			dailyExpenses: 0,
			calendarDate: '',
		};
	}

	// This function creates an object to save the firebase based on state.
	saveToDb = () => {
		const dbRef = firebase.database().ref();
		const { paycheck, savings, days, total } = this.state;
		const dataToStoreInFb = {
			user: {
				total: total,
				daysToNextCheck: days,
				income: {
					[this.state.calendarDate]: {
						date: this.state.calendarDate,
						paycheck: paycheck,
						deposited: true,
						amountToSave: savings,
					},
				},
			},
		};
		dbRef.push(dataToStoreInFb);
	};

	// grabs calender date from the calender component and adds it to state
	getCalenderDate = (passedDate) => {
		this.setState({
			calendarDate: passedDate,
		});
	};

	componentDidMount() {
		const dbRef = firebase.database().ref();
		// this.testingFirebase();
	}

	// testingFirebase = () => {
	// 	const dbRefOne = firebase
	// 		.database()
	// 		.ref('/-M6m99gw-ggOacJN-qEO/user/income/Thu-May-07-2020');
	// 	dbRefOne.on('value', (result) => {
	// 		console.log(result.val());
	// 	});

	// 	dbRefOne.update({ paycheck: "45" });
	// };

	// this function grabs all input values from app.js and adds it to state
	handleUserInput = (event) => {
		console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	calcTotal = (e) => {
		e.preventDefault();
		const total =
			this.state.paycheck - this.state.savings - this.state.dailyExpenses;
		this.setState(
			{
				total: total,
			},
			() => {
				this.calcDailyBudget();
			}
		);
	};

	calcDailyBudget = () => {
		const dailybudget = this.state.total / this.state.days;
		this.setState(
			{
				dailybudget: dailybudget,
			},
			() => {
				this.saveToDb();
			}
		);
	};

	render() {
		return (
			<div className="App">
				<Header />
				{/* You need to install Calendar in iTerm: npm install react-datepicker --save */}

				<main>
					<div className="wrapper">
						<div className="half">
							<form className="paymentSubmit" onSubmit={this.calcTotal}>
								<Calendar getCalenderDate={this.getCalenderDate} />
								<label htmlFor="paycheck">How much is your paycheck?</label>
								<input
									type="number"
									id="paycheck"
									name="paycheck"
									onChange={this.handleUserInput}
									required
								></input>
								<label htmlFor="days">Days until next pay period?</label>
								<input
									type="number"
									id="days"
									name="days"
									onChange={this.handleUserInput}
									required
								></input>
								<label htmlFor="savings">How much are you saving?</label>
								<input
									type="number"
									id="savings"
									name="savings"
									onChange={this.handleUserInput}
								></input>
								<label htmlFor="dailyExpenses">Enter Daily Expenses:</label>
								<input
									type="number"
									id="dailyExpenses"
									name="dailyExpenses"
									onChange={this.handleUserInput}
								></input>
								<button className="nextButton" type="submit">
									Next
								</button>
							</form>
						</div>
						<div className="half">
							<p className="dailyInfo">
								Your daily budget is:<span> ${(this.state.dailybudget).toFixed(2)}</span>
							</p>
							{/* <DisplayMoney /> */}
						</div>

					</div>
				</main>

				<Footer />
			</div>
		);
	}
}
export default App;
