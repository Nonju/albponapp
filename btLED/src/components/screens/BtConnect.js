import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { map } from 'lodash';

import askPermissions from '../../utils/permissions';
import { searchStart, searchStop } from '../../actions/bt';
import DeviceListObject from '../DeviceListObject';

/*
* Todo's:
* - Create collection of custom button components instead of using native 'Button'
* - Actions for calling utils/bt - commands
*/

const styles = StyleSheet.create({
	topView: {
		flex: 1,
	},
	listView: {
		margin: '5%',
	},
	bottomView: {
		position: 'absolute',
		bottom: 0,
		justifyContent: 'center',
		width: '100%',
		height: '10%',
	},
});

class BtConnectScreen extends React.Component {
	constructor(props) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		askPermissions();
	}

	getDevices = () => {
		const { devices } = this.props;
		return map(devices, device => ({ ...device, key: device.uuid }));
	}

	// Deconstruct 'device' for device.item
	renderDevice = ({ item }) => <DeviceListObject item={item} />

	render() {
		const { searching, searchStop, searchStart } = this.props;
		const devices = this.getDevices();
		return (
			<View style={styles.topView}>
				<Button
					title={searching ? "End search" : "Start search"}
					onPress={() => searching ? searchStop() : searchStart()}
				/>

				{/* List of found devices */}
				<View style={styles.listView}>
					<FlatList
						data={devices}
						renderItem={this.renderDevice}
					/>
				</View>

				{/* Create separate component for buttons like this one */}
				<View style={styles.bottomView}>
					<Button
						title='Go back'
						onPress={() => this.props.navigation.goBack()}
					/>
				</View>

			</View>
		);
	}
};

export default connect(
	state => ({
		searching: state.bt.searching,
		devices: state.bt.devices,
	}), {
		searchStart,
		searchStop,
	}
)(BtConnectScreen);
