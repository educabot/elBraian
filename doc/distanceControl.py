from braianDriver.robot import Robot 
import RPIO as rpio 
import time 
steps = 0
start = 0
stop = 0
robot = Robot()
counting_right = 0
counting_left = 0

def gpio_callback(gpio_id, val):
	global steps, stop, robot, counting_right, counting_left
	steps += 1
	
	if gpio_id == 4:
		counting_left += 1
	elif gpio_id == 21:
		counting_right += 1

	if counting_right - counting_left > 2 :
		
	if(steps >= int(input)):
		robot.stop()
		rpio.stop_waiting_for_interrupts()
		stop = int(round(time.time) * 1000)
    print("gpio %s: %s, step counting: %s" % (gpio_id, val, steps) )

rpio.add_interrupt_callback(4, gpio_callback)
rpio.add_interrupt_callback(21, gpio_callback)

start = int(round(time.time) * 1000)

input = raw_input("ingrese numero de pasos")

robot.set_forward()
robot.move(speed = Robot.SPEED_HIGH)
robot.move(speed = Robot.SPEED_MEDIUM)
rpio.wait_for_interrupts(threaded = True)

velCms = (1.4 * steps) / (stop - start)

print("terminated.")
print("vel: %s steps/ms" % (velCms))
