from braianDriver.robot import Robot
from time import sleep

myRobot = Robot()

myRobot.center_head()
myRobot.move_head_horizontal(60)
myRobot.move_head_vertical(70)


myRobot.set_forward()
myRobot.move(speed=Robot.SPEED_MEDIUM)
sleep(1)
myRobot.stop()

myRobot.set_backward()
myRobot.move(speed=Robot.SPEED_HIGH)
sleep(1)
myRobot.stop()


myRobot.set_rotate_left()
myRobot.move(speed=Robot.SPEED_LOW)
sleep(1)
myRobot.stop()

myRobot.set_forward()
myRobot.move(arc=Robot.LEFT_ARC_CLOSE)
sleep(1)
myRobot.stop()
