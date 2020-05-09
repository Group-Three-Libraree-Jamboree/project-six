import React, { Component } from 'react';
import firebase from 'firebase';

class TransactionRecords extends Component {
    constructor(){
        super();
        this.state = {
            transDescr: "",
            transAmount: 0,
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
    }

    //when the page is rendered, retrieves all "Transactions" records from firebase, creates a copy and saves to state (this.state.allTransactions)
    componentDidMount() {
        const dbRef = firebase.database().ref("Transactions");
        dbRef.on('value', (result) => {
            const data = result.val();
            const allTransactions = [];
            for (let key in data) {
                allTransactions.push(data[key]);
            }
            this.setState({
                allTransactions: allTransactions,
            });
        });
    }

    //prints to the page all paired items (amount and description) from this.state.allTransactions
    appendTransaction = () => {
        return (
            <ul>
                {
                    this.state.allTransactions.map((trans, index) => {
                        return(
                            <div key={index}>
                                <span>Transaction description: {trans.description}|</span><span>Transaction amount: {trans.amount}</span>
                            </div>
                        )
                    })
                }
            </ul>
        )
    }

    render(){
        return(
            <div>
            <h2>Record your last transaction:</h2>
                <input
                    type="text"
                    name="transDescr"
                    onChange={this.handleChange}
                />
                <input
                    type="number"
                    name="transAmount"
                    onChange={this.handleChange}
                />

                <button
                    type="button"
                    onClick={this.addTransactionToDb}>+Add
                </button>

                {/* appends all transaction records to the page */}
                {this.appendTransaction()}
            </div>
        )
    }
}

export default TransactionRecords;