using this project

https://github.com/codewithpassion/mjpg-streamer
But still work with the oficial


### take picture every 100 ms (-tl parameter)
raspistill -w 640 -h 480 -q 5 -o /tmp/stream/pic.jpg -tl 100 -t 9999999 -th 0:0:0 &

### picking the pictures up and expose them using and embedded web server
./mjpg_streamer -i "input_file.so -f /home/pi/tmp/mjpg" -o "output_http.so -w ./www"