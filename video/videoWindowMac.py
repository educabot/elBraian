import cv2 as cv
cv.namedWindow('cap', 1)

## its really import to check the source image size and set up the destination
## window
w = cv.VideoWriter('test.avi',cv.cv.CV_FOURCC('H','2','6','4'),25,(640,480))
cap = cv.VideoCapture(0)

videoCodec = cap.get(cv.cv.CV_CAP_PROP_FOURCC)
print videoCodec

success, frame = cap.read()

while success:
	cv.imshow('cap',frame)
	w.write(frame)
	success, frame = cap.read()

	if cv.waitKey(1) == 27:
		break

cv.DestroyWindow('cap')