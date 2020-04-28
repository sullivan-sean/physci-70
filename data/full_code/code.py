import time
import os
import board
import busio
import adafruit_mpu6050
import digitalio
import microcontroller

led = digitalio.DigitalInOut(board.D13)
led.switch_to_output()

i2c = busio.I2C(board.SCL, board.SDA)
mpu = adafruit_mpu6050.MPU6050(i2c)

try:
    with open("/test.csv", "a") as fp:
        i = 0
        while True:
            line = (time.monotonic_ns(),) + mpu.acceleration + mpu.gyro
            fp.write('{}\n'.format(','.join(str(a) for a in line)))
            fp.flush()
            print(i, line[0], os.statvfs("/"))
            if os.statvfs("/")[4] < 20:
                break
            time.sleep(0.01)
except OSError as e:
    delay = 0.5
    if e.args[0] == 28:
        delay = 0.25
    while True:
        led.value = not led.value
        time.sleep(delay)
