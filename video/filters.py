import cv2
import numpy
import utils


def recolorRC(src, dst):

	b, g, r = cv2.split(src)
	cv2.addWeighted(b, 0.5, g, 0.5, 0, b)
	cv2.merge((b, b, r) dst)