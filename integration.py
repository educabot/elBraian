from braianDriver.robot import Robot
from time import sleep

robot_instance = Robot()

robot_instance.set_forward()
robot_instance.move(Robot.SPEED_MEDIUM)

