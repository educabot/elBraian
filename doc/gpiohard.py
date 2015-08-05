import RPi.GPIO as gpio
from time import sleep 


gpio.cleanup()

gpio.setmode(gpio.BOARD)


##Left Side
gpio.setup(19,gpio.OUT)
gpio.setup(21,gpio.OUT)
gpio.output(19,True)
gpio.output(21,True)
##Right Side
gpio.setup(22,gpio.OUT)
gpio.setup(24,gpio.OUT)
gpio.output(22,True)
gpio.output(24,True)

#PWM
gpio.setup(12,gpio.OUT)
gpio.setup(18,gpio.OUT)

pwm_left = gpio.PWM(12, 1500)
pwm_right = gpio.PWM(18, 1500)

def move(arc):
	pwm_left.start(0)
	pwm_right.start(0)
	cycle_left, cycle_right = arc
	try:  
	    while True:  
		pwm_left.ChangeDutyCycle(cycle_left)
		pwm_right.ChangeDutyCycle(cycle_right)
	except KeyboardInterrupt:  
	    pwm_left.stop()
	    pwm_right.stop()



##Forward
#21 on
gpio.output(19, False)
#24 on
gpio.output(22, False)

move((40,100))

##barckward
gpio.output(21, False)
gpio.output(19, True)

gpio.output(24, False)
gpio.output(22, True)

move((100,40))



gpio.cleanup()         
