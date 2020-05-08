import React, { Component } from 'react';
import firebase from 'firebase';

class DisplayMoney extends Component {
	constructor() {
		super();
		this.state = {
			userMoney: [],
		};
	}

	componentDidMount() {
		const dbRef = firebase.database().ref();
		dbRef.on('value', (result) => {
			const data = result.val();
			const userMoney = [];
			for (let key in data) {
				userMoney.push(data[key]);
			}
			this.setState({
				userMoney: userMoney,
			});
		});
	}

	render() {
		return (
			<div>
				{this.state.userMoney.map((money, i) => {
					return (
						<div key={i}>
							<h2>You currently have {money.user.total}</h2>
							<h2>
								You have {money.user.daysToNextCheck} days till your next
								paycheck
							</h2>
							<h3>
								You were paid {money.user.income['Thu-May-07-2020'].paycheck} on{' '}
								{money.user.income['Thu-May-07-2020'].date}
							</h3>
						</div>
					);
				})}
			</div>
		);
	}
}

export default DisplayMoney;
