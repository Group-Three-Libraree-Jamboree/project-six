import React, { Component } from 'react';
import firebase from './components/firebase';
import Header from './components/Header';
import Calendar from './components/Calendar';
// import Expenses from './components/Expenses';
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
			calendarDate: "",
			transDescr: "",
			transAmount: 0,
			test: ["wefef", "wef"],
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
		let copyDate = passedDate
		this.setState({
			calendarDate: copyDate,
		});
	};

	componentDidMount() {
		// const dbRef = firebase.database().ref();
		
	}

	// this function grabs all input values from app.js and adds it to state
	handleUserInput = (event) => {
		console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	calcTotal = (e) => {
		e.preventDefault();
		const total = this.state.paycheck - this.state.savings;
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

	// handleChangeText = (event) =>{
	// 	event.preventDefault();
	// 	// console.log(event.target.value);
	// 	this.setState({
	// 		transDescr: event.target.value
	// 	})
	// 	console.log(`Number is:`, this.state.transDescr);
	// }
	handleChange = (event) =>{
		event.preventDefault();
		// console.log(event.target.value);
		this.setState({
			[event.target.name]: event.target.value
		})
		// console.log(`Text is:`, this.state.transAmount);
	}

	addTransactionToDb = ()=>{
		console.log(this.state.transDescr, this.state.transAmount);
		const dbRef = firebase.database().ref();
		const { transAmount, transDescr, calendarDate } = this.state;
		let transactionsToStoreInFb = {
			[calendarDate]: {
				description: transDescr,
				amount: transAmount,
			},
		};
		dbRef.push(transactionsToStoreInFb);
		// console.log(this.state.calendarDate);
		this.reCalculateTotal();

		// this.setState({
		// 	test: [...this.state.tets, 'transDescr']
		// })
	}

	reCalculateTotal = ()=>{
		this.setState({
			total: this.state.total - this.state.transAmount
		}, ()=>{
			const dailybudget = this.state.total / this.state.days;
			this.setState({
				dailybudget: dailybudget
			})
		})
	}

	appendTransaction = ()=>{
		return (
			<ul>
				{
					this.state.test.map( (descr, index)=>{
						return <li key={index}>{descr}</li>
					})
				}
			</ul>
		)
	}

	render() {
	
		return (
			<div className="App">
				<Header />
				{/* You need to install Calendar in iTerm: npm install react-datepicker --save */}
				<Calendar getCalenderDate={this.getCalenderDate} />
				<div className="wrapper">
					<form className="paymentSubmit" onSubmit={this.calcTotal}>
						<label htmlFor="paycheck">How much is your paycheck?</label>
						<input
							type="number"
							id="paycheck"
							name="paycheck"
							onChange={this.handleUserInput}
						></input>
						<label htmlFor="days">Days till next pay period?</label>
						<input
							type="number"
							id="days"
							name="days"
							onChange={this.handleUserInput}
						></input>
						<label htmlFor="savings">How much would you like to save?</label>
						<input
							type="number"
							id="savings"
							name="savings"
							onChange={this.handleUserInput}
						></input>
						<label htmlFor="dailyExpenses">Enter Daily Expenses</label>
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

					<p className="dailyInfo">
						Your daily budget is:<span> {this.state.dailybudget}</span>
					</p>
				</div>
				{/* <Expenses /> */}
				<div>
					{/* <input
					type="text"
					value={objectInput}
					onChange={(event) => this.handleChange(event, i)}
					/> */}

					<input
					type="text"
						name="transDescr"
					// value={objectInput}
						onChange={this.handleChange}
					/>
					<input
					type="number"
						name="transAmount"
					// value={objectInput}
					onChange={this.handleChange}
					/>

					<button
						type="button"
						onClick={this.addTransactionToDb}>+Add
					</button>

					<button
					type="button"
					// onClick={this.removeClick}
					>Remove
					</button>

					{this.appendTransaction()}
				</div>
				<Footer />
			</div>
		);
	}
}
export default App;
