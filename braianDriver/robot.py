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
	from gpiozero import PWMOutputDevice, DigitalOutputDevice, AngularServo

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

	#v2
	WHEEL_LEFT_ENABLED = int(config.get("robot.board.v2", "wheel_left_enabled"))
	WHEEL_LEFT_HEADING = int(config.get("robot.board.v2", "wheel_left_heading"))
	WHEEL_LEFT_STEP = int(config.get("robot.board.v2", "wheel_left_step"))

	WHEEL_RIGHT_ENABLED = int(config.get("robot.board.v2", "wheel_right_enabled"))
	WHEEL_RIGHT_HEADING = int(config.get("robot.board.v2", "wheel_right_heading"))
	WHEEL_RIGHT_STEP = int(config.get("robot.board.v2", "wheel_right_step"))


	SERVO_V = None
	SERVO_H = None

	head_vertical_current_position = None
	head_horizontal_current_position = None

	def __init__(self):
		if env == "prod":

			log.debug("Using %s configuration" % self.CONTROLLER_BOARD )

			self.SERVO_H = AngularServo(self.HEAD_HORIZONTAL_PIN, min_angle=-80, max_angle=80)
			self.SERVO_V = AngularServo(self.HEAD_VERTICAL_PIN, min_angle=-80, max_angle=80)

			##Digital devices
			self.forward_left_device = None
			self.forward_right_device = None
			self.backward_left_device = None
			self.backward_right_device = None

			self.wheel_right_step = None
			self.wheel_left_step = None
			self.wheel_right_heading = None
			self.wheel_left_heading = None
			self.wheel_right_enabled = None
			self.wheel_left_enabled = None

			self.pwm_left = None
			self.pwm_right = None

			if self.CONTROLLER_BOARD == "v1":
				self.forward_left_device = DigitalOutputDevice(self.FORWARD_LEFT_PIN, True, False)
				self.forward_right_device = DigitalOutputDevice(self.FORWARD_RIGHT_PIN, True, False)
				self.backward_left_device = DigitalOutputDevice(self.BACKWARD_LEFT_PIN, True, False)
				self.backward_right_device = DigitalOutputDevice(self.BACKWARD_RIGHT_PIN, True, False)
				self.pwm_left = PWMOutputDevice(self.PWM_LEFT_PIN, True, False, self.FRECUENCY)
				self.pwm_right = PWMOutputDevice(self.PWM_RIGHT_PIN, True, False, self.FRECUENCY)


			if self.CONTROLLER_BOARD == "v2":
				self.wheel_right_step = DigitalOutputDevice(self.WHEEL_RIGHT_STEP, True, False)
				self.wheel_left_step = DigitalOutputDevice(self.WHEEL_LEFT_STEP, True, False)
				self.wheel_right_heading = DigitalOutputDevice(self.WHEEL_RIGHT_HEADING, True, False)
				self.wheel_left_heading = DigitalOutputDevice(self.WHEEL_LEFT_HEADING, True, False)
				self.wheel_right_enabled = DigitalOutputDevice(self.WHEEL_RIGHT_ENABLED, True, False)
				self.wheel_left_enabled = DigitalOutputDevice(self.WHEEL_LEFT_ENABLED, True, False)


		self.current_horizontal_head_pos = 0
		self.current_vertical_head_pos = 0
		self.center_head()
		self._counting_steps = 0
		self._current_steps = 0
		self._stepper_current_step = 0

	def _set_left_forward(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_left_device.on()
			self.backward_left_device.off()


	def _set_left_backward(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_left_device.off()
			self.backward_left_device.on()

	def _set_left_stop(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_left_device.on()
			self.backward_left_device.on()

	def _set_right_forward(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_right_device.on()
			self.backward_right_device.off()

	def _set_right_backward(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_right_device.off()
			self.backward_right_device.on()

	def _set_right_stop(self):
		if self.CONTROLLER_BOARD == "v1":
			self.forward_right_device.on()
			self.backward_right_device.on()

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
			if self.CONTROLLER_BOARD == "v1":
				self.pwm_left.off()
				self.pwm_right.off()

	def move(self, speed=None, arc=None, steps=100, delay=0.7, heading=1):
		if self.CONTROLLER_BOARD == "v1":
			self._move_dc(speed, arc)
		elif self.CONTROLLER_BOARD == "v2":
			self._move_steppers_bipolar(steps=steps, delay=delay, heading=heading)

	def _move_dc(self, speed, arc):
		log.debug("Moving using DC motors")
		if (speed and arc):
			print("Error: speed and arc could not be setted up at the same time")
			return

		if env == "prod":
			self.pwm_left.on()
			self.pwm_right.on()

		if (speed):
			log.debug("moving on " + str(speed))
			log.debug("aplying fit: left " + str(self.LEFT_CYCLES_FIT) + " right " + str(self.RIGHT_CYCLES_FIT))
			aditional_left_clycles = self.LEFT_CYCLES_FIT if ((speed + self.LEFT_CYCLES_FIT) <= 100.00) else 0.00
			aditional_right_clycles = self.RIGHT_CYCLES_FIT if ((speed + self.RIGHT_CYCLES_FIT) <= 100.00) else 0.00

			if env == "prod":
				self.pwm_left.value = (speed + aditional_left_clycles) / 100.00
				self.pwm_right.value = (speed + aditional_right_clycles) / 100.00

		if (arc):
			cycle_left, cycle_right = arc
			log.debug("turning -> left wheel: " + str(cycle_left) + " right wheel: " + str(cycle_right))
			if env == "prod":
				self.pwm_left.value = cycle_left / 100.00
				self.pwm_right.value = cycle_right / 100.00



	def _move_steppers_bipolar(self, steps, heading, delay):
		"""
		Currently it would take 4 steps to complete a whole wheel turn
		"""
		log.debug("Moving steppers bipolars . Steps " + str(steps) + " delay " + str(delay))
		steps_left = abs(steps)

		if env == "prod":
			self.wheel_left_enabled.off()
			self.wheel_right_enabled.off()

		while(steps_left!=0):
			log.debug("Current step: " + str(steps_left))
			if env == "prod":
				if heading:
					self.wheel_left_heading.on()
					self.wheel_right_heading.off()
				else:
					self.wheel_left_heading.off()
					self.wheel_right_heading.on()

				self.wheel_left_step.off()
				self.wheel_right_step.off()
				sleep(delay/1000.00)
				self.wheel_left_step.on()
				self.wheel_right_step.on()
				sleep(delay/1000.00)
			steps_left -= 1

		if env == "prod":
			self.wheel_left_enabled.on()
			self.wheel_right_enabled.on()


	def center_head(self):
		log.debug("centering head")
		self.head_horizontal_current_position = 0
		self.head_vertical_current_position = 0
		if env == "prod":
			self.SERVO_H.mid()
			self.SERVO_V.mid()
			sleep(0.2)
			self.SERVO_H.detach()
			self.SERVO_V.detach()


	def _angle_to_ms(self,angle):
		return 1520 + (int(angle)*400) / 45


	def move_head_horizontal(self, angle):
		log.debug("horizontal limits: " + self.HEAD_HORIZONTAL_RANGE[0] +" "+ self.HEAD_HORIZONTAL_RANGE[1])
		log.debug("new horizontal angle: " + str(angle))
		if angle > int(self.HEAD_HORIZONTAL_RANGE[0]) and angle < int(self.HEAD_HORIZONTAL_RANGE[1]):
			log.debug("moving head horizontal to angle: " + str(angle))
			self.head_horizontal_current_position = angle
			if env == "prod":
				self.SERVO_H.angle = angle
				sleep(0.2)
				self.SERVO_H.detach()

	def move_head_vertical(self, angle):
		log.debug("vertical limits: " + self.HEAD_VERTICAL_RANGE[0] +" "+ self.HEAD_VERTICAL_RANGE[1])
		log.debug("new vertical angle: " + str(angle))
		if angle > int(self.HEAD_VERTICAL_RANGE[0]) and angle < int(self.HEAD_VERTICAL_RANGE[1]):
			log.debug("moving head vertical to angle: " + str(angle))
			self.head_vertical_current_position = angle
			if env == "prod":
				self.SERVO_V.angle = angle
				sleep(0.2)
				self.SERVO_V.detach()

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
