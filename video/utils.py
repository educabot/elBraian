import cv2
import numpy
import scipy.interpolate
import rects


def createCurveFunc(points):
	""" Return a function derived from control points """
	if points is None:
		return None
	numPoints = len(points)
	if numPoints < 2:
		return None
	xs, ys = zip(*points)

	if numPoints < 4:
		kind = 'linear'
	else:
		kind = 'cubic'
	return scipy.interpolate.interp1d(xs, ys, kind, bounds_error=False)


def isGray(image):
	return image.ndim < 3

def createLookupArray(func, length = 256):
	""" return a lookup for whole-numer inputs to a function"""

	if func is None:
		return None

	lookupArray = numpy.empty(length)
	i = 0
	while i < length:
		func_i = func(i)
		lookupArray[i] = min(max(0, func_i), length - 1)
		i +=1
	return lookupArray


def applyLookupArray(lookupArray, src, dst):
	"""map a source to a destination using lookup"""

	if lookupArray is None:
		return None

	dst[:] = lookupArray[src]

def createCompositeFunc(func0, func1):
	if func0 is None:
		return None

	if func1 is None:
		return None

	return lambda x: func0(func1(x))


def createFlatView(array):

	flatView = array.view()
	flatView.shape =  array.size
	return flatView


def widthHeightDivideBy(image, divisor):
	h, w = image.shape[:2]
	return (w/divisor, h/divisor)


def draw_str(dst, (x, y), s):
    cv2.putText(dst, s, (x+1, y+1), cv2.FONT_HERSHEY_PLAIN, 1.0, (0, 0, 0), thickness = 2, lineType=cv2.CV_AA)
    cv2.putText(dst, s, (x, y), cv2.FONT_HERSHEY_PLAIN, 1.0, (255, 255, 255), lineType=cv2.CV_AA)


def drawCameraFrame(frame, size):
	#Cross in the middle
	width, height = size
	rects.outlineRect(frame, (width/2, height/3, 0, height/3) ,(0, 255 , 0))
	rects.outlineRect(frame, (width/3, height/2, width/3, 0) ,(0, 255 , 0))

	rects.outlineRect(frame, (20, 20, 0, 60) ,(0, 255 , 0))
	rects.outlineRect(frame, (20, 20, 60, 0) ,(0, 255 , 0))

	rects.outlineRect(frame, (width-20, 20, 0, 60) ,(0, 255 , 0))
	rects.outlineRect(frame, (width-80, 20, 60, 0) ,(0, 255 , 0))


	rects.outlineRect(frame, (20, height-80, 0, 60) ,(0, 255 , 0))
	rects.outlineRect(frame, (20, height-20, 60, 0) ,(0, 255 , 0))

	rects.outlineRect(frame, (width-20, height- 80, 0, 60) ,(0, 255 , 0))
	rects.outlineRect(frame, (width-80, height- 20, 60, 0) ,(0, 255 , 0))

	#draw_str(frame,(width-200, height - 40), "elBraian perspective")
