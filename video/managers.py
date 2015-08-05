import cv2
import numpy
import time

class CaptureManager(object):

	def __init__(self, capture, previeWindowManager = None, size = None, shouldMirrorPreview = False):
		
		self.previeWindowManager = previeWindowManager
		self.shouldMirrorPreview = shouldMirrorPreview
		self._capture = capture
		self._channel = 0
		self._enteredFrame = False
		self._frame = None
		self._imageFileName = None
		self._videoFileName = None
		self._videoEncoding = None
		self._videoWriter = None
		self._startTime = None
		self._framesElapsed = long(0)
		self._fpsEstimate = None
		if size is None:
			self._size = (int(capture.get(3)), int(capture.get(4)))
		else :
			self._size = size 

		self._capture.set(3, size[0])
		self._capture.set(4, size[1])

	@property
	def channel(self):
		return self._channel

	@channel.setter
	def channel(self, value):
		if self._channel != value:
			self._channel = value
			self._frame = None

	@property 
	def frame(self):
		if self._enteredFrame and self._frame is None:
			_, self._frame = self._capture.retrieve(channel = self.channel)
		return self._frame

	@property
	def isWritingImage(self):
		return self._imageFileName is not None

	@property 
	def isWritingVideo(self):
		return self._videoFileName is not None


	def enterFrame(self):
		if self._capture is not None:
			self._enteredFrame = self._capture.grab()

	@property
	def size(self):
		return self._size


	def exitFrame(self):
		if self.frame is None:
			self._enteredFrame = False
			return 

		if self._framesElapsed == 0:
			self._startTime = time.time()
		else:
			timeElapsed = time.time() - self._startTime
			self._fpsEstimate = self._framesElapsed / timeElapsed
		self._framesElapsed += 1

		if self.previeWindowManager is not None:
			if self.shouldMirrorPreview:
				mirroredFrame = numpy.fliplr(self._frame).copy()
				self.previeWindowManager.show(mirroredFrame)
			else:
				self.previeWindowManager.show(self._frame)

		if self.isWritingImage:
			cv2.imwrite(self._imageFileName, self._frame)
			self._imageFileName = None

		self._writeVideoFrame()
		self._frame = None
		self._enteredFrame = False

	def writeImage(self,filename):
		self._imageFileName = filename

	def startWritingVideo(self, filename, encoding = cv2.cv.CV_FOURCC('H','2','6','4')):
		self._videoFileName = filename
		self._videoEncoding = encoding

	def stopWritingVideo(self):
		self._videoFileName = None
		self._videoEncoding = None
		self._videoWriter = None

	def _writeVideoFrame(self):
		if not self.isWritingVideo:
			return
		if self._videoWriter is None:
			fps = self._capture.get(cv2.cv.CV_CAP_PROP_FPS)
			if fps == 0.0:
				if self._framesElapsed < 20:
					return 
				else:
					fps = self._fpsEstimate
					size = (int(self._capture.get(3)),
						int(self._capture.get(4)))
					self._videoWriter = cv2.VideoWriter(self._videoFileName, self._videoEncoding, fps, size)
					self._videoWriter.write(self._frame)

class WindowManager(object):

	def __init__(self, windowName, keyPressCallback = None):
		self.keyPressCallback = keyPressCallback
		self._windowName = windowName
		self._isWindowCreated = False

	@property 
	def isWindowCreated(self):
		return self._isWindowCreated

	def createWindow(self):
		cv2.namedWindow(self._windowName)
		self._isWindowCreated = True

	def show(self, frame):
		cv2.imshow(self._windowName, frame)

	def destroyWindow(self):
		cv2.destroyWindow(self._windowName)
		self._isWindowCreated = False

	def processEvents(self):
		keycode = cv2.waitKey(1)
		if self.keyPressCallback is not None and keycode != -1:
			keycode &= 0xFF
			self.keyPressCallback(keycode)
