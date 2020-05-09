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
		const { paycheck, savings, days, total, dailybudget } = this.state;
		const dataToStoreInFb = {
			total: total,
			daysToNextCheck: days,
			paycheck: paycheck,
			amountToSave: savings,
			dailybudget: dailybudget,
		};
		dbRef.update(dataToStoreInFb);
	};

	// grabs calender date from the calender component and adds it to state
	// getCalenderDate = (passedDate) => {
	// 	this.setState({
	// 		calendarDate: passedDate,
	// 	});
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
						<div className="sections">
							<form className="paymentSubmit" onSubmit={this.calcTotal}>
								<h3>Income</h3>
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
								<button className="nextButton" type="submit">
									Add Paycheck
								</button>
							</form>
							<div class="paycheckInfo">
								<p className="dailyInfo">
									You have <span>{this.state.days}</span> days till your next
									paycheck
								</p>
								<p className="dailyInfo">
									Your last paycheck was for $<span>{this.state.paycheck}</span>{' '}
								</p>

								<p className="dailyInfo">
									You saved <span>${this.state.savings}</span>{' '}
								</p>
							</div>
						</div>

						<div class="budgetSection">
							<h3>Budget</h3>
							<div class="budget">
								<DisplayMoney />
								<p className="dailyInfo">
									Your Daily Budget is:
									<span> ${this.state.dailybudget.toFixed(2)}</span>
								</p>
							</div>
							<NewCalendar />
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
