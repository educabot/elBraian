using this project

https://github.com/codewithpassion/mjpg-streamer
But still works with the oficial



m### take picture every 100 ms (-tl parameter)
raspistill -w 320 -h 240 -q 50 -br 50 -vf -o /home/pi/tmp/mjpg/pic.jpg -tl 100 -t 9999999 -th 0:0:0 &

### picking the pictures up and expose them using and embedded web server

before install make sure jpeg lib is installed. If it doesnt trye:
	apt-get install libjpeg-dev

./mjpg_streamer -i "input_file.so -f /home/pi/tmp/mjpg -r" -o "output_http.so -p 8095 -w ./www"


LD_LIBRARY_PATH=./ ./mjpg_streamer -i "input_file.so -r -n pic.jpg -f /var/stream -i 1" -o "output_http.so -p 8095 -w ./www" &

