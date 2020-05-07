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
			<div className="div">
				<label htmlFor="expenseItem">description </label>
				<input type="text" name="description" id="expenseItem" />

				<label htmlFor="expenseValue">Amount</label>
				<input type="number" name="expense" id="expenseValue" />
				<input type="text" name="description" id="expenseItem" />

				{this.state.newInput ? (
					<input type="text" name="description" id="expenseItem" />
				) : (
					<div></div>
				)}

				<button type="submit">Add Expenses</button>

				<button onClick={this.makeNewInput}>Hey make a new items</button>
			</div>
		);
	}
}

export default Expenses;
