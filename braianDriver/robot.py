#import RPi.GPIO as gpio
#import wirinpi

##Speed expressed on duty cycles

## Setting up the GPIO
## using PWM by hardware must use wiringpi
#wiring_pin = 1

#wiringpi.wiringPiSetup()
#wiringpi.pinMode(wiring_pin,2) #PWM mode

##Using RPI.GPIO
#gpio.cleanup()

#gpio.setmode(gpio.BOARD)

##Left Side
#gpio.setup(11,gpio.OUT)
#gpio.setup(13,gpio.OUT)

##Right Side
#gpio.setup(15,gpio.OUT)
#gpio.setup(16,gpio.OUT)

#PWM
#gpio.setup(12,gpio.OUT)
#pwm = gpio.PWM(12, 1500)

class Robot(object):
	SPEED_HIGH = 100  
	SPEED_MEDIUM = 70
	SPEED_LOW = 40

	##Define the arc of the turn process by a tuple wheels speed (left, right)
	LEFT_ARC_CLOSE = 40,100
	LEFT_ARC_OPEN = 60,100

	RIGHT_ARC_CLOSE = 100,40
	RIGHT_ARC_OPEN = 100,60

	def set_forward(self):
		print "Moving forward " 

	def set_backward(self):
		print "Moving backward " 

	def set_rotate_left(self):
		pass

	def set_rotate_right(self):
		pass

	def stop(self):
		print "stopping.."
		pass

	def move(self, speed=None, arc=None):
		if (speed and arc):
			print "Error: speed and arc could not be setted up at the same time"
		
		if (speed):
			print ("and moving on " + str(speed) + " cycles")

		if (arc):
			print "left wheel on: " + str(arc[0]) + " and right wheel on: " + str(arc[1])
			print "turning to the right" if arc[0] > arc[1] else "turning to the left" 
