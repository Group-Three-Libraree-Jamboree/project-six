import React, { Component } from 'react';

class Expenses extends Component {
	constructor() {
		super();
		this.state = { values: [] };
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	createUI() {
		return this.state.values.map((el, i) => (
			<div key={i}>
				<input
					type="text"
					value={el || ''}
					onChange={this.handleChange.bind(this, i)}
				/>
				<input
					type="button"
					value="remove"
					onClick={this.removeClick.bind(this, i)}
				/>
			</div>
		));
	}

	handleChange(i, event) {
		let values = [...this.state.values];
		values[i] = event.target.value;
		this.setState({ values });
	}

	addClick() {
		this.setState((prevState) => ({ values: [...prevState.values, ''] }));
	}

	removeClick(i) {
		let values = [...this.state.values];
		values.splice(i, 1);
		this.setState({ values });
	}

	handleSubmit(event) {
		alert('A name was submitted: ' + this.state.values.join(', '));
		event.preventDefault();
	}

	render() {
		return (
			<div className="wrapper">
				<form className="expenseInputs" onSubmit={this.handleSubmit}>
					{this.createUI()}
					<input
						className="nextButton"
						type="button"
						value="add expense"
						onClick={this.addClick.bind(this)}
					/>
					<input className="nextButton" type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Expenses;
