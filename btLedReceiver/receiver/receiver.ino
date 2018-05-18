#include <SoftwareSerial.h>
#include <ctype.h>

// Connect the HC-05 TX to Arduino pin 2 RX
// Connect the HC-05 RX to Aruduino pin 3 TX ( Through Voltage Divider!! )
SoftwareSerial BTserial(2, 3); // RX | TX

# define ledPin 5

char c;
String command;

void setup() {
  // Serial setup
  Serial.begin(9600);
  Serial.println("Arduino is ready");
  Serial.println("Select BOTH NL & CR in the serial monitor");

  // BT serial setup
  BTserial.begin(38400); // HC-05 default serial speed for AT mode set to 38400

  // Setup pins
  pinMode(ledPin, OUTPUT);
}

bool stringIsInt(String s) {
  for (int i = 0; i < s.length(); ++i) {
    char c = s.charAt(i);
    if (!isdigit(c)) return false;
  }
  return true;
}

void executeCommand() {
  Serial.println("Executing command: " + command);
  if (stringIsInt(command)) {
    int number = command.toInt();
    if (number > 255) number = 255;
    if (number < 0) number = 0;
    analogWrite(ledPin, number);
  }
  else if (command.equals("ON")) digitalWrite(ledPin, HIGH);
  else if (command.equals("OFF")) digitalWrite(ledPin, LOW);
  else Serial.println("Unknown command");
}

void handleInput() {
  if (c == ';') {
    executeCommand();
    command = "";
    return;
  }
  command.concat(c);
}

void loop() {
  // Keep reading from HC-05 serial and send to Arduino Serial Monitor
  if (BTserial.available()) {
    c = BTserial.read();
    handleInput();
    Serial.write(c);
  }

  // Keep reading from Arduino Serial Monitor and send to HC-05 serial
  if (Serial.available()) {
    c = Serial.read();
    BTserial.write(c);
  }
}

