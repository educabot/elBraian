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

		