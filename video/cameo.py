import cv2
from managers import WindowManager, CaptureManager
import filters
from trackers import FaceTracker
import utils
import rects
from datetime import datetime

class Cameo(object):

	def __init__(self):
		self._windowManager = WindowManager('Braian', self.onKeyPress)
		self._captureManager = CaptureManager(cv2.VideoCapture(1), self._windowManager, False)
		self._curveFilter = filters.BGRPortraCurveFilter()
		self._faceTracker = FaceTracker()
		self._shouldDrawDebugRects = False

	def run(self):
		self._windowManager.createWindow()
		while self._windowManager.isWindowCreated:
			self._captureManager.enterFrame()
			frame = self._captureManager.frame

			#filters.strokeEdges(frame, frame)
			self._curveFilter.apply(frame, frame)

			self._faceTracker.update(frame)
			faces = self._faceTracker.faces
			
			utils.draw_str(frame, (25,40), datetime.now().isoformat())
			if len(faces) > 0 :
				utils.draw_str(frame, (25,60), "Human Face")


			rects.swapRects(frame, frame, [face.faceRect for face in faces])
			
			if self._shouldDrawDebugRects:
				self._faceTracker.drawDebugRects(frame)

			utils.drawCameraFrame(frame, self._captureManager.size)
			self._captureManager.exitFrame()
			self._windowManager.processEvents()

	def onKeyPress(self, keycode):
		"""
		space -> take a shoot
		tab   -> start recording
		scape -> quit
		x	  -> start/stop drawing debug rectangles
		"""
		if keycode == 32: # space
			self._captureManager.writeImage("screenshot.png")
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
	Cameo().run()
