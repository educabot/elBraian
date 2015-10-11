import cv2
from managers import WindowManager, CaptureManagerOpenCV, CaptureManagerPiCamera
import filters
from trackers import FaceTracker, ArrowTracker, BananaTracker, TurnTracker
import utils
import rects
from datetime import datetime
import sys
import time
from picamera.array import PiRGBArray
from picamera import PiCamera

class Cameo(object):

	def __init__(self, type):
		self._windowManager = WindowManager('Braian', self.onKeyPress)
		self._type = type
		if self._type == "pi":
			self._pi_camera = PiCamera()
			self._pi_camera.resolution(640, 480)
			self._pi_camera.framerate = 32
			self._pi_capture = PiRGBArray(camera, size = (640, 480))
			#warming up camera
			time.sleep(0.1)
			#self._captureManager = CaptureManagerPiCamera(camera, capture, self._windowManager, (640, 480),False)
		else:
			self._captureManager = CaptureManagerOpenCV(cv2.VideoCapture(1), self._windowManager, (1280, 760),False)

		self._curveFilter = filters.BGRPortraCurveFilter()
		self._faceTracker = FaceTracker()
		self._arrowTracker = ArrowTracker()
		self._bananaTracker = BananaTracker()
		self._turnTracker = TurnTracker()
		self._shouldDrawDebugRects = False

	def run(self):
		self._windowManager.createWindow()
		if self._type == "pi":
			for image in self._pi_camera.capture_continuous(self._pi_capture, format="bgr", use_video_post=True):
				if self._windowManager.isWindowCreated:
					frame = image.array
					self._curveFilter.apply(frame, frame)
					self._faceTracker.update(frame)
					faces = self._faceTracker.faces

					self._arrowTracker.update(frame)
					arrows = self._arrowTracker.elements
					self._draw_on_image(frame, faces, arrows)
					self._windowManager.show(frame)
					self._pi_capture.truncate(0)
					self._windowManager.processEvents()
				else:
					break


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
				self._draw_on_image(frame, faces, arrows)
				self._captureManager.exitFrame()
				self._windowManager.processEvents()

	def _draw_on_image(self,frame, faces, arrows):
		utils.draw_str(frame, (25,40), datetime.now().isoformat())
		if len(faces) > 0 :
			utils.draw_str(frame, (25,60), "Human [" + str(len(faces)) + "]")

		if len(arrows) > 0 :
			utils.draw_str(frame, (25,80), "Directive [" + str(len(arrows)) + "]")

		#rects.swapRects(frame, frame, [face.faceRect for face in faces])

		if self._shouldDrawDebugRects:
			self._faceTracker.drawDebugRects(frame)
			self._arrowTracker.drawDebugRects(frame)
			#self._bananaTracker.drawDebugRects(frame)
			#self._turnTracker.drawDebugRects(frame)

		utils.drawCameraFrame(frame, self._captureManager.size)


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
