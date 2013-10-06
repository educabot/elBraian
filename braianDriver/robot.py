import ConfigParser, os
import logging

config = ConfigParser.ConfigParser()
config.read('config/application.cfg')
env = config.get("system","env")

log = logging.getLogger("Robot")
logger_level = config.get("system","logging.level")

if logger_level == "DEBUG":
	log.setLevel(logging.DEBUG)
elif logger_level == "INFO":
	log.setLevel(logging.INFO)
elif logger_level == "WARNING":
	log.setLevel(logging.WARNING)

handler = logging.StreamHandler()
formatter = logging.Formatter("%(levelname)s %(asctime)s %(module)s %(funcName)s %(lineno)d %(message)s") 
handler.setFormatter(formatter)
log.addHandler(handler)


log.info("using "+ env +" configuration ")

if env == "prod":
	import RPi.GPIO as gpio

#import wirinpi

##Speed expressed on duty cycles

## Setting up the GPIO
## using PWM by hardware must use wiringpi
#wiring_pin = 1

#wiringpi.wiringPiSetup()
#wiringpi.pinMode(wiring_pin,2) #PWM mode

class Robot(object):
	SPEED_HIGH = config.get("robot.gpio","speed_high")  
	SPEED_MEDIUM = config.get("robot.gpio","speed_medium")
	SPEED_LOW = config.get("robot.gpio","speed_low")

	##Define the arc of the turn process by a tuple wheels speed (left, right)
	LEFT_ARC_CLOSE = 40,100
	LEFT_ARC_OPEN = 60,100

	RIGHT_ARC_CLOSE = 100,40
	RIGHT_ARC_OPEN = 100,60

	#Pin pair left
	FORWARD_LEFT_PIN = 19
	BACKWARD_LEFT_PIN = 21

	#Pin pair right
	FORWARD_RIGHT_PIN = 24
	BACKWARD_RIGHT_PIN = 22

	#PWM PINS
	PWM_LEFT_PIN = 12
	PWM_RIGHT_PIN = 18

	#Frecuency by hertz
	FRECUENCY = 1500

	def __init__(self):
		if env == "prod":
			gpio.cleanup()

			gpio.setmode(gpio.BOARD)


			##Left Side
			gpio.setup(self.FORWARD_LEFT_PIN,gpio.OUT)
			gpio.setup(self.BACKWARD_LEFT_PIN,gpio.OUT)
			## Setting both to True to force stopping wheels
			gpio.output(self.FORWARD_LEFT_PIN,True)
			gpio.output(self.BACKWARD_LEFT_PIN,True)

			##Right Side
			gpio.setup(self.FORWARD_RIGHT_PIN,gpio.OUT)
			gpio.setup(self.BACKWARD_RIGHT_PIN,gpio.OUT)
			## Setting both to True to force stopping wheels
			gpio.output(self.FORWARD_RIGHT_PIN,True)
			gpio.output(self.BACKWARD_RIGHT_PIN,True)

			#PWM
			gpio.setup(self.PWM_LEFT_PIN,gpio.OUT)
			gpio.setup(self.PWM_RIGHT_PIN,gpio.OUT)

			self.pwm_left = gpio.PWM(self.PWM_LEFT_PIN, self.FRECUENCY)
			self.pwm_right = gpio.PWM(self.PWM_RIGHT_PIN, self.FRECUENCY)
	

	def _set_left_forward(self):
		gpio.output(self.FORWARD_LEFT_PIN, True)
		gpio.output(self.BACKWARD_LEFT_PIN, False)


	def _set_left_backward(self):
		gpio.output(self.FORWARD_LEFT_PIN, False)
		gpio.output(self.BACKWARD_LEFT_PIN, True)


	def _set_left_stop(self):
		gpio.output(self.FORWARD_LEFT_PIN, True)
		gpio.output(self.BACKWARD_LEFT_PIN, True)


	def _set_right_forward(self):
		gpio.output(self.FORWARD_RIGHT_PIN, True)
		gpio.output(self.BACKWARD_RIGHT_PIN, False)


	def _set_right_backward(self):
		gpio.output(self.FORWARD_RIGHT_PIN, False)
		gpio.output(self.BACKWARD_RIGHT_PIN, True)


	def _set_right_stop(self):
		gpio.output(self.FORWARD_RIGHT_PIN, True)
		gpio.output(self.BACKWARD_RIGHT_PIN, True)


	def set_forward(self):
		log.debug("setting movement to forward")
		if env == "prod":
			self._set_left_forward()
			self._set_right_forward()
		

	def set_backward(self):
		log.debug("setting movement to backward")
		if env == "prod":
			self._set_left_backward()
			self._set_right_backward() 


	def set_rotate_left(self):
		log.debug("setting movement to rotate left")
		if env == "prod":
			self._set_left_backward()
			self._set_right_forward()

	def set_rotate_right(self):
		log.debug("setting movement to rotate right")
		if env == "prod":
			self._set_right_backward()
			self._set_left_forward()

	def stop(self):
		log.debug("stopping")
		if env == "prod":
			self._set_right_stop()
			self._set_left_stop()
			self.pwm_left.stop()
			self.pwm_right.stop()

	def move(self, speed=None, arc=None):
		
		if (speed and arc):
			print "Error: speed and arc could not be setted up at the same time"
			return

		if env == "prod":
			self.pwm_left.start(0)
			self.pwm_right.start(0)

		if (speed):
			log.debug("moving on " + str(speed))
			if env == "prod":
				self.pwm_left.ChangeDutyCycle(speed)
				self.pwm_right.ChangeDutyCycle(speed)

		if (arc):
			cycle_left, cycle_right = arc
			log.debug("turning -> left wheel: " + str(cycle_left) + " right wheel: " + str(cycle_right))
			if env == "prod":
				self.pwm_left.ChangeDutyCycle(cycle_left)
				self.pwm_right.ChangeDutyCycle(cycle_right)

		