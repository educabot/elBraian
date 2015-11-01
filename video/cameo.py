import cv2
from managers import WindowManager, CaptureManagerOpenCV, CaptureManagerPiCamera
import filters
from trackers import FaceTracker, ArrowTracker, BananaTracker, TurnTracker, CircleTracker
import utils, rects, sys, time, numpy as np, redis
from datetime import datetime
from picamera.array import PiRGBArray
from picamera import PiCamera
from time import sleep

class Cameo(object):

	def __init__(self, type):
		self._windowManager = None
		self._type = type
		if self._type == "pi":
			self._pi_camera = PiCamera()
			self._pi_camera.resolution = (640, 480)
			self._pi_camera.framerate = 32
			self._pi_camera.vflip = True
			self._pi_capture = PiRGBArray(self._pi_camera, size = (640, 480))
			#warming up camera
			time.sleep(0.1)
			self._captureManager = CaptureManagerPiCamera(self._pi_camera, self._pi_capture, None, (640, 480),False)
		else:
			self._captureManager = CaptureManagerOpenCV(cv2.VideoCapture(1), None, (640, 480),False)

		self._curveFilter = filters.BGRPortraCurveFilter()
		self._faceTracker = FaceTracker()
		self._arrowTracker = ArrowTracker()
		self._bananaTracker = BananaTracker()
		self._turnTracker = TurnTracker()
		self._circleTracker = CircleTracker()
		self._shouldDrawDebugRects = False
		self._redis_client = redis.StrictRedis(host="localhost", port=6379, db=0)

	def run(self):
		if self._type == "pi":
			for image in self._pi_camera.capture_continuous(self._pi_capture, format="bgr", use_video_port=True):
				frame = image.array
				#self._curveFilter.apply(frame, frame)
				#self._faceTracker.update(frame)
				#faces = self._faceTracker.faces

				#self._arrowTracker.update(frame)
				#arrows = self._arrowTracker.elements
				#self._circleTracker.update(frame)
				#circles = self._circleTracker.elements

				self._pi_capture.truncate(0)
				self._send_to_redis(frame)
				sleep(0.25)
				

		else:
			while self._windowManager.isWindowCreated:
				self._captureManager.enterFrame()
				frame = self._captureManager.frame

				#filters.strokeEdges(frame, frame)
				self._curveFilter.apply(frame, frame)

				self._faceTracker.update(frame)
				faces = self._faceTracker.faces

				self._arrowTracker.update(frame)
				arrows = self._arrowTracker.elements

				#self._turnTracker.update(frame)
				turns = self._turnTracker.elements

				#self._bananaTracker.update(frame)
				bananas = self._bananaTracker.elements

				#circles

				self._circleTracker.update(frame)
				circles = self._circleTracker.elements

				self._draw_on_image(frame, faces, arrows, circles)
				self._captureManager.exitFrame()
				'''
				Also, we need to send this frame to a new specific directory to be delivered
				'''
				#self._captureManager.writeImage("imgstream/screenshot.jpg")
				self._send_to_redis(frame)

				self._windowManager.processEvents()

	def _send_to_redis(self,frame):
		_, img = cv2.imencode(".jpg", frame)
		self._redis_client.set("vigilante_screenshot", img.tostring())

	def _draw_on_image(self,frame, faces, arrows, circles, size=None):
		utils.draw_str(frame, (25,40), datetime.now().isoformat())
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
			#self._bananaTracker.drawDebugRects(frame)
			#self._turnTracker.drawDebugRects(frame)

		if size is None or self._type != "pi":
			utils.drawCameraFrame(frame, self._captureManager.size)
		else:
			utils.drawCameraFrame(frame, (640, 480))

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
				print "video start"
				self._captureManager.startWritingVideo("screencast.avi")

			else:
				print "video stop"
				self._captureManager.stopWritingVideo()
		elif keycode == 120: # x
			self._shouldDrawDebugRects = not self._shouldDrawDebugRects
		elif keycode == 27: # escape
			self._windowManager.destroyWindow()



if __name__ == "__main__":
	Cameo(sys.argv[1]).run()
