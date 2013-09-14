import cv2

cameraCapture = cv2.VideoCapture(0)
fps = 30
size = (int(cameraCapture.get(cv2.cv.CV_CAP_PROP_FRAME_WIDTH)),
	int(cameraCapture.get(cv2.cv.CV_CAP_PROP_FRAME_HEIGHT)))
#size = (640,480)
print "camara size"
print size



videoWriter = cv2.VideoWriter('testVideo.avi',cv2.cv.CV_FOURCC('X','V','I','D'),fps,size)

success, frame = cameraCapture.read()
numFramesRemaining = 10 * fps - 1

while success and numFramesRemaining > 0:
	videoWriter.write(frame)
	success, frame = cameraCapture.read()
	numFramesRemaining -= 1