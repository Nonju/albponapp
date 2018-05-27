
# easy-bluetooth-classic build gradle path (relative to root)
FILE_PATH = './node_modules/easy-bluetooth-classic/android/build.gradle'

def compileToImplementation():
	content = ''
	with open(FILE_PATH, 'r') as f:
		content = f.readlines()

	for i in range(0, len(content)):
		line = content[i]
		line = line.replace('compile ', 'implementation ')
		line = line.replace('compile(', 'implementation(')
		line = line.replace('testCompile ', 'testImplementation ')
		line = line.replace('testCompile(', 'testImplementation(')
		content[i] = line

	with open(FILE_PATH, 'w') as f:
		f.write(''.join(content))

def main():
	print('Updating easy-bluetooth-classic build.gradle')
	compileToImplementation()

if __name__ == '__main__':
	main()
