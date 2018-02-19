
import React from 'react';
import { View, Text } from 'react-native';


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

// TODO: wrap with redux "connect"
export default MainScreen;
