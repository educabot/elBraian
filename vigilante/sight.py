from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler,PatternMatchingEventHandler
import logging
from time import sleep
import sys
from video.trackers import FaceTracker, ArrowTracker
from websocket import create_connection 
import cv2
import os, json



class FrameWatcher(PatternMatchingEventHandler):
	
	patterns = ["*.jpg"]
	
	def __init__(self, *args):
		PatternMatchingEventHandler.__init__(self, *args)
		self._vertical_position = 0
		self._horizontal_position = 0
		self._faceTracker = FaceTracker()
		#self._curvefilter = BGRPortraCurveFilter()
		self._center = (320, 240)
		self._threshold = 60
		self._ws = create_connection("ws://localhost:9001/robot")



	def __process(self, event):
		print event.src_path, event.event_type
		if event.event_type == "created" or event.event_type == "modified":
			print "processing image"
			img = cv2.imread(event.src_path)
			#self._curvefilter.apply(img, img)
			self._faceTracker.update(img)
			faces = self._faceTracker.faces
			self._faceTracker.drawDebugRects(img)
			cv2.imwrite("output/test.jpg", img)
			os.remove(event.src_path)
			if len(faces) > 0 :
				self.__calculateVerticalAdjusment(faces[0])
				self.__calculateHorizontalAdjustment(faces[0])
			else :
				self._horizontal_position = 0
				self._vertical_position = 0

			self.__sendMessage()


	def __calculateVerticalAdjusment(self, face):
		if face.center < self._center[1] - self._threshold:
			self._vertical_position -= 10
		if face.center > self._center[1] + self._threshold:
			self._vertical_position += 10


	def __calculateHorizontalAdjustment(self, face):
		if face.center < self._center[0] - self._threshold:
			self._horizontal_position -= 10
		if face.center > self._center[0] + self._threshold:
			self._horizontal_position += 10


	def __sendMessage(self):
		message = {}
		message["message"] = "HEAD-MOVE"
		message["payload"] = {}
		message["payload"]["head_horizontal"] = self._horizontal_position
		message["payload"]["head_vertical"] = self._vertical_position
		self._ws.send(json.dumps(message))


	def on_modified(self, event):
		self.__process(event)


	def on_created(self, event):
		self.__process(event)



if __name__ == "__main__":
	args = sys.argv[1:]
	observer = Observer()
	observer.schedule(FrameWatcher(), path= args[0] if args else ".")
	observer.start()
	try:
		while True:
			sleep(1)
	except KeyboardInterrupt, e:
		observer.stop()

	observer.join()