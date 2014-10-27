from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler,PatternMatchingEventHandler
import logging
from time import sleep
import sys
from video.trackers import FaceTracker, ArrowTracker
from video.filters import BGRPortraCurveFilter
from websocket import create_connection 
import cv2



class FrameWatcher(PatternMatchingEventHandler):
	faceTracker = FaceTracker()
	patterns = ["*.txt", "*.jpg"]
	curvefilter = BGRPortraCurveFilter() 
	ws = create_connection("ws://localhost:9001/robot")
	def __process(self, event):
		print event.src_path, event.event_type
		if event.event_type == "created":
			print "processing image"
			img = cv2.imread(event.src_path)
			print img
			self.curvefilter.apply(img, img)
			self.faceTracker.update(img)
			faces = self.faceTracker.faces
			self.faceTracker.drawDebugRects(img)
			cv2.imwrite("output/test.jpg", img)




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