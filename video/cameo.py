import cv2
from managers import WindowManager, CaptureManager

class Cameo(object):

	def __init__(self):
		self._windowManager = WindowManager('Braian', self.onKeyPress)
		self._captureManager = CaptureManager(cv2.VideoCapture(1), self._windowManager, True)

	def run(self):
		self._windowManager.createWindow()
		while self._windowManager.isWindowCreated:
			self._captureManager.enterFrame()
			frame = self._captureManager.frame
			self._captureManager.exitFrame()
			self._windowManager.processEvents()

	def onKeyPress(self, keycode):
		"""
		space -> take a shoot
		tab -> start recording
		scape -> quit
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
		elif keycode == 27: # escape
			self._windowManager.destroyWindow()

if __name__ == "__main__":
	Cameo().run()
