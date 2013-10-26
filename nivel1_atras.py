from time import sleep
from braianDriver.robot import Robot

robot = Robot()

robot.set_backward()
robot.move(speed=Robot.SPEED_HIGH)
sleep(3)
robot.stop()