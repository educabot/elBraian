from time import sleep
from braianDriver.robot import Robot

robot = Robot()

def adelante(cuanto):
	robot.set_forward()
	robot.move(speed=Robot.SPEED_MEDIUM)
	sleep(cuanto)
	robot.stop()

def atras(cuanto):
	robot.set_backward()
	robot.move(speed=Robot.SPEED_MEDIUM)
	sleep(cuanto)
	robot.stop()

def girar_izquierda(cuanto):
	robot.set_rotate_left()
	robot.move(speed=Robot.SPEED_LOW)
	sleep(cuanto)
	robot.stop()

def girar_derecha(cuanto):
	robot.set_rotate_right()
	robot.move(speed=Robot.SPEED_LOW)
	sleep(cuanto)
	robot.stop()