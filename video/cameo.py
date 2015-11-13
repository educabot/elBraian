import cv2
from managers import WindowManager, CaptureManagerOpenCV, CaptureManagerPiCamera
import filters
from trackers import FaceTracker, ArrowTracker, TurnLeftTracker, CircleTracker, TurnRightTracker, BallTracker
import utils, rects, sys, time, numpy as np, redis
from datetime import datetime
import logging, math
import ConfigParser
#from picamera.array import PiRGBArray
#from picamera import PiCamera
from time import sleep
from braianDriver.robot import Robot

config = ConfigParser.ConfigParser()
config.read('config/application.cfg')
env = config.get("system","env")

log = logging.getLogger("cameo")
log.setLevel(logging.DEBUG)
formatter = logging.Formatter("%(asctime)s - %(name)s - %(levelname)s - %(message)s")
file_handler=logging.FileHandler('/var/tmp/cameo.log')
file_handler.setFormatter(formatter)
console_handler = logging.StreamHandler()
console_handler.setFormatter(formatter)
log.addHandler(file_handler)
log.addHandler(console_handler)


class Cameo(object):

	def __init__(self, type):
		self._windowManager = WindowManager('Braian', self.onKeyPress)
		self._type = type
		if self._type == "pi":
			self._pi_camera = PiCamera()
			self._pi_camera.resolution = (320, 240)
			self._pi_camera.framerate = 5
			self._pi_camera.vflip = True
			self._pi_camera.hflip = True
			self._pi_camera.drc_strength = "high"
			self._pi_camera.brightness = 50
			self._pi_capture = PiRGBArray(self._pi_camera, size = (320, 240))
			#warming up camera
			time.sleep(0.1)
			self._captureManager = CaptureManagerPiCamera(self._pi_camera, self._pi_capture, None, (320, 240),False)
		else:
			self._captureManager = CaptureManagerOpenCV(cv2.VideoCapture(0), self._windowManager, (640, 480),False)

		self._curveFilter = filters.BGRPortraCurveFilter()
		self._faceTracker = FaceTracker()
		self._arrowTracker = ArrowTracker()
		self._turnLeftTracker = TurnLeftTracker()
		self._circleTracker = CircleTracker()
		self._turnRightTracker = TurnRightTracker()
		self._ballTracker = BallTracker()
		self._shouldDrawDebugRects = True
		self._redis_client = redis.StrictRedis(host="localhost", port=6379, db=0)
		self._vertical_position = 0
		self._horizontal_position = 0
		self._robot = Robot()
		self._forward_counter = 0
		self._turn_right_counter = 0
		self._turn_left_counter = 0

	def run(self):
		if self._type == "pi":
			self._proccess_on_pi()
		else:
			if self._windowManager is not None:
				self._windowManager.createWindow()
			self._proccess_on_dev()

	def _track(self, frame):
		self._faceTracker.update(frame)
		faces = self._faceTracker.faces
		if len(faces) > 0:
			log.debug("Faces tracked: " + str(len(faces)))
			for face in faces:
				print face.faceRect

		self._arrowTracker.update(frame)
		arrows = self._arrowTracker.elements
		if len(arrows) > 0 :
			self._forward_counter = self._forward_counter + 1
			log.debug("Arrows tracked: " + str(len(arrows)))
			for arrow in arrows:
				print arrow.rect
		else:
			self._forward_counter = 0


		#turn left
		self._turnLeftTracker.update(frame)
		turns_left = self._turnLeftTracker.elements
		if len(turns_left) > 0:
			self._turn_left_counter = self._turn_left_counter + 1
			log.debug("Turn Left detected " + str(len(turns_left)))
			for turn in turns_left:
				print turn.rect
		else:
			self._turn_left_counter = 0

		#turn Right
		self._turnRightTracker.update(frame)
		turns_right = self._turnRightTracker.elements
		if len(turns_right) > 0:
			self._turn_right_counter = self._turn_right_counter + 1
			log.debug("Turn Right detected " + str(len(turns_right)))
			for turn in turns_right:
				print turn.rect
		else:
			self._turn_right_counter = 0

		#perform the proper action
		if self._forward_counter >=3:
			self._take_action("forward")
		elif self._turn_right_counter >=3:
			self._take_action("turn_right")

		#Ball
		#self._ballTracker.update(frame)
		balls = self._ballTracker.elements
		if len(balls) > 0:
			log.debug("Turn Right detected " + str(len(balls)))
			for ball in balls:
				print ball.rect

		#circles

		#self._circleTracker.update(frame)
		circles = self._circleTracker.elements
		if len(circles) > 0 :
			log.debug("Balls tracked: " + str(len(circles)))
			for circle in circles:
				print circle.rect
		self._draw_on_image(frame, faces, arrows, circles)


	def _proccess_on_dev(self):
		while self._windowManager is not None and self._windowManager.isWindowCreated:
			self._captureManager.enterFrame()
			frame = self._captureManager.frame
			self._track(frame)
			self._captureManager.exitFrame()
			self._send_to_redis(frame)
			#if len(faces) > 0:
				#self.__head_adjustement(faces[0].faceRect)

			self._windowManager.processEvents()
			time.sleep(0.2)

	def _proccess_on_pi(self):
		for image in self._pi_camera.capture_continuous(self._pi_capture, format="bgr", use_video_port=True):
			frame = image.array
			self._track(frame)
			self._send_to_redis(frame)
			#if len(faces) > 0:
				#self.__head_adjustement(faces[0].faceRect)
				#just to make sure
			#	time.sleep(0.5)

			self._pi_capture.truncate(0)

	def __head_adjustement(self, rect):
		threashold = 10

		x = rect[0] - (rect[2]/2)
		y = rect[1] + (rect[3]/2)

		new_vertical_value = self._vertical_position
		new_horizontal_value = self._horizontal_position

		if x < 160:
			new_horizontal_value = self._horizontal_position - ((x-160)/4.8)
		elif(x > 160):
			new_horizontal_value = ((160-x)/4.8) + self._horizontal_position

		if y > 120:
			new_vertical_value = ((y - 120)/4.8) + self._vertical_position
		elif(y < 120):
			new_vertical_value = self._vertical_position - ((120 - y)/4.8)

		if math.fabs(new_vertical_value - self._vertical_position) > threashold or math.fabs(new_horizontal_value - self._horizontal_position) > threashold:
			self._horizontal_position = new_horizontal_value
			self._vertical_position = new_vertical_value
			self._robot.move_head_horizontal(self._horizontal_position)
			self._robot.move_head_vertical(self._vertical_position)

	def _send_to_redis(self,frame):
		#_, img = cv2.imencode(".jpg", frame, [int(cv2.IMWRITE_JPEG_QUALITY), 10])
		_, img = cv2.imencode(".jpg", frame)
		self._redis_client.set("vigilante_screenshot", img.data)

	def _draw_on_image(self,frame, faces, arrows, circles, size=None):
		#utils.draw_str(frame, (25,40), datetime.now().isoformat())
		if len(faces) > 0 :
			utils.draw_str(frame, (25,60), "Human [" + str(len(faces)) + "]")

		if len(arrows) > 0 :
			utils.draw_str(frame, (25,80), "Directive [" + str(len(arrows)) + "]")

		#rects.swapRects(frame, frame, [face.faceRect for face in faces])

		if len(circles) > 0 :
			utils.draw_str(frame, (25, 100), "I saw balls!: " + str(len(circles)))

		if self._shouldDrawDebugRects:
			self._faceTracker.drawDebugRects(frame)
			self._arrowTracker.drawDebugRects(frame)
			self._circleTracker.drawDebug(frame)
			self._turnLeftTracker.drawDebugRects(frame)
			self._turnRightTracker.drawDebugRects(frame)
			self._ballTracker.drawDebugRects(frame)

		if size is None or self._type != "pi":
			utils.drawCameraFrame(frame, self._captureManager.size)
		else:
			utils.drawCameraFrame(frame, (640, 480))

	def _take_action(self, action):
		if action == "forward":
			self._robot.set_forward()
			self._robot.move(speed=Robot.SPEED_MEDIUM)
			sleep(1)
			self._robot.stop()
		elif action == "turn_right":
			self._robot.set_rotate_right()
			self._robot.move(speed=Robot.SPEED_MEDIUM)
			sleep(1)
			self._robot.stop()
		elif action == "turn_left":
			self._robot.set_rotate_right()
			self._robot.move(speed=Robot.SPEED_MEDIUM)
			sleep(1)
			self._robot.stop()


	def onKeyPress(self, keycode):
		"""
		space -> take a shoot
		tab   -> start recording
		scape -> quit
		x	  -> start/stop drawing debug rectangles
		"""
		if keycode == 32: # space
			self._captureManager.writeImage("imgstream/screenshot.jpg")
		elif keycode == 9: # tab
			if not self._captureManager.isWritingVideo:
				self._captureManager.startWritingVideo("screencast.avi")

			else:
				self._captureManager.stopWritingVideo()
		elif keycode == 120: # x
			self._shouldDrawDebugRects = not self._shouldDrawDebugRects
		elif keycode == 27: # escape
			self._windowManager.destroyWindow()


if __name__ == "__main__":
	Cameo(sys.argv[1]).run()
