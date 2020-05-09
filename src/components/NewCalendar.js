import React, { Component } from 'react';

class NewCalendar extends Component {
	constructor() {
		super();
		this.state = {
			today: '',
			selectedDate: '',
		};
	}

	getCurrentDate = () => {
		const today = new Date();
		const date =
			today.getFullYear() +
			'-' +
			('0' + (today.getMonth() + 1)).slice(-2) +
			'-' +
			('0' + today.getDate()).slice(-2);

		this.setState({
			today: date,
		});
	};

	whenDateChanges = (e) => {
		const pickedDate = e.target.value;
		this.setState({
			today: pickedDate,
		});
	};

	componentDidMount() {
		this.getCurrentDate();
	}

	render() {
		return (
			<div>
				<label htmlFor="transactions">Pick date to add transactions</label>
				<input
					onChange={this.whenDateChanges}
					type="date"
					id="transactions"
					name="transactions"
					value={this.state.today}
				/>
			</div>
		);
	}
}

export default NewCalendar;
