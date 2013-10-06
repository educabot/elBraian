Supervisor Configuration
========================

To adding this simple configuration entry

[program:braianserver]
command=/home/pi/virtualenvs/elBraian/bin/python /home/pi/elBraian/app-braianbot.py
directory=/home/pi/elBraian
user=root
autostart=true
autorestart=true
stopsignal=KILL
priority=991


[program:raspistream]
command=raspistill -w 640 -h 480 -q 5 -br 50 -vf -o /var/stream/pic.jpg -tl 500 -t 9999999 -th 0:0:0
autostart=true
autorestart=true

[program:mjpg-streamer]
command=/home/pi/mjpg-streamer/mjpg-streamer/mjpg_streamer -i "input_file.so -r -n pic.jpg -f /var/stream" -o "output_http.so -p 8095 -w ./www"
autostart=true
autorestart=true
directory=/home/pi/mjpg-streamer/mjpg-streamer
environment=LD_LIBRARY_PATH="/home/pi/mjpg-streamer/mjpg-streamer"	


This approach is quite easy because we can use the "python" command shell defined inside the pre set virtual environment for the web and socket server.

Finally, i decided to use the "still" video approach regarding get the app upp and running. To address that, i used raspistill and mpjpg-streamer, but i've been watchong another projects like [Raspberry Tank](http://raspberrytank.ianrenton.com/) which achieve great performance though. I think i should try to improve this one. But will give a chance to use real live stream

