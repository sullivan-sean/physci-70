#include <i2cmaster.h>
#include <LiquidCrystal.h>
#include <Servo.h>

// initialize the library with the numbers of the interface pins
LiquidCrystal lcd(12, 11, 5, 4, 3, 2);
Servo s;

byte clockPin = 7;
byte buf[9]; // Buffer to store the received valeus
byte addr = 0x02; // address 0x02 in a 8-bit context - 0x01 in a 7-bit context
byte distance;
int servo_val;
char disp[16];

int ultrasonicCommand(byte cmd) {
  delay(100); // There has to be a delay between commands

  pinMode(clockPin, INPUT); // Needed for writing to work
  digitalWrite(clockPin, HIGH);
 
  if(i2c_start(addr+I2C_WRITE)) {
    Serial.println("ERROR i2c_start");
    i2c_stop();
    return 1;
  }
  if (i2c_write(cmd)) {
    Serial.println("ERROR i2c_write");
    i2c_stop();
    return 1;
  }
  i2c_stop();
   
  delayMicroseconds(60); // Needed for receiving to work
  pinMode(clockPin, OUTPUT);
  digitalWrite(clockPin, LOW);
  delayMicroseconds(34);
  pinMode(clockPin, INPUT);
  digitalWrite(clockPin, HIGH);
  delayMicroseconds(60);  

  if(i2c_rep_start(addr + I2C_READ)) {
    Serial.println("ERROR i2c_rep_start");
    i2c_stop();
    return 1;
  }
  
  for (int i = 0; i < 8; i++) {
    buf[i] = i2c_readAck();
  }
  buf[8] = i2c_readNak();
  i2c_stop();
  return 0;
}

void printUltrasonicCommand(byte cmd) {
  if (ultrasonicCommand(cmd)) return;
  if (cmd == 0x00 || cmd == 0x08 || cmd == 0x10 || cmd == 0x14) {
    int i = 0;
    while (i < 9 && buf[i] != 0xFF && buf[i] != 0x00) {
      Serial.print((char) buf[i]);
      i++;
    }
    Serial.println("");
  } else {
    Serial.println(buf[0], DEC); 
  }
}

byte readDistance() {  
  if (ultrasonicCommand(0x42)) return 0xFF;
  return buf[0];
}


void setup() {  
  i2c_init();//I2C frequency = 11494,253Hz
  s.attach(9);
  
  lcd.begin(16, 2);
  // Print a message to the LCD.
  lcd.print("hello, world!");
  
  Serial.begin(115200);
  
  Serial.print("Version: ");
  printUltrasonicCommand(0x00); //Read Version
  
  Serial.print("Product ID: ");
  printUltrasonicCommand(0x08); //Read Product ID
  
  Serial.print("Sensor Type: ");
  printUltrasonicCommand(0x10); //Read Sensor Type

  Serial.print("Sensor Units: ");
  printUltrasonicCommand(0x14); //Read Measurement Units  
}

void loop()
{
  //  printUltrasonicCommand(0x42);//Read Measurement Byte 0
  distance = readDistance();
  lcd.setCursor(0, 1);
  if(distance == 0xFF) {
    lcd.print("Err Reading Dist");
  } else {
    servo_val = (int) distance;
    servo_val = map(servo_val, 0, 21, 0, 180);
    s.write(servo_val);
    delay(30);
    
    sprintf(disp, "%-16u", distance);
    lcd.print(disp);
    

  }
}

/*
' Wires on NXT jack plug.
' Wire colours may vary. Pin 1 is always end nearest latch.
' 1 White +9V
' 2 Black GND
' 3 Red GND
' 4 Green +5V
' 5 Yellow SCL - also connect clockpin to give a extra low impuls
' 6 Blue SDA
' Do not use i2c pullup resistor - already provided within sensor.
*/
