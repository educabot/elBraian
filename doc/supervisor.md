Supervisor Configuration
========================

To adding this simple configuration entry

[program:braianserver]
command=/home/pi/virtualenvs/elBraian/bin/python /home/pi/elBraian/app-braianbot.py
directory=/home/pi/elBraian
user=root
autostart=true


[program:raspistream]
command=raspistill -w 320 -h 240 -q 25 -br 50 -n -o /home/pi/stream/pic.jpg -tl 500 -t 9999999 -th 0:0:0
autostart=true

[program:mjpg-streamer]
command=/home/pi/mjpg-streamer/mjpg-streamer/mjpg_streamer -i "/home/pi/mjpg-streamer/mjpg-streamer/plugins/input_file/input_file.so -r -n pic.jpg -f /home/pi/tmp/stream" -o "/home/pi/mjpg-streamer/mjpg-streamer/plugins/output_http/output_http.so -p 8095 -w ./www"
autostart=true
directory=/home/pi/mjpg-streamer/mjpg-streamer
environment=LD_LIBRARY_PATH="/home/pi/mjpg-streamer/mjpg-streamer/plugins"	


This approach is quite easy because we can use the "python" command shell defined inside the pre set virtual environment for the web and socket server.

Finally, i decided to use the "still" video approach regarding get the app upp and running. To address that, i used raspistill and mpjpg-streamer, but i've been watchong another projects like [Raspberry Tank](http://raspberrytank.ianrenton.com/) which achieve great performance though. I think i should try to improve this one. But will give a chance to use real live stream



11/12/2013

Al last i figured out that supervisor process decrease the mjpeg-streamer speed and dont know why, so i removed it from there and add a nre service

/etc/init.d/mjpg-streamer

#!/bin/bash
LD_LIBRARY_PATH="/home/pi/mjpg-streamer/mjpg-streamer" /home/pi/mjpg-streamer/mjpg-streamer/mjpg_streamer -i "input_file.so -r -n pic.jpg -f /var/stream" -o "output_http.so -p 8095 -w ./www"

and make

update.rc-d mjpg-streamer defaults

11/12/2013

It was the same for the braianserver. The symtom was that during a large script execution from console mode, tha application hangs and responde code error happens. 
So, i did the same workaround:

#!/bin/bash
cd /home/pi/elBraian
/home/pi/virtualenvs/elBraian/bin/python /home/pi/elBraian/app-braianbot.py

on 

/etc/init.d/braianserver

and make

update-rc.d braianserver defaults


Note: Strongly need to check the Supervisor documentation properly


