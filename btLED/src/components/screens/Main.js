
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import Rtest from './Rtest';

class MainScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<View>
				<Text>MainScreen component</Text>
				<Text>Current amount: {this.props.amount}</Text>
				<Rtest />
			</View>
		);
	}
};

// TODO: wrap with redux "connect"
export default connect(
state => ({
	amount: state.rtest.amount,
}),
null
)(MainScreen);
