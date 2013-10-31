from time import sleep
from braianDriver.robot import Robot

robot = Robot()

robot.set_forward()
robot.move(speed=Robot.SPEED_MEDIUM)
sleep(1)
robot.stop()