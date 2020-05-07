import React, { Component } from 'react';

class Expenses extends Component {
	constructor() {
		super();
		this.state = {
			newInput: 0,
		};
	}

	makeNewInput = () => {
		this.setState({
			newInput: !this.state.newInput,
		});
	};
	render() {
		return (
			<div className="wrapper">
				<form className="expenseInputs" action="">
					<label htmlFor="expenseItem">description </label>
					<input type="text" name="description" id="expenseItem" />

					<label htmlFor="expenseValue">Amount</label>
					<input type="number" name="expense" id="expenseValue" />

					{this.state.newInput ? (
						<input type="text" name="description" id="expenseItem" />
					) : (
						<div></div>
					)}

					<button className="finishButton" type="submit">
						Add Expenses
					</button>
				</form>

				<button onClick={this.makeNewInput}>Hey make a new items</button>
			</div>
		);
	}
}

export default Expenses;
