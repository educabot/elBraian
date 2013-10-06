#imports
import os.path
import tornado.httpserver
import tornado.ioloop
import tornado.options
import tornado.websocket
from tornado.options import define,options
from tornado import template, websocket
from pyjade.ext.tornado import patch_tornado
from braianDriver.robot import Robot
import logging

patch_tornado()
define("port", default=8090, help="run on the given port",type=int)
log = logging.getLogger("webserver")
log.setLevel(logging.DEBUG)

class IndexHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('index.jade')
		
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

if __name__ == '__main__':
	tornado.options.parse_command_line()
	app = tornado.web.Application(
		handlers=[(r"/",IndexHandler),(r"/favicon.ico", tornado.web.StaticFileHandler,{'path':'static'}),
		(r"/robot",RobotHandler)],
		template_path=os.path.join(os.path.dirname(__file__),"templates"),
		static_path=os.path.join(os.path.dirname(__file__),"static"),
		debug=True	
	)
	http_server = tornado.httpserver.HTTPServer(app)
	http_server.listen(options.port)
	tornado.ioloop.IOLoop.instance().start()