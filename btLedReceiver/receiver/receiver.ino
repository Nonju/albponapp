#include <SoftwareSerial.h>
#include <ctype.h>

// Connect the HC-05 TX to Arduino pin 2 RX
// Connect the HC-05 RX to Aruduino pin 3 TX ( Through Voltage Divider!! )
SoftwareSerial BTserial(2, 3); // RX | TX

# define ledPin 5 // Todo: Remove

# define REDPIN 5
# define GREENPIN 3
# define BLUEPIN 6

char c;
String command;
int r, b, g;

void setup() {
  // Serial setup
  Serial.begin(9600);
  Serial.println("Arduino is ready");
  Serial.println("Select BOTH NL & CR in the serial monitor");

  // BT serial setup
  BTserial.begin(38400); // HC-05 default serial speed for AT mode set to 38400

  // Setup pins
  pinMode(ledPin, OUTPUT);

  pinMode(REDPIN, OUTPUT);
  pinMode(GREENPIN, OUTPUT);
  pinMode(BLUEPIN, OUTPUT);
}

bool stringIsInt(String s) {
  for (int i = 0; i < s.length(); ++i) {
    char c = s.charAt(i);
    if (!isdigit(c)) return false;
  }
  return true;
}

/*void executeCommand() {
  Serial.println("Executing command: " + command);
  if (stringIsInt(command)) {
    int number = command.toInt();
    if (number > 255) number = 255;
    if (number < 0) number = 0;
    analogWrite(ledPin, number);
  }
  else if (command.equals("ON")) digitalWrite(ledPin, HIGH);
  else if (command.equals("OFF")) digitalWrite(ledPin, LOW);
  else Serial.println("Unknown command: " + command);
}*/

void updateLed() {
  analogWrite(REDPIN, r);
  analogWrite(GREENPIN, g);
  analogWrite(BLUEPIN, b);
}

void executeCommand() {
  Serial.println("Executing command22: " + command);
  if (command.equals("CYCLING")) {
    // Cycle through every color combination
  } else if (command.length() == 9) {
    r = command.substring(0,3).toInt();
    g = command.substring(3,6).toInt();
    b = command.substring(6,9).toInt();
    Serial.print("RGB: ");
    Serial.println(r);
    Serial.println(g);
    Serial.println(b);
    updateLed();
  } else {
    Serial.println("Invalid command:" + command);
  }
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

