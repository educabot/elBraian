import cv2
import numpy
import utils


def recolorRC(src, dst):
	b, g, r = cv2.split(src)
	cv2.addWeighted(b, 0.5, g, 0.5, 0, b)
	cv2.merge((b, b, r),dst)


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


def strokeEdges(src, dst, blurKSize =7, edgekSize =5):
	if blurKSize >= 3:
		blurredSrc = cv2.medianBlur(src, blurKSize)
		graySrc = cv2.cvtColor(blurredSrc, cv2.COLOR_BGR2GRAY)
	else:
		graySrc = cv2.cvtColor(src, cv2.COLOR_BGR2GRAY)

	cv2.Laplacian(graySrc, cv2.cv.CV_8U, graySrc, ksize = edgekSize)
	normalizedInverseAlpha = (1.0/255) * (255 - graySrc)
	channels = cv2.split(src)
	for channel in channels:
		channel[:] = channel * normalizedInverseAlpha

	cv2.merge(channels, dst)


class VFuncFilter(object):

	def __init__(self, vFunc = None, dtype = numpy.uint8):
		length = numpy.iinfo(dtype).max + 1
		self._vLookupArray = utils.createLookupArray(vFunc, length)


	def apply(self, src, dst):
		srcFlatView = utils.flatView(src)
		dstFlatView = utils.flatView(dst)
		utils.applyLookupArray(self._vLookupArray, srcFlatView, dstFlatView)


class VCurveFilter(VFuncFilter):
	"""A filter that applies a curve to V """
	def __init__(self, vPoints, dtype = numpy.uint8):
		VFuncFilter.__init__(self, utils.createCurveFunc(vPoints), dtype)


class BGRFuncFilter(object):
	def __init__(self, vFunc = None, bFunc = None, gFunc = None, rFunc = None, dtype = numpy.uint8):
		length = numpy.iinfo(dtype).max + 1
		self._bLookupArray = utils.createLookupArray(utils.createCompositeFunc(bFunc,vFunc),
			length)
		self._gLoopupArray = utils.createLookupArray(utils.createCompositeFunc(gFunc,vFunc),
			length)
		self._rLookupArray = utils.createLookupArray(utils.createCompositeFunc(rFunc,vFunc),
			length)

	def apply(self, src, dst):
		b, g, r = cv2.split(src)
		utils.applyLookupArray(self._bLookupArray, b, b)
		utils.applyLookupArray(self._gLoopupArray, g, g)
		utils.applyLookupArray(self._rLookupArray, r, r)
		cv2.merge([b,g,r], dst)

class BGRCurveFilter(BGRFuncFilter):
	def __init__(self, vPoints = None, bPoints = None, gPoints = None, rPoints =  None,
		dtype = numpy.uint8):
		BGRFuncFilter.__init__(self, utils.createCurveFunc(vPoints),
			utils.createCurveFunc(bPoints), utils.createCurveFunc(gPoints),
			utils.createCurveFunc(rPoints), dtype)


class BGRPortraCurveFilter(BGRCurveFilter):

	def __init__(self, dtype = numpy.uint8):
		BGRCurveFilter.__init__(self, vPoints = [(0,0),(23,20),(157,173),(255,255)],
			bPoints = [(0,0),(41,46),(231,228),(255,255)],
			gPoints = [(0,0),(52,47),(189,196),(255,255)],
			rPoints = [(0,0),(69,69),(213,218),(255,255)], dtype = dtype)

class BGRProviaCurveFilter(BGRCurveFilter):

	def __init__(self, dtype = numpy.uint8):
		BGRCurveFilter.__init__(self, bPoints = [(0,0),(35,25),(205,227),(255,255)],
			gPoints = [(0,0),(27,21),(196,207),(255,255)],
			rPoints = [(0,0),(59,54),(202,210),(255,255)], dtype = dtype)
