Supervisor Configuration
========================

To adding this simple configuration entry

	[program:braianserver]
	command=/home/pi/virtualenvs/bin/python /home/pi/elBraian/app-braianbot.py
	directory=/home/pi/elBraian
	user=root
	autostart=true
	autorestart=true
	

This approach is quite easy because we can use the "python" command shell defined inside the pre set virtual environment

