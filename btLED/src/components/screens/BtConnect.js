
import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

class BtConnectScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	render() {
		return (
			<View>
				<Text>BtConnectScreen component</Text>
			</View>
		);
	}
};

export default connect(
	state => ({}),
	null
)(BtConnectScreen);
