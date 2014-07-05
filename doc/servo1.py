from RPIO import PWM



def servo_angle(angle):
	return 1520 + (int(angle)*400) / 45

servo = PWM.Servo(pulse_incr_us=1)

value = raw_input("ingrese angulo: ")
while value!= "q":
	print("angle: " + value + " ms: " + str(servo_angle(value)))
	servo.set_servo(1, servo_angle(value))
	value = raw_input("ingrese angulo: ")
servo.stop_servo(1)
