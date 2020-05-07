// import React, { Component } from 'react';

// class Expenses extends Component {
// 	constructor() {
// 		super();
// 		this.state = { values: [] };
// 	}
// 	createUI() {
// 		return this.state.values.map((objectInput, i) => (
// 			<div key={i}>
// 				<input
// 					type="text"
// 					value={objectInput}
// 					onChange={(event) => this.handleChange(event, i)}
// 				/>
// 				<input
// 					type="number"
// 					value={objectInput}
// 					onChange={(event) => this.handleChange(event, i)}
// 				/>
// 				<input type="button" value="remove" onClick={this.removeClick} />
// 			</div>
// 		));
		
// 	}

// 	handleChange = (event, i) => {
// 		console.log(event);
// 		console.log(i);

// 		// let values = [...this.state.values];
// 		// console.log(values);
// 		// values[i] = event.target.value;
// 		// this.setState({ values: values });
// 	};

// 	addClick = () => {
// 		this.setState((prevState) => ({
// 			values: { item: [...prevState.values, ''] },
// 		}));
// 	};

// 	removeClick = (i) => {
// 		let values = [...this.state.values];
// 		values.splice(i, 1);
// 		this.setState({ values });
// 	};

// 	handleSubmit = (event) => {
// 		alert('A name was submitted: ' + this.state.values.join(', '));
// 		event.preventDefault();
// 	};

// 	render() {
// 		return (
// 			<div className="wrapper">
// 				<form className="expenseInputs" onSubmit={this.handleSubmit}>
// 					{this.createUI()}
// 					<input
// 						className="nextButton"
// 						type="button"
// 						value="add expense"
// 						onClick={this.addClick}
// 					/>
// 					<input className="nextButton" type="submit" value="Submit" />
// 				</form>
// 			</div>
// 		);
// 	}
// }

// export default Expenses;
