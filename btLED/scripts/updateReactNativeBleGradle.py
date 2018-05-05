
# react-native-ble-plx build gradle path (relative to root)
FILE_PATH = './node_modules/react-native-ble-plx/android/build.gradle'

def compileToImplementation():
	content = ''
	with open(FILE_PATH, 'r') as f:
		content = f.readlines()

	for i in range(0, len(content)):
		line = content[i]
		line = line.replace('compile ', 'implementation ')
		line = line.replace('testCompile ', 'testImplementation ')
		content[i] = line

	with open(FILE_PATH, 'w') as f:
		f.write(''.join(content))

def main():
	print('Before File update')
	compileToImplementation()

if __name__ == '__main__':
	main()
