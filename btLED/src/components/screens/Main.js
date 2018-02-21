
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class MainScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}
	render() {
		return (
			<View>
				<Text>MainScreen component</Text>
			</View>
		);
	}
};

export default connect(
	state => ({}),
	null
)(MainScreen);
