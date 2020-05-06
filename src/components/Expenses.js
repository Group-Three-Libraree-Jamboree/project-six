import React, { Component } from 'react';

const Expenses = () => {
	return (
		<div className="div">
			<h2>Expenses for the day</h2>
			<label htmlFor="expenseItem">description </label>
			<input type="text" name="description" id="expenseItem" />

			<label htmlFor="expenseValue">Amount</label>
			<input type="number" name="expense" id="expenseValue" />
			<button type="submit">Add Expenses</button>
		</div>
	);
};

export default Expenses;
