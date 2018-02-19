
import React from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { connect } from 'react-redux';

import { increase, decrease } from '../../actions/rtest';

class Rtest extends React.Component {
	constructor(props) {
		super(props);

		this.state = { currentAmount: '0' };
	}

	inputTextChange(newText) {
		console.log(`New text: ${newText}`);
		this.setState({ currentAmount: newText });
	}

	currentAmountToInt() {
		try { return Number(this.state.currentAmount); }
		catch (e) {
			console.log('Could not convert current amount to int');
			return 0;
		}
	}

	onIncreaseClicked() {
		const amount = this.currentAmountToInt();
		console.log(`Increase amount by: ${amount}`); // REMOVE
		this.props.increase(amount);
	}

	onDecreaseClicked() {
		const amount = this.currentAmountToInt();
		console.log(`Decrease amount by: ${amount}`); // REMOVE
		this.props.decrease(amount);
	}

	render() {
		return (
			<View>
				<Text>ChangeAmount:</Text>
				<TextInput 
					keyboardType='numeric'
					onChangeText={text => this.inputTextChange(text)}
					value={this.state.currentAmount}
				/>

				<Button 
					title="Increase"
					onPress={() => this.onIncreaseClicked()}
				/>
				<Button 
					title="Decrease"
					onPress={() => this.onDecreaseClicked()}
				/>
			</View>
		);
	}

};

export default connect(
	state => ({}),
	{
		increase,
		decrease,
	}
)(Rtest);
