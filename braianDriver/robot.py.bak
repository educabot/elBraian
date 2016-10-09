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
file_handler = logging.FileHandler('/var/tmp/braian.log')
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s") 
handler.setFormatter(formatter)
if env == 'prod':
	file_handler.setFormatter(formatter)
	log.addHandler(file_handler)
log.addHandler(handler)



log.info("using "+ env +" configuration ")

if env == "prod":
	import RPi.GPIO as gpio
	import RPIO.PWM as pwm


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
	HEAD_HORIZONTAL_RANGE = config.get("robot.gpio","head_horizontal_range").split(",")
	HEAD_VERTICAL_RANGE = config.get("robot.gpio","head_vertical_range").split(",")

	RIGHT_WHEEL_SENSOR = int(config.get("robot.gpio","right_wheel_sensor"))
	LEFT_WHEEL_SENSOR = int(config.get("robot.gpio", "left_wheel_sensor"))

	SERVO = None

	head_vertical_current_position = None
	head_horizontal_current_position = None

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
			self.SERVO = pwm.Servo(pulse_incr_us=1)

				
		self.current_horizontal_head_pos = 0
		self.current_vertical_head_pos = 0
		self.center_head()
		self._counting_steps = 0
		self._current_steps = 0

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
		log.debug("centering head")
		self.head_horizontal_current_position = 0 
		self.head_vertical_current_position = 0
		if env == "prod":
			self.SERVO.set_servo(self.HEAD_HORIZONTAL_PIN, self._angle_to_ms(0))
			self.SERVO.set_servo(self.HEAD_VERTICAL_PIN, self._angle_to_ms(0))


	def _angle_to_ms(self,angle):
		return 1520 + (int(angle)*400) / 45


	def move_head_horizontal(self, angle):
		log.debug("horizontal limits: " + self.HEAD_HORIZONTAL_RANGE[0] +" "+ self.HEAD_HORIZONTAL_RANGE[1])
		log.debug("new horizontal angle: " + str(angle))
		if angle > int(self.HEAD_HORIZONTAL_RANGE[0]) and angle < int(self.HEAD_HORIZONTAL_RANGE[1]):
			log.debug("moving head horizontal to angle: " + str(angle))
			self.head_horizontal_current_position = angle
			if env == "prod":
				self.SERVO.set_servo(self.HEAD_HORIZONTAL_PIN, self._angle_to_ms(angle))


	def move_head_vertical(self, angle):
		log.debug("vertical limits: " + self.HEAD_VERTICAL_RANGE[0] +" "+ self.HEAD_VERTICAL_RANGE[1])
		log.debug("new vertical angle: " + str(angle))
		if angle > int(self.HEAD_VERTICAL_RANGE[0]) and angle < int(self.HEAD_VERTICAL_RANGE[1]):
			log.debug("moving head vertical to angle: " + str(angle))
			self.head_vertical_current_position = angle
			if env == "prod":
				self.SERVO.set_servo(self.HEAD_VERTICAL_PIN, self._angle_to_ms(angle))

	def steps(self, counting):
		self._current_steps = counting
		self.move(speed=self.SPEED_HIGH)
		self.move(speed=self.SPEED_MEDIUM)
		rpio.add_interrupt_callback(RIGHT_WHEEL_SENSOR, self._steps_callback, threaded_callback=True)
		rpio.add_interrupt_callback(LEFT_WHEEL_SENSOR, self._steps_callback, threaded_callback=True)
		rpio.wait_for_interrupts(threaded=True)

	def _steps_callback(self, gpio_id, value):
		self._counting_steps += 1
		if self._counting_steps > self._current_steps:
			self._counting_steps = 0
			self._current_steps = 0
			rpio.stop_waiting_for_interrupts()

