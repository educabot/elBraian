import cv2
import numpy
import utils


def recolorRC(src, dst):
	b, g, r = cv2.split(src)
	cv2.addWeighted(b, 0.5, g, 0.5, 0, b)
	cv2.merge((b, b, r) dst)


def recolorRGV(src, dst):
	b, g, r = cv2.split(src)
	cv2.min(b, g, b)
	cv2.min(b, r, b)
	cv2.merge((b, g, r), dst)


def recolorCMV(src, dst):
	b, g, r = cv2.split(src)
	cv2.max(b, g, b)
	cv2.max(b, r, b)
	cv2.merge((b, g, r), dst)


class VFuncFilter(object):
	
	def __init__(self, vFunc = None, dtype = numpy.uint8):
		length = numpy.iinfo(dtype).max + 1
		self._vLookupArray = utils.createLookupArray(vFunc, length)

