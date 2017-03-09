elBraian
======
# Run
python app-braianbot.py --port=9000

======
This is my awesome proyect about robotics and programming applied to education matters.

Basically is a RasbberryPi robot based which acts as its own Access Point providing connectivity for every known wifi device.

Although it was my hobby for last past year, I’ve been learning a lot, even I improved my professionals skills and I think nowadays it’s my most valuable asset.

Despite the fact that the MotoDriver I built is a part of another open source project (by my own as well, [Educabot Repo](https://github.com/educabot/piMotoDriver) ) , here you can find the entire application to get your own Braian up&&running in a few minutes.

## Installation

I used  the NOOBS Linux Distribution from [Official RaspberryPi Site](http://www.raspberrypi.org/downloads/).

### Access Point
The entire process was documented in [Hotspot.md](https://github.com/DiegoRam/elBraian/blob/master/doc/hotspot.md)

### Video streaming
Please take a look at this documentation [videoResearch.md](https://github.com/DiegoRam/elBraian/blob/master/doc/videoResearch.md). The important thing did occur at June 2014, after many shots :D.

### Keep Alive your application

To put al the things together and keep them alive I used [Supervisor](http://supervisord.org/) you might use anything you like. At [supervisor.md](https://github.com/DiegoRam/elBraian/blob/master/doc/supervisor.md) you will find how to configure Supervisor.

### BraianServer

This is a web container which uses [Tornado](http://www.tornadoweb.org/en/latest/) as container and it provides us with a pretty neat and well documented interface.

The only you need is to clone this repository and start the whole thing with 

		$sudo python app-braianbot.py 

or leave it to Supervisor handling.

