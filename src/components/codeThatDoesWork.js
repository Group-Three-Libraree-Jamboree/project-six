const checkDateMatch = () => {
	const dataToUpdateInFb = {
		[this.state.calendarDate]: {
			date: this.state.calendarDate,
			paycheck: paycheck,
			deposited: true,
			amountToSave: savings,
		},
	};
	const dbRefDate = firebase.database().ref('-M6m99gw-ggOacJN-qEO/user/income');
	dbRefDate.on('value', (result) => {
		const storedDate = Object.keys(result.val()).toString();
		this.setState({
			selectedDate: storedDate,
		});
	});
	if (this.state.calendarDate === this.state.selectedDate) {
		dbRef.update(dataToUpdateInFb);
	} else {
		dbRef.push(dataToUpdateInFb);
	}
};

checkDateMatch();
