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


patch_tornado()
define("port", default=8000, help="run on the given port",type=int)

class IndexHandler(tornado.web.RequestHandler):
	def get(self):
		self.render('index.jade')
		
class RobotHandler(tornado.websocket.WebSocketHandler):

	ROBOT = Robot()
	"""
	this class represent the basic socket operation to move the wheels
	"""
	def on_open(self):
		self.write_message("connected!!")
		
	def on_close(self):
		pass

	def on_message(self,message):
		self.ROBOT.set_forward()
		self.ROBOT.move(speed=Robot.SPEED_LOW)

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