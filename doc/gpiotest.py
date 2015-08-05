import RPi.GPIO as gpio
from time import sleep 
gpio.setmode(gpio.BOARD)
gpio.setup(11,gpio.OUT)
gpio.setup(13,gpio.OUT)

#for i in range(1000):
#    gpio.output(11,gpio.HIGH)


#for i in range(1000):
#    gpio.output(13,gpio.HIGH)

p = gpio.PWM(13, 100)
t = gpio.PWM(11, 100)

#p.start(100)
#input('Press return to stop:')   # use raw_input for Python 2
#p.stop()
#gpio.cleanup()

pause_time = 0.1
p.start(0)
try:  
    while True:  
        for i in range(0,101):      # 101 because it stops when it finishes 100  
            p.ChangeDutyCycle(i)  
            sleep(pause_time)  
        for i in range(100,-1,-1):      # from 100 to zero in steps of -1  
            p.ChangeDutyCycle(i)  
            sleep(pause_time)  
  
except KeyboardInterrupt:  
    p.stop()            # stop the white PWM output  

t.start(0)
try:  
    while True:  
        for i in range(0,101):      # 101 because it stops when it finishes 100  
            t.ChangeDutyCycle(i)  
            sleep(pause_time)  
        for i in range(100,-1,-1):      # from 100 to zero in steps of -1  
            t.ChangeDutyCycle(i)  
            sleep(pause_time)  
  
except KeyboardInterrupt:  
    t.stop()            # stop the white PWM output  

gpio.cleanup()          # clean up GPIO on CTRL+C exit  