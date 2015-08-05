from braianDriver.robot import robot
my_robot = Robot()

my_robot.set_forward()
my_robot.move(speed=SPEED.MEDIUM)
my_robot.move_head_horizontal(30)