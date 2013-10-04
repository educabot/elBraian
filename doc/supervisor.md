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

This approach is quite easy because we can use the "python" command shell defined inside the pre set virtual environment

