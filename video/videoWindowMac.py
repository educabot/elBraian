import cv
cv.NamedWindow('cap', 1)
w = cv.CreateVideoWriter('test.avi',cv.CV_FOURCC('X','V','I','D'),25,(640,480))
cap = cv.CaptureFromCAM(0)
while(1):
    img = cv.QueryFrame(cap)
    cv.ShowImage('cap', img)
    cv.WriteFrame(w, img)
    if cv.WaitKey(1) == 27:
        break
cv.DestroyWindow('cap')