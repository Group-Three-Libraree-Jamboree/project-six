import React, { Component } from 'react';

class NewCalendar extends Component {
	constructor() {
		super();
		this.state = {
			todayFull: new Date(),
			today: '',
			selectedDate: '',
			fullSelected: new Date(),
			days: 0,
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
			todayFull: today,
			today: date,
		});
	};

	whenDateChanges = (e) => {
		const pickedDate = e.target.value;
		const fullSelectedDate = new Date(e.target.value);
		this.setState(
			{
				today: pickedDate,
				fullSelected: fullSelectedDate,
			},
			() => {
				const d1 = this.state.fullSelected;
				const d2 = this.state.todayFull;

				this.setState({
					days: parseInt((d1 - d2) / (24 * 3600 * 1000)),
				}, ()=> {
					this.getDaysLeft()
				});
			}
		);
	};

	componentDidMount() {
		this.getCurrentDate();
		this.getDaysLeft();
	}

	getDaysLeft = (day) => {
		day = this.state.days;
		this.props.getDaysLeft(day);
	};

	render() {
		return (
			<div>
				<label htmlFor="transactions">Next Paycheck</label>
				<input
					onChange={this.whenDateChanges}
					type="date"
					id="transactions"
					name="transactions"
					value={this.state.today}
					min = {this.state.today}
				/>
			</div>
		);
	}
}

export default NewCalendar;
