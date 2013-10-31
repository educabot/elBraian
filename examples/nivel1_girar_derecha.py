from time import sleep
from braianDriver.robot import Robot

robot = Robot()

robot.set_rotate_right()
robot.move(speed=Robot.SPEED_MEDIUM)
sleep(1)
robot.stop()