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

	// This creates the date format needed to use in the calendar's value and adds it to state. It also grabs the current full js date and puts it state
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

	// When the user changes the date this function will add the calendar format value to state. It also grabs the selected full js date and puts it state. 
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

				// determines the remaining days from current date to selected date.
				this.setState(
					{
						days: parseInt((d1 - d2) / (24 * 3600 * 1000) + 1),
					},
					() => {
						//making sure the next paycheck is not today
						if (this.state.days === 0) {
							return alert('Please select a date different from today');
						}
						this.getDaysLeft();
					}
				);
			}
		);
	};

	componentDidMount() {
		this.getCurrentDate();
		this.getDaysLeft();
	}

	// used to pass remaining days to App.js
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
					min={this.state.today}
				/>
			</div>
		);
	}
}

export default NewCalendar;
