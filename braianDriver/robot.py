import configparser, os
import logging
from time import sleep

config = configparser.ConfigParser()
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

exciting_matrix = [(0,0,0,0),(1,0,0,0),(0,1,0,0),(0,0,1,0),(0,0,0,1)]

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
	FORWARD_LEFT_PIN = int(config.get("robot.board.v1","forward_left_pin"))
	BACKWARD_LEFT_PIN = int(config.get("robot.board.v1","backward_left_pin"))

	#Pin pair right
	FORWARD_RIGHT_PIN = int(config.get("robot.board.v1","forward_right_pin"))
	BACKWARD_RIGHT_PIN = int(config.get("robot.board.v1","backward_right_pin"))

	#PWM PINS
	PWM_LEFT_PIN = int(config.get("robot.board.v1","pwm_left_pin"))
	PWM_RIGHT_PIN = int(config.get("robot.board.v1","pwm_right_pin"))

	#Frecuency by hertz
	FRECUENCY = int(config.get("robot.board.v1","frecuency"))

	# Cycles fits for pwm cycles
	LEFT_CYCLES_FIT = int(config.get("robot.board.v1","left_cycles_fit"))
	RIGHT_CYCLES_FIT = int(config.get("robot.board.v1","right_cycles_fit"))

	#Pin settings for head control
	HEAD_HORIZONTAL_PIN = int(config.get("robot.board.v1","head_pwm_pin_horizontal_axis"))
	HEAD_VERTICAL_PIN = int(config.get("robot.board.v1","head_pwm_pin_vertical_axis"))
	HEAD_HORIZONTAL_RANGE = config.get("robot.board.v1","head_horizontal_range").split(",")
	HEAD_VERTICAL_RANGE = config.get("robot.board.v1","head_vertical_range").split(",")

	RIGHT_WHEEL_SENSOR = int(config.get("robot.board.v1","right_wheel_sensor"))
	LEFT_WHEEL_SENSOR = int(config.get("robot.board.v1", "left_wheel_sensor"))

	CONTROLLER_BOARD = config.get("robot.controller", "board")
	WHEEL_LEFT_COIL1 = int(config.get("robot.board.v2", "wheel_left_pin1"))
	WHEEL_LEFT_COIL2 = int(config.get("robot.board.v2", "wheel_left_pin2"))
	WHEEL_LEFT_COIL3 = int(config.get("robot.board.v2", "wheel_left_pin3"))
	WHEEL_LEFT_COIL4 = int(config.get("robot.board.v2", "wheel_left_pin4"))

	WHEEL_RIGHT_COIL1 = int(config.get("robot.board.v2", "wheel_right_pin1"))
	WHEEL_RIGHT_COIL2 = int(config.get("robot.board.v2", "wheel_right_pin1"))
	WHEEL_RIGHT_COIL3 = int(config.get("robot.board.v2", "wheel_right_pin1"))
	WHEEL_RIGHT_COIL4 = int(config.get("robot.board.v2", "wheel_right_pin1"))


	SERVO = None

	head_vertical_current_position = None
	head_horizontal_current_position = None

	def __init__(self):
		if env == "prod":
			gpio.cleanup()

			gpio.setmode(gpio.BOARD)

			if self.CONTROLLER_BOARD == "v1":

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

			if self.CONTROLLER_BOARD == "v2":
				gpio.setup(sef.WHEEL_LEFT_COIL1, gpio.OUT)
				gpio.setup(sef.WHEEL_LEFT_COIL2, gpio.OUT)
				gpio.setup(sef.WHEEL_LEFT_COIL3, gpio.OUT)
				gpio.setup(sef.WHEEL_LEFT_COIL4, gpio.OUT)

				gpio.setup(sef.WHEEL_RIGHT_COIL1, gpio.OUT)
				gpio.setup(sef.WHEEL_RIGHT_COIL2, gpio.OUT)
				gpio.setup(sef.WHEEL_RIGHT_COIL3, gpio.OUT)
				gpio.setup(sef.WHEEL_RIGHT_COIL4, gpio.OUT)

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
		self._stepper_current_step = 0

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

	def move(self, speed=None, arc=None, steps=None, delay=None):
		if self.CONTROLLER_BOARD == "v1":
			self._move_dc(speed, arc)
		elif self.CONTROLLER_BOARD == "v2":
			self._move_steppers(steps, delay)

	def _move_dc(self, speed, arc):
		log.debug("Moving using DC motors")
		if (speed and arc):
			print("Error: speed and arc could not be setted up at the same time")
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


	def _move_steppers(self, steps, delay, heading):
		"""
		Currently it would take 4 steps to complete a whole wheel turn
		"""
		log.debug("Moving steppers . Steps" + str(steps) + " delay " + str(delay))
		steps_left = steps

		while(steps_left>0):
			if heading == "FORWARD":
				if self._stepper_current_step == 3
					self._stepper_current_step = 0
				else:
					self._stepper_current_step += 1
			elif heading == "BACKWARD":
				if

			log.debug("Current step: " + self._stepper_current_step)

			c1, c2, c3, c4 = exciting_matrix[self._stepper_current_step]
			if env == "prod"
				gpio.output(self.WHEEL_LEFT_COIL1, c1)
				gpio.output(self.WHEEL_RIGHT_COIL1, c1)
				sleep(delay)
				gpio.output(self.WHEEL_LEFT_COIL1, c2)
				gpio.output(self.WHEEL_RIGHT_COIL1, c2)
				sleep(delay)
				gpio.output(self.WHEEL_LEFT_COIL1, c3)
				gpio.output(self.WHEEL_RIGHT_COIL1, c3)
				sleep(delay)
				gpio.output(self.WHEEL_LEFT_COIL1, c4)
				gpio.output(self.WHEEL_RIGHT_COIL1, c4)
				sleep(delay)
			steps_left -= 1


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

	#Used for encoders
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
