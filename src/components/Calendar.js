import React, { Component } from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';

// CSS Modules, react-datepicker-cssmodules.css
import 'react-datepicker/dist/react-datepicker-cssmodules.css';

class Calendar extends Component {
	state = {
        startDate: new Date(),
        savedDate: "",
	};

	handleChange = (date) => {
		this.setState({
			startDate: date,
        }, ()=>{
            this.storeDate();
        });
    };
    

	componentDidMount() {
        // this.storeDate();
        // console.log(this.passDate());
	}

	storeDate = (savedDate) => {
		const dayOfTrans = this.state.startDate;
		const makeString = dayOfTrans.toString();
		const sliceDate = makeString.slice(0, 15);
        console.log(sliceDate);
        savedDate = sliceDate;
        // console.log(savedDate);
        // return savedDate;
        this.setState({
            savedDate: savedDate,
        }, ()=>{
            this.passDate();
        });
        
    };
    
    passDate = (saveToDb)=>{
        this.props.saveToDb(this.state.savedDate);
    }

	render() {
        
		return (
			<DatePicker
				selected={this.state.startDate}
				onChange={this.handleChange}
                // onSubmit={this.}
			/>
		);
	}
}

export default Calendar;
