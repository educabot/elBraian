import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)

gpio.setup(7,gpio.OUT)
gpio.setup(5,gpio.OUT)

horizontal = gpio.PWM(7,50)
vertical = gpio.PWM(5,50)

horizontal.start(7.5)
vertical.start(5.5)

try:  
    while True:
	    horizontal.ChangeDutyCycle(2.5)
	    sleep(1)
		vertical.ChangeDutyCycle(5.5)
		sleep(1)
		vertical.ChangeDutyCycle(11.5)
		sleep(1)
		horizontal.ChangeDutyCycle(7.5)
		sleep(1)
		vertical.ChangeDutyCycle(5.5)
		sleep(1)
		vertical.ChangeDutyCycle(11.5)
		sleep(1)
		horizontal.ChangeDutyCycle(12.5)
		sleep(1)
		vertical.ChangeDutyCycle(5.5)
		sleep(1)
		vertical.ChangeDutyCycle(11.5)
		sleep(1)

except KeyboardInterrupt:  
    horizontal.stop()
    vertical.stop()
    gpio.cleanup()
