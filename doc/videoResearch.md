using this project

https://github.com/codewithpassion/mjpg-streamer
But still work with the oficial


m### take picture every 100 ms (-tl parameter)
raspistill -w 640 -h 480 -q 50 -br 50 -vf -o /home/pi/tmp/mjpg/pic.jpg -tl 50 -t 9999999 -th 0:0:0 &

### picking the pictures up and expose them using and embedded web server
./mjpg_streamer -i "input_file.so -f /home/pi/tmp/mjpg -r" -o "output_http.so -p 8095 -w ./www"


LD_LIBRARY_PATH=./ ./mjpg_streamer -i "input_file.so -r -n pic.jpg -f /var/stream" -o "output_http.so -p 8095 -w ./www" &

