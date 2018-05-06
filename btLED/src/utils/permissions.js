import { Platform, PermissionsAndroid } from 'react-native';

const askAndroidPermissions = async () => {
	const granted = await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
		{
			title: 'App required permissions',
			message: 'App requires the following permissions',
		}
	);

	return granted === PermissionsAndroid.RESULTS.GRANTED;
};

const askIosPermissions = async () => {
	// Also not sure if needs to ask for IOS permissions ??
	console.log('Not yet implemented');
};

// Ask for permissions based off of current platform
export default async () => {
	switch (Platform.OS) {
		case 'ios':
			return await askIosPermissions();
			break;
		case 'android':
		default:
			return await askAndroidPermissions();
			break;
	}
};
