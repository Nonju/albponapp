
import React from 'react';
import { View, Text, Button } from 'react-native';
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
				<Button
					title='Go to BtConnect'
					onPress={() => this.props.navigation.navigate('BtConnect')}
				/>
			</View>
		);
	}
};

export default connect(
	state => ({}),
	null
)(MainScreen);
