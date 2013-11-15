import ConfigParser, os
import logging
from time import sleep

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
	SPEED_HIGH = int(config.get("robot.speed","speed_high"))  
	SPEED_MEDIUM = int(config.get("robot.speed","speed_medium"))
	SPEED_LOW = int(config.get("robot.speed","speed_low"))

	##Define the arc of the turn process by a tuple wheels speed (left, right)
	LEFT_ARC_CLOSE = eval(config.get("robot.speed","left_arc_close"))
	LEFT_ARC_OPEN = eval(config.get("robot.speed","left_arc_open"))

	RIGHT_ARC_CLOSE = eval(config.get("robot.speed","right_arc_close"))
	RIGHT_ARC_OPEN = eval(config.get("robot.speed","right_arc_open"))

	#Pin pair left
	FORWARD_LEFT_PIN = int(config.get("robot.gpio","forward_left_pin"))
	BACKWARD_LEFT_PIN = int(config.get("robot.gpio","backward_left_pin"))

	#Pin pair right
	FORWARD_RIGHT_PIN = int(config.get("robot.gpio","forward_right_pin"))
	BACKWARD_RIGHT_PIN = int(config.get("robot.gpio","backward_right_pin"))

	#PWM PINS
	PWM_LEFT_PIN = int(config.get("robot.gpio","pwm_left_pin"))
	PWM_RIGHT_PIN = int(config.get("robot.gpio","pwm_right_pin"))

	#Frecuency by hertz
	FRECUENCY = int(config.get("robot.gpio","frecuency"))

	# Cycles fits for pwm cycles
	LEFT_CYCLES_FIT = int(config.get("robot.gpio","left_cycles_fit"))
	RIGHT_CYCLES_FIT = int(config.get("robot.gpio","right_cycles_fit"))

	#Pin settings for head control
	HEAD_HORIZONTAL_PIN = int(config.get("robot.gpio","head_pwm_pin_horizontal_axis"))
	HEAD_VERTICAL_PIN = int(config.get("robot.gpio","head_pwm_pin_vertical_axis"))

	SERVO_FREQUENCY = int(config.get("robot.gpio","servo_frequency"))
	SERVO_UNITY_MOVEMENT = float(config.get("robot.gpio","servo_unity_movement"))

	MAX_HORIZONTAL_CYLES = float(config.get("robot.gpio","max_horizontal_cycles")) 
	MIN_HORIZONTAL_CYLES = float(config.get("robot.gpio","min_horizontal_cycles"))
	MAX_VERTICAL_CYLES = float(config.get("robot.gpio","max_vertical_cycles")) 
	MIN_VERTICAL_CYLES = float(config.get("robot.gpio","min_vertical_cycles"))

	SERVO_DELAY = float(config.get("robot.gpio","servo_delay"))



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

			# head
			gpio.setup(self.HEAD_HORIZONTAL_PIN,gpio.OUT)
			gpio.setup(self.HEAD_VERTICAL_PIN,gpio.OUT)

			self.head_horizontal_port = gpio.PWM(self.HEAD_HORIZONTAL_PIN, self.SERVO_FREQUENCY)
			self.head_vertical_port = gpio.PWM(self.HEAD_VERTICAL_PIN, self.SERVO_FREQUENCY)
		
		self.current_horizontal_head_pos = 0
		self.current_vertical_head_pos = 0
		self.center_head()

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
			log.debug("aplying fit: left " + str(self.LEFT_CYCLES_FIT) + " right " + str(self.RIGHT_CYCLES_FIT))
			aditional_left_clycles = self.LEFT_CYCLES_FIT if ((speed + self.LEFT_CYCLES_FIT) <= 100) else 0
			aditional_right_clycles = self.RIGHT_CYCLES_FIT if ((speed + self.RIGHT_CYCLES_FIT) <= 100) else 0

			if env == "prod":
				self.pwm_left.ChangeDutyCycle(speed+aditional_left_clycles)
				self.pwm_right.ChangeDutyCycle(speed+aditional_right_clycles)

		if (arc):
			cycle_left, cycle_right = arc
			log.debug("turning -> left wheel: " + str(cycle_left) + " right wheel: " + str(cycle_right))
			if env == "prod":
				self.pwm_left.ChangeDutyCycle(cycle_left)
				self.pwm_right.ChangeDutyCycle(cycle_right)


	def center_head(self):
		log.debug("turning my head to the center")
		self.current_horizontal_head_pos = (self.MAX_HORIZONTAL_CYLES + self.MIN_HORIZONTAL_CYLES) / 2
		self.current_vertical_head_pos = (self.MAX_VERTICAL_CYLES + self.MIN_HORIZONTAL_CYLES) / 2
		self._send_horizontal_signal(self.current_horizontal_head_pos)
		self._send_vertical_signal(self.current_vertical_head_pos)


	def head_move_left(self):
		if ((self.current_horizontal_head_pos + self.SERVO_UNITY_MOVEMENT) <= self.MAX_HORIZONTAL_CYLES):
			log.debug("moving head to the left ")
			self.current_horizontal_head_pos += self.SERVO_UNITY_MOVEMENT
			self._send_horizontal_signal(self.current_horizontal_head_pos)



	def head_move_right(self):
		log.debug("moving head to the right ")
		if ((self.current_horizontal_head_pos + self.SERVO_UNITY_MOVEMENT) >= self.MIN_HORIZONTAL_CYLES):
			self.current_horizontal_head_pos -= self.SERVO_UNITY_MOVEMENT
			self._send_horizontal_signal(self.current_horizontal_head_pos)

	def _send_horizontal_signal(self, position):
		log.debug("horizontal pos: " + str(position))
		if env == "prod":
			self.head_horizontal_port.start(position)
			sleep(self.SERVO_DELAY)
			self.head_horizontal_port.stop()


	def head_move_up(self):
		log.debug("moving head to the up ")
		if ((self.current_vertical_head_pos + self.SERVO_UNITY_MOVEMENT) >= self.MIN_VERTICAL_CYLES):
			self.current_vertical_head_pos -= self.SERVO_UNITY_MOVEMENT
			self._send_vertical_signal(self.current_vertical_head_pos)

	def head_move_down(self):
		log.debug("moving head to the down ")
		if ((self.current_vertical_head_pos + self.SERVO_UNITY_MOVEMENT) <= self.MAX_VERTICAL_CYLES):
			self.current_vertical_head_pos += self.SERVO_UNITY_MOVEMENT
			self._send_vertical_signal(self.current_vertical_head_pos)


	def _send_vertical_signal(self, position):
		log.debug("horizontal pos: " + str(position))
		if env == "prod":
			self.head_vertical_port.start(position)
			sleep(self.SERVO_DELAY)
			self.head_vertical_port.stop()
		