import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends React.Component {
	state = {
		startDate: new Date(),
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
		});
	};

	componentDidMount() {
		this.storeDate();
	}

	storeDate = () => {
		const dayOfTrans = this.state.startDate;
		const makeString = dayOfTrans.toString();
		const sliceDate = makeString.slice(0, 15);
		console.log(sliceDate);
	};

	render() {
		return (
			<DatePicker
				selected={this.state.startDate}
				onChange={this.handleChange}
			/>
		);
	}
}

export default Calendar;
