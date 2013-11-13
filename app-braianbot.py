#imports
import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.websocket
import ConfigParser, os
from tornado.options import define,options
from tornado import template, websocket
from pyjade.ext.tornado import patch_tornado
from braianDriver.robot import Robot
import logging
import json

config = ConfigParser.ConfigParser()
config.read('config/application.cfg')
env = config.get("system","env")

patch_tornado()
define("port", default=80, help="run on the given port",type=int)
log = logging.getLogger("webserver")
log.setLevel(logging.DEBUG)

class IndexHandler(tornado.web.RequestHandler):
	def get(self):
		pic_url = "http://educabot.org:8095/?action=stream" if (env=="prod") else "/static/img/bg-video.png"
		self.render('index.jade', pic_url=pic_url)
		
class RobotHandler(tornado.websocket.WebSocketHandler):

	ROBOT = Robot()
	"""
	this class represent the basic socket operation to move the wheels
	"""
	def on_open(self):
		log.debug("client connected..")
		
	def on_close(self):
		log.debug("get the hell out of here!")

	def on_message(self,message):
		log.debug(message)
		if (message == "FORWARD"):
			self.ROBOT.set_forward()
			self.ROBOT.move(speed=Robot.SPEED_MEDIUM)
		elif (message == "BACKWARD"):
			self.ROBOT.set_backward()
			self.ROBOT.move(speed=Robot.SPEED_HIGH)
		elif (message == "ROTATE-LEFT"):
			self.ROBOT.set_rotate_left()
			self.ROBOT.move(speed=Robot.SPEED_LOW)
		elif (message == "ROTATE-RIGHT"):
			self.ROBOT.set_rotate_right()
			self.ROBOT.move(speed=Robot.SPEED_LOW)
		elif (message == "FORWARD-TURNING-LEFT"):
			self.ROBOT.set_forward()
			self.ROBOT.move(arc=Robot.LEFT_ARC_CLOSE)
		elif (message == "FORWARD-TURNING-RIGHT"):
			self.ROBOT.set_forward()
			self.ROBOT.move(arc=Robot.RIGHT_ARC_CLOSE)
		elif (message == "BACKWARD-TURNING-LEFT"):
			self.ROBOT.set_backward()
			self.ROBOT.move(arc=Robot.LEFT_ARC_CLOSE)
		elif (message == "BACKWARD-TURNING-RIGHT"):
			self.ROBOT.set_backward()
			self.ROBOT.move(arc=Robot.RIGHT_ARC_CLOSE)
		elif (message == "STOP"):
			self.ROBOT.stop()

class CameraHandler(tornado.websocket.WebSocketHandler):
	def on_open(self):
		self.write_message("connected!!")

	def start_transmitVideo(self):
		pass

class ConsoleHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('consola.jade', code='')
	def post(self):
		code = json.loads(self.request.body)
		exec(code["code"])
		self.set_status(200)
		self.finish()

if __name__ == '__main__':
	tornado.options.parse_command_line()
	app = tornado.web.Application(
		handlers=[
			(r"/",IndexHandler),
			(r"/favicon.ico", tornado.web.StaticFileHandler,{'path':'static'}),
			(r"/robot",RobotHandler),
			(r"/console",ConsoleHandler),
		],
		template_path=os.path.join(os.path.dirname(__file__),"templates"),
		static_path=os.path.join(os.path.dirname(__file__),"static"),
		debug=True	
	)
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()