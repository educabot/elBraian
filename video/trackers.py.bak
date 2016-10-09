import cv2
import rects
import utils
import numpy as np


class Traceable(object):
	def __init__(self):
		self._rect = None

	@property
	def rect(self):
		return self._rect

	@rect.setter
	def rect(self, value):
		self._rect = value



class Face(object):
	"""Data on facial features"""

	def __init__(self):
		self.faceRect = None
		self.leftEyeRect = None
		self.rightEyeRect = None
		self.noseRect = None
		self.mouthRect = None
		self.center = None

class Arrow(Traceable):
	def __init__(self):
		Traceable.__init__(self)


class TurnLeft(Traceable):
	def __init__(self):
		Traceable.__init__(self)


class Circle(Traceable):
	def __init__(self):
		Traceable.__init__(self)

class TurnRight(Traceable):
	def __init__(self):
		Traceable.__init__(self)

class Ball(Traceable):
	def __init__(self):
		Traceable.__init__(self)

class Tracker(object):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_SCALE_IMAGE):
		self.scaleFactor = scaleFactor
		self.minNeighbors = minNeighbors
		self.flags = flags
		self._elements = []
		self._classifier = None
		self._elementRectColor = None


	@property
	def elements(self):
		return self._elements


	def update(self, image):
		self._elements = []
		if self._classifier is None:
			raise Exception("classifier must be set before use it.")

		minSize = utils.widthHeightDivideBy(image, 8)

		elementsRects = self._classifier.detectMultiScale(image, self.scaleFactor,
			self.minNeighbors, self.flags, minSize)

		if elementsRects is not None:
			for elementRect in elementsRects:
				element = self._createElement()

				element.rect = elementRect

				self._elements.append(element)


	def _detectOneObject(self, classifier, image, rect, imageSizeToMinSizeRatio):

		x, y, w, h = rect

		minSize = utils.widthHeightDivideBy(image, imageSizeToMinSizeRatio)

		subImage = image[y: y+h, x: x+w]

		subRects = classifier.detectMultiScale(subImage, self.scaleFactor,
			self.minNeighbors, self.flags, minSize)

		if len(subRects) == 0 :
			return None

		subx, suby, subw, subh = subRects[0]
		return (x+subx, y+suby, w+subw, h+subh)


	def drawDebugRects(self, image):

		if self._elementRectColor is None:
			raise Exception("Element color for this tracker need to be set.")

		if utils.isGray(image):
			elementColor = 255

		else:
			elementColor = self._elementRectColor


		for element in self._elements:
			rects.outlineRect(image, element.rect, elementColor)




class FaceTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT)

		self._faces = []

		self._faceClassifier = cv2.CascadeClassifier("video/cascades/haarcascade_frontalface_alt.xml")
		#self._eyeClassifier = cv2.CascadeClassifier("cascades/haarcascade_eye.xml")

	@property
	def faces(self):
		return self._faces


	def update(self, image):
		self._faces = []
		if utils.isGray(image):
			image = cv2.equalizeHist(image)
		else:
			image = cv2.cvtColor(image, cv2.cv.CV_BGR2GRAY)
			cv2.equalizeHist(image, image)

		minSize = utils.widthHeightDivideBy(image, 6)
		faceRects = self._faceClassifier.detectMultiScale(image, self.scaleFactor,
			self.minNeighbors, self.flags, minSize)

		if faceRects is not None:
			for faceRect in faceRects:
				face = Face()
				face.faceRect = faceRect

				x, y, w, h = faceRect

				face.center = ( x + w/2 , y + h/2)

				#search an eye at the upper-left sector
				#searchRect = (x+w/7, y, w*2/7, h/2)
				#face.leftEyeRect = self._detectOneObject(self._eyeClassifier, image,
				#	searchRect, 64)

				#searchRect = (x+w/4, y, w*2/7, h/2)
				#face.rightEyeRect = self._detectOneObject(self._eyeClassifier, image,
				#	searchRect, 64)

				#TODO: implement nose detection

				#TODO: implement mouth detection

				self._faces.append(face)

	def drawDebugRects(self, image):
		if utils.isGray(image):
			faceColor = 255
			leftEyeColor = 255
			rightEyeColor = 255
		else:
			faceColor = (255,255,255)
			leftEyeColor = (0,0,255)
			rightEyeColor = (0,255,255)

		for face in self.faces:
			rects.outlineRect(image, face.faceRect, faceColor)
			#rects.outlineRect(image, face.leftEyeRect, leftEyeColor)
			#rects.outlineRect(image, face.rightEyeRect, rightEyeColor)


class ArrowTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
			flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT)
		self._classifier = cv2.CascadeClassifier("video/cascades/forward_cascade.xml")
		self._elementRectColor= (0,0,255)

	def _createElement(self):
		return Arrow()


class TurnLeftTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
			flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT)
		self._classifier = cv2.CascadeClassifier("video/cascades/turn_left_cascade.xml")
		self._elementRectColor= (0,255,0)

	def _createElement(self):
		return TurnLeft()


class CircleTracker(Tracker):
	def __init__(self):
		self._elementRectColor= (0,0,255)
		self._elements = []

	def _createElement(self):
		return Circle()


	def update(self, image):
		self._elements = []
		greenLower = np.array([29, 86, 6])
		greenUpper = np.array([64, 255, 255])
		blurred = cv2.GaussianBlur(image, (11, 11), 0)
		hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)

		mask = cv2.inRange(hsv, greenLower, greenUpper)
		mask = cv2.erode(mask, None, iterations=2)
		mask = cv2.dilate(mask, None, iterations=2)

		cnts = cv2.findContours(mask.copy(), cv2.RETR_EXTERNAL,
			cv2.CHAIN_APPROX_SIMPLE)[-2]
		center = None

		if len(cnts) > 0:
			c = max(cnts, key=cv2.contourArea)
			((x, y), radius) = cv2.minEnclosingCircle(c)
			M = cv2.moments(c)
			center = (int(M["m10"] / M["m00"]), int(M["m01"] / M["m00"]))

			if radius > 10:
				element = self._createElement()
				element.rect = (x, y, radius, center)
				self._elements.append(element)

	def drawDebug(self, image):
		if self._elementRectColor is None:
			raise Exception("Element color for this tracker need to be set.")

		if utils.isGray(image):
			elementColor = 255

		else:
			elementColor = self._elementRectColor

		for circle in self._elements:
			rects.draw_circle(image, circle.rect, elementColor)

class TurnRightTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
			flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT)
		self._classifier = cv2.CascadeClassifier("video/cascades/turn_right_cascade.xml")
		self._elementRectColor= (125,125,0)

	def _createElement(self):
		return TurnRight()

class BallTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
			flags = cv2.cv.CV_HAAR_FIND_BIGGEST_OBJECT)
		self._classifier = cv2.CascadeClassifier("video/cascades/ball_cascade.xml")
		self._elementRectColor= (0,200,200)

	def _createElement(self):
		return Ball()
