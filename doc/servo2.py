import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)

gpio.setup(7,gpio.OUT)
gpio.setup(5,gpio.OUT)

#centrar
for i in range(1,10):
        sleep(0.035)
        gpio.output(5,1)
        sleep(0.0015)
        gpio.output(5,0)
for i in range(1,6):
        sleep(0.035)
        gpio.output(7,1)
        sleep(0.0015)
        gpio.output(7,0)

sleep(1)

for i in range(1,5):
        sleep(0.035)
        gpio.output(5,1)
        sleep(0.00025)
        gpio.output(5,0)

sleep(1)
for i in range(1,5):
        sleep(0.035)
        gpio.output(7,1)
        sleep(0.00025)
        gpio.output(7,0)

sleep(1)
for i in range(1,7):
        sleep(0.035)
        gpio.output(5,1)
        sleep(0.0025)
        gpio.output(5,0)

sleep(1)
for i in range(1,5):
        sleep(0.035)
        gpio.output(7,1)
        sleep(0.0025)
        gpio.output(7,0)


gpio.cleanup()
