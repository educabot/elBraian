import RPi.GPIO as gpio
from time import sleep 

gpio.cleanup()

gpio.setmode(gpio.BOARD)


##Left Side
gpio.setup(11,gpio.OUT)
gpio.setup(13,gpio.OUT)

##Right Side
gpio.setup(15,gpio.OUT)
gpio.setup(16,gpio.OUT)

#PWM
gpio.setup(12,gpio.OUT)

pwm = gpio.PWM(12, 1500)

##Forward
gpio.output(11, True)
gpio.outout(15, True)
pwm.start(0)
try:  
    while True:  
		pwm.ChangeDutyCycle(50)
except KeyboardInterrupt:  
    pwm.stop()


##barckward
gpio.output(13, True)
gpio.outout(16, True)
pwm.start(0)
try:  
    while True:  
		pwm.ChangeDutyCycle(90)
except KeyboardInterrupt:  
    pwm.stop()

gpio.cleanup()         