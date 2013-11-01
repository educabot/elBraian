from time import sleep
from braianDriver.robot import Robot

robot = Robot()

robot.set_rotate_left()
robot.move(speed=Robot.SPEED_LOW)
sleep(1)
robot.stop()