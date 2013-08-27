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
	SPEED_HIGH = 20  
	SPEED_MEDIUM = 60
	SPEED_LOW = 100

	def set_forward(self):
		print "Moving forward " 
		pass

	def set_backward(self):
		print "Moving backward " 
		pass

	def set_turn_left(self, degrees):
		print "turnin left " + str(unit) 
		pass

	def set_turn_right(self, degrees):
		print "Turning right " + str(unit) 	
		pass

	def set_rotate_left(self):
		pass

	def set_rotate_right(self):
		pass

	def stop(self):
		print "stopping.."
		pass

	def move(self, speed):
		print ("and moving on " + str(speed) + " cycles")
		pass
