import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)

gpio.setup(7,gpio.OUT)
gpio.setup(5,gpio.OUT)

def center():
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

def move_left():
    sleep(0.035)
    gpio.output(5,1)
    sleep(0.0025)
    gpio.output(5,0)


def move_right():
    sleep(0.035)
    gpio.output(5,1)
    sleep(0.00025)
    gpio.output(5,0)

def move_up():
    sleep(0.035)
    gpio.output(7,1)
    sleep(0.00025)
    gpio.output(7,0)


def move_down():
    sleep(0.035)
    gpio.output(7,1)
    sleep(0.0025)
    gpio.output(7,0)
