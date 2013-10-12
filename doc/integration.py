from braianDriver.robot import Robot
from time import sleep

robot_instance = Robot()

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(speed=Robot.SPEED_MEDIUM)

robot_instance.set_backward()
print "...."
sleep(1)
robot_instance.move(speed=Robot.SPEED_LOW)

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(arc=Robot.LEFT_ARC_CLOSE)

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(arc=Robot.RIGHT_ARC_OPEN)

