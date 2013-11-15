import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)

gpio.setup(7,gpio.OUT)
gpio.setup(5,gpio.OUT)

horizontal = gpio.PWM(5,50)
vertical = gpio.PWM(7,50)

horizontal.start(3.5)
sleep(0.5)
horizontal.stop()
horizontal.start(11.5)
sleep(0.5)
horizontal.stop()

vertical.start(4.5)
sleep(0.5)
vertical.stop()

vertical.start(8)
sleep(0.5)
vertical.stop()

gpio.cleanup()
