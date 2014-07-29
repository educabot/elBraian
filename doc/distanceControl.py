import RPIO as rpio 
import time 
steps = 0
start = 0
stop = 0

def gpio_callback(gpio_id, val):
	global steps, stop
	steps += 1
	if(steps >= int(input)):
		rpio.stop_waiting_for_interrupts()
		stop = int(round(time.time) * 1000)
    print("gpio %s: %s, step counting: %s" % (gpio_id, val, steps) )

rpio.add_interrupt_callback(4, gpio_callback)
rpio.add_interrupt_callback(27, gpio_callback)

start = int(round(time.time) * 1000)

input = raw_input("ingrese numero de pasos")

rpio.wait_for_interrupts()

velCms = (1.4 * steps) / (stop - start)

print("terminated.")
print("vel: %s steps/ms" % (velCms))
