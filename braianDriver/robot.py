import RPi.GPIO as gpio
#import wirinpi

##Speed expressed on duty cycles

## Setting up the GPIO
## using PWM by hardware must use wiringpi
#wiring_pin = 1

#wiringpi.wiringPiSetup()
#wiringpi.pinMode(wiring_pin,2) #PWM mode

class Robot(object):
	SPEED_HIGH = 100  
	SPEED_MEDIUM = 70
	SPEED_LOW = 40

	##Define the arc of the turn process by a tuple wheels speed (left, right)
	LEFT_ARC_CLOSE = 40,100
	LEFT_ARC_OPEN = 60,100

	RIGHT_ARC_CLOSE = 100,40
	RIGHT_ARC_OPEN = 100,60

	#Pin pair left
	FORWARD_LEFT_PIN = 21
	BACKWARD_LEFT_PIN = 19

	#Pin pair right
	FORWARD_RIGHT_PIN = 24
	BACKWARD_RIGHT_PIN = 22

	#PWM PINS
	PWM_LEFT_PIN = 12
	PWM_RIGHT_PIN = 18

	#Frecuency by hertz
	FRECUENCY = 1500

	def __init__(self):
		gpio.cleanup()

		gpio.setmode(gpio.BOARD)


		##Left Side
		gpio.setup(FORWARD_LEFT_PIN,gpio.OUT)
		gpio.setup(BACKWARD_LEFT_PIN,gpio.OUT)
		## Setting both to True to force stopping wheels
		gpio.output(FORWARD_LEFT_PIN,True)
		gpio.output(BACKWARD_LEFT_PIN,True)

		##Right Side
		gpio.setup(FORWARD_RIGHT_PIN,gpio.OUT)
		gpio.setup(BACKWARD_RIGHT_PIN,gpio.OUT)
		## Setting both to True to force stopping wheels
		gpio.output(FORWARD_RIGHT_PIN,True)
		gpio.output(BACKWARD_RiGHT_PIN,True)

		#PWM
		gpio.setup(PWM_LEFT_PIN,gpio.OUT)
		gpio.setup(PWM_RIGHT_PIN,gpio.OUT)

		self.pwm_left = gpio.PWM(PWM_LEFT_PIN, FRECUENCY)
		self.pwm_right = gpio.PWM(PWM_RIGHT_PIN, FRECUENCY)
	

	def _set_left_forward(self):
		gpio.output(FORWARD_LEFT_PIN, True)
		gpio.output(BACKWARD_LEFT_PIN, False)


	def _set_left_backward(self):
		gpio.output(FORWARD_LEFT_PIN, False)
		gpio.output(BACKWARD_LEFT_PIN, True)


	def _set_left_stop(self):
		gpio.output(FORWARD_LEFT_PIN, True)
		gpio.output(BACKWARD_LEFT_PIN, True)


	def _set_right_forward(self):
		gpio.output(FORWARD_RIGHT_PIN, True)
		gpio.output(BACKWARD_RIGHT_PIN, False)


	def _set_right_backward(self):
		gpio.output(FORWARD_RIGHT_PIN, False)
		gpio.output(BACKWARD_RIGHT_PIN, True)


	def _set_right_stop(self):
		gpio.output(FORWARD_RIGHT_PIN, True)
		gpio.output(BACKWARD_RIGHT_PIN, True)


	def set_forward(self):
		print "Moving forward"
		_set_left_forward()
		_set_right_forward()
		

	def set_backward(self):
		print "Moving backward "
		_set_left_backward()
		_set_right_backward() 

	def set_rotate_left(self):
		print "Rotate to left"
		_set_left_backward()
		_set_right_forward()

	def set_rotate_right(self):
		print "rotate to the right"
		_set_right_backward()
		_set_left_forward()

	def stop(self):
		print "stopping.."
		_set_right_stop()
		_set_left_stop()
		self.pwm_left.stop()
		self.pwm_right.stop()

	def move(self, speed=None, arc=None):
		if (speed and arc):
			print "Error: speed and arc could not be setted up at the same time"
			return

		self.pwm_left.start(0)
		self.pwm_right.start(0)

		if (speed):
			pwm_left.ChangeDutyCycle(speed)
			pwm_right.ChangeDutyCycle(speed)

		if (arc):
			cycle_left, cycle_right = arc
			pwm_left.ChangeDutyCycle(cycle_left)
			pwm_right.ChangeDutyCycle(cycle_right)
