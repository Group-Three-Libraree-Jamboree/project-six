import React, { Component } from 'react';
import firebase from 'firebase';
import Transaction from './RemoveTrans';
import NewCalendar from './NewCalendar';

class TransactionRecords extends Component {
	constructor() {
		super();
		this.state = {
			transDescr: '',
			transAmount: 0,
			allTransactions: [],
			sumOfExpenditures: 0,
		};
	}
	//onChange grabs values from input fields (transDescr and transAmount) and saves to the state
	handleChange = (event) => {
		event.preventDefault();
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	//creates a new firebase record as a child of 'Transactions': transDescr and transAmount
	addTransactionToDb = () => {
		const dbRef = firebase.database().ref('Transactions');
		const { transAmount, transDescr } = this.state;
		let transactionsToStoreInFb = {
			description: transDescr,
			amount: transAmount,
		};
		dbRef.push(transactionsToStoreInFb);
	};

	//when the page is rendered, retrieves all "Transactions" records from firebase, creates a copy and saves to state (this.state.allTransactions)
	componentDidMount() {
		const dbRef = firebase.database().ref('Transactions');
		dbRef.on('value', (result) => {
			const data = result.val();
			const allTransactions = [];
			for (let key in data) {
				allTransactions.push({
					transName: data[key].description,
					transAmount: data[key].amount,
					transId: key,
				});
			}
			this.setState(
				{
					allTransactions: allTransactions,
				},
				() => {
					//updates state to reflect the total amount spent so far
					this.sumTransactions();
				}
			);
		});
	}

	//adds all expenditures to each other and updates state.sumOfExpenditures. Returns a number
	sumTransactions = () => {
		//sums up all transactions so far
		let total = 0;
		this.state.allTransactions.forEach((item) => {
			item = parseInt(item.transAmount);
			total += item;
		});
		this.setState({
			sumOfExpenditures: total,
		});

		//passes sumOfExpenditures to the parent
		this.props.passTotalExpenditures(total);
	};

	//prints to the page all paired items (amount and description) from this.state.allTransactions
	appendTransaction = () => {
		return (
			<ul className="transactions">
				{this.state.allTransactions.map((trans, index) => {
					return (
						<Transaction
							key={index}
							description={trans.transName}
							amount={trans.transAmount}
							index={trans.transId}
						/>
					);
				})}
			</ul>
		);
	};

	render() {
		return (
			<div>
				<NewCalendar />
				<h3 className="addExpense">Add Expense</h3>
				<div className="expenseInfo">
					<input
						type="text"
						name="transDescr"
						onChange={this.handleChange}
						placeholder="Expense description"
					/>
					<input
						type="number"
						name="transAmount"
						onChange={this.handleChange}
						placeholder="Expense amount"
					/>
					<button
						className="add"
						type="button"
						onClick={this.addTransactionToDb}
					>
						+
					</button>
				</div>
				{/* appends all transaction records to the page */}
				{this.appendTransaction()}
			</div>
		);
	}
}

export default TransactionRecords;
