import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)

gpio.setup(7,gpio.OUT)
gpio.setup(5,gpio.OUT)

horizontal = gpio.PWM(5,25)
#vertical = gpio.PWM(7,50)

horizontal.start(5)

def angleConversion(value):
	return float(value) / 10.0 + 2.5

horizontal.ChangeDutyCycle(angleConversion(90))

while True:
	angle = raw_input('enter the new angle: ')
	horizontal.ChangeDutyCycle(angleConversion(angle))
	sleep(1)

