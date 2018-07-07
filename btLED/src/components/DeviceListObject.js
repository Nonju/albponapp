import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';

import { connect as btConnect, disconnect as btDisconnect } from '../actions/bt';

class DeviceListObject extends React.Component {
	constructor(props) {
		super(props);
		this.validateItem();
	}

	validateItem = () => {
		const throwError = () => { throw 'Invalid item'; }

		const { item } = this.props;
		if (!item) throwError();

		const { uuid, name, address } = item;
		if (!uuid || !name || !address) throwError();

		console.log('Item validated');
	}

	isConnected = () => !!this.props.connectedDevice;

	onPress = () => {
		const { uuid } = this.props.item;

		if (this.isConnected()) {
			this.props.disconnect();
		} else {
			this.props.connect(uuid);
		}
	}

	render() {
		const { uuid, name, address } = this.props.item;
		const { connectedDevice } = this.props;
		const isConnected = this.isConnected();
		return (
			<TouchableOpacity onPress={() => this.onPress()}>
				<Text>Connected: {isConnected ? 'Is connected' : 'Is NOT connected'}</Text>
				<Text>UUID: {uuid}</Text>
				<Text>Name: {name}</Text>
				<Text>Address: {address}</Text>
				<Text>--------------------------------</Text>
			</TouchableOpacity>
		);
	}
}

// export default reduxConnect(
export default connect(
	state => ({
		connectedDevice: state.bt.connectedDevice,
	}), {
		connect: btConnect,
		disconnect: btDisconnect,
	}
)(DeviceListObject);
