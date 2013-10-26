from time import sleep
from braianDriver.robot import Robot

robot = Robot()

def adelante():
	robot.set_forward()
	robot.move(speed=Robot.SPEED_MEDIUM)
	sleep(1)
	robot.stop()

def atras():
	robot.set_backward()
	robot.move(speed=Robot.SPEED_HIGH)
	sleep(1)
	robot.stop()

def girar_izquierda():
	robot.set_rotate_left()
	robot.move(speed=Robot.SPEED_LOW)
	sleep(1)
	robot.stop()

def girar_derecha():
	robot.set_rotate_right()
	robot.move(speed=Robot.SPEED_LOW)
	sleep(1)
	robot.stop()