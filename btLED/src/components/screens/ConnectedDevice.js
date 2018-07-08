import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import { connect } from 'react-redux';
import { find } from 'lodash';

import { write } from '../../actions/bt';

const styles = StyleSheet.create({
	topView: {
		flex: 1,
	},
	partView: {
		flex: 3,
		justifyContent: 'center',
		alignItems: 'center',
	},

	statusHeader: {
		color: 'green',
		fontWeight: 'bold',
	},

	deviceInfoHeader: {
		fontWeight: 'bold',
	},

	deviceInputField: {
		width: 150,
		textAlign: 'center'
	},
});

class ConnectedDevice extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			device: null,
			text: '',
		};
	}

	componentDidMount() {
		const { devices, connectedDevice } = this.props;
		const device = find(devices, d => d.uuid === connectedDevice);
		this.setState({ device });
	}

	renderStatus = () => {
		const { connectionStatus } = this.props;
		return (
			<View style={styles.partView}>
				<Text style={styles.statusHeader}>Status: </Text>
				<Text>{connectionStatus}</Text>
			</View>
		);
	}

	renderDeviceInfo = () => {
		const device = this.state.device || {};
		const getField = key => device[key] || 'No value for field';
		return (
			<View style={styles.partView}>
				<Text style={styles.deviceInfoHeader}>Device info:</Text>
				<Text>UUID: {getField('uuid')}</Text>
				<Text>Name: {getField('name')}</Text>
				<Text>Address: {getField('address')}</Text>
			</View>
		);
	}

	renderDeviceInput = () => {
		const { text } = this.state;

		const submitData = () => {
			this.props.write(text.trim());
			this.setState({ text: '' });
		};

		return (
			<View style={styles.partView}>
				<TextInput
					style={styles.deviceInputField}
					onChangeText={text => this.setState({ text })}
					placeholder="Enter text to send"
					keyboardType="numeric"
					value={text}
				/>
				<Button
					title="Submit"
					onPress={submitData}
				/>
			</View>
		);
	}

	render() {
		return (
			<View style={styles.topView}>
				{this.renderStatus()}
				{this.renderDeviceInfo()}
				{this.renderDeviceInput()}
			</View>
		);
	}
}

export default connect(
	state => ({
		devices: state.bt.devices,
		connectedDevice: state.bt.connectedDevice,
		connectionStatus: state.bt.connectionStatus,
	}), {
		write,
	},
)(ConnectedDevice);
