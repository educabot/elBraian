import cv2
import rects
import utils
class Face(object):
	"""Data on facial features"""

	def __init__(self):
		self.faceRect = None
		self.leftEyeRect = None
		self.rightEyeRect = None
		self.noseRect = None
		self.mouthRect = None

class Arrow(object):
	def __init__(self):
		self.arrowRect = None


class Tracker(object):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_SCALE_IMAGE):
		self.scaleFactor = scaleFactor
		self.minNeighbors = minNeighbors
		self.flags = flags


class FaceTracker(Tracker):
	def __init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_SCALE_IMAGE):
		Tracker.__init__(self, scaleFactor = 1.2, minNeighbors = 2, \
		flags = cv2.cv.CV_HAAR_SCALE_IMAGE)

		self._faces = []

		self._faceClassifier = cv2.CascadeClassifier("cascades/haarcascade_frontalface_alt.xml")
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

		minSize = utils.widthHeightDivideBy(image, 8)
		faceRects = self._faceClassifier.detectMultiScale(image, self.scaleFactor,
			self.minNeighbors, self.flags, minSize)

		if faceRects is not None:
			for faceRect in faceRects:
				face = Face()
				face.faceRect = faceRect

				#x, y, w, h = faceRect

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
		self._arrows = []
		self._arrowClassifier = cv2.CascadeClassifier("cascades/up_cascade.xml")
	
	@property
	def arrows(self):
		return self._arrows

	def update(self, image):
		self._arrows = []

		minSize = utils.widthHeightDivideBy(image, 8)
		arrowRects = self._arrowClassifier.detectMultiScale(image, self.scaleFactor,
			self.minNeighbors, self.flags, minSize)
		if arrowRects is not None:
			for arrowRect in arrowRects:
				arrow = Arrow()
				arrow.arrowRect = arrowRect

				self._arrows.append(arrow)


	def drawDebugRects(self, image):
		if utils.isGray(image):
			arrowColor = 255
		
		else:
			arrowColor = (0,0,255)
		

		for arrow in self.arrows:
			rects.outlineRect(image, arrow.arrowRect, arrowColor)

