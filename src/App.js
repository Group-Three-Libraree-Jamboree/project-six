import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import NewCalendar from './components/NewCalendar';
import DisplayMoney from './components/DisplayMoney';
import TransactionRecords from './components/TransactionRecords';
import Footer from './components/Footer';
import './App.scss';

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
		};
	}

	// This function creates an object to save the firebase based on state.
	saveToDb = () => {
		const dbRef = firebase.database().ref('user');
		const { paycheck, savings, days, total } = this.state;
		const dataToStoreInFb = {
			total: total,
			daysToNextCheck: days,
			paycheck: paycheck,
			amountToSave: savings,
		};
		dbRef.update(dataToStoreInFb);
	};

	// this function grabs all input values from app.js and adds it to state
	handleUserInput = (event) => {
		console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	calcTotal = () => {
		//clears the inputs onSubmit. Uncomment preventdefault if we want to keep inputs 
		// e.preventDefault();

		//making sure Saving input is not larger than Paycheck input
		if (this.state.paycheck < this.state.savings) {
			return alert("You cannot save more than your paycheck. Sorry...")
		}
		
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


getDaysLeft = (days) => {
	this.setState({
		days:days
	})
}


	render() {
		return (
			<div className="App">
				<Header />

				<main>
					<div className="wrapper">
						<div className="inputForm half">
							<form className="paymentSubmit" onSubmit={this.calcTotal}>
								<h3>Income</h3>
								<label htmlFor="paycheck">How much is your paycheck?</label>
								<input
								placeholder="e.g. 6,000.00"
									type="number"
									id="paycheck"
									name="paycheck"
									onChange={this.handleUserInput}
									required
								></input>
								{/* <label htmlFor="days">Days until next pay period?</label>
								<input
									type="number"
									id="days"
									name="days"
									onChange={this.handleUserInput}
									required
								></input> */}
								<NewCalendar getDaysLeft={this.getDaysLeft} />
								<label htmlFor="savings">How much are you saving?</label>
								<input
								placeholder="e.g. 1,000.00"
									type="number"
									id="savings"
									name="savings"
									onChange={this.handleUserInput}
								></input>
								<button className="nextButton" type="submit">
									Add Paycheck
								</button>
							</form>
						</div>

						<div className="budgetSection half">
							<h3>Budget</h3>
							<div className="budget">
								<DisplayMoney />
							</div>

							<TransactionRecords />
						</div>
					</div>
				</main>

				<Footer />
			</div>
		);
	}
}
export default App;
