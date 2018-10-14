import React from 'react';
import { View, Text, StyleSheet, TextInput, Button, Slider } from 'react-native';
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

	deviceColorSlider: {
		width: 200,
		margin: 5
	}
});

class ConnectedDevice extends React.Component {
	constructor(props) {
		super(props);
		this.state = { device: null };
		this.resetColors();
	}

	componentDidMount() {
		const { devices, connectedDevice } = this.props;
		const device = find(devices, d => d.uuid === connectedDevice);
		this.setState({ device });
	}

	resetColors = () => (this.colors = { r: '000', g: '000', b: '000' })

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

		const submitData = () => {
			this.props.write(Object.values(this.colors).join(''));
			this.resetColors();
		};

		return (
			<View style={styles.partView}>
				{['r', 'g', 'b'].map(color => (
					<Slider
						key={Math.random()}
						maximumValue={255}
						onValueChange={value => {
							console.log('Setting color for slider', color, value);
							let colorValue = Math.floor(value).toString();
							while (colorValue.length < 3) colorValue = '0' + colorValue;
							this.colors[color] = colorValue;
							// this.colors[color] = Math.floor(value).toString(16).padStart(2, '0');
							console.log('COLORS', this.colors);
						}}
						// value={this.state[color]}
						style={styles.deviceColorSlider}
					/>
				))}
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
