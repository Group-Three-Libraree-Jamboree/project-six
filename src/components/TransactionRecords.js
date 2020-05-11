import React, { Component } from 'react';
import firebase from 'firebase';
import Transaction from './RemoveTrans';

class TransactionRecords extends Component {
    constructor(){
        super();
        this.state = {
            transDescr: "",
            transAmount: "",
            allTransactions: [],
        }
    }
    //onChange grabs values from input fields (transDescr and transAmount) and saves to the state
    handleChange = (event) => {
        event.preventDefault();
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    //creates a new firebase record as a child of 'Transactions': transDescr and transAmount
    addTransactionToDb = () => {
        const dbRef = firebase.database().ref('Transactions');
        const { transAmount, transDescr } = this.state;
        let transactionsToStoreInFb = {
            description: transDescr,
            amount: transAmount,
        };
        dbRef.push(transactionsToStoreInFb);

        // empty input fields on Submit
        this.setState({
            transDescr: "",
            transAmount: "",
        })
    }


    //when the page is rendered, retrieves all "Transactions" records from firebase, creates a copy and saves to state (this.state.allTransactions)
    componentDidMount() {
        const dbRef = firebase.database().ref("Transactions");
        dbRef.on('value', (result) => {
            const data = result.val();
            const allTransactions = [];
            for (let key in data) {
                allTransactions.push({ transName: data[key].description, transAmount: data[key].amount, transId:key});
            }
            this.setState({
                allTransactions: allTransactions,
            });
        });
    }

    //prints to the page all paired items (amount and description) from this.state.allTransactions
    appendTransaction = () => {
        return (
            <ul className="transactions">
                {
                    this.state.allTransactions.map((trans, index) => {
                        return(
                            <Transaction key={index} description={trans.transName} amount={trans.transAmount} index={trans.transId}/>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        return(
            <div>
            <h3 className="addExpense">Add Expense</h3>
                <div className="expenseInfo">
                    <label htmlFor="transDescr" className="sr-only">Description of expense</label>
                    <input
                        type="text"
                        name="transDescr"
                        id="transDescr"
                        onChange={this.handleChange}
                        placeholder= "Expense description"
                        value={this.state.transDescr}
                    />
                    <label htmlFor="transAmount" className="sr-only">Description of expense</label>
                    <input
                        type="number"
                        name="transAmount"
                        id="transAmount"
                        onChange={this.handleChange}
                        placeholder= "Expense amount"
                        value={this.state.transAmount}
                    />
                    <button
                        className="add"
                        type="button"
                        onClick={this.addTransactionToDb}>+
                    </button>
                </div>

                {/* appends all transaction records to the page */}
                {this.appendTransaction()}
            </div>
        )
    }
}

export default TransactionRecords;