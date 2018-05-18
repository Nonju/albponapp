#include <SoftwareSerial.h>

// Connect the HC-05 TX to Arduino pin 2 RX
// Connect the HC-05 RX to Aruduino pin 3 TX ( Through Voltage Divider!! )
SoftwareSerial BTserial(2, 3); // RX | TX

char c;

void setup() {
  // Serial setup
  Serial.begin(9600);
  Serial.println("Arduino is ready");
  Serial.println("Select BOTH NL & CR in the serial monitor");

  // BT serial setup
  BTserial.begin(38400); // HC-05 default serial speed for AT mode set to 38400
}

void loop() {
  // Keep reading from HC-05 serial and send to Arduino Serial Monitor
  if (BTserial.available()) {
    c = BTserial.read();
    Serial.write(c);
  }

  // Keep reading from Arduino Serial Monitor and send to HC-05 serial
  if (Serial.available()) {
    c = Serial.read();
    BTserial.write(c);
  }
}

