from RPIO import PWM
from time import sleep



def servo_angle(angle):
	return 1520 + (int(angle)*400) / 45

servo = PWM.Servo(pulse_incr_us=1)

value = raw_input("ingrese angulo: ")
while value!= "q":
	print("angle: " + value + " ms: " + str(servo_angle(value)))
	servo.set_servo(1, servo_angle(value))
	value = raw_input("ingrese angulo: ")


limit = (-100,100)
current = 0
while True:
	for x in xrange(1,100):
		servo.set_servo(1, servo_angle(x))
		sleep(0.2)		
	for x in xrange(100,0,-1):
		servo.set_servo(1, servo_angle(x))
		sleep(0.2)		
servo.stop_servo(1)
