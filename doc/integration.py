from braianDriver.robot import Robot
from time import sleep

robot_instance = Robot()

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(speed=Robot.SPEED_MEDIUM)

robot_instance.set_backward()
print "...."
sleep(1)
robot_instance.move(speed=Robot.SPEED_LOW)

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(arc=Robot.LEFT_ARC_CLOSE)

robot_instance.set_forward()
print "...."
sleep(1)
robot_instance.move(arc=Robot.RIGHT_ARC_OPEN)
sys.exit(0)



listeners = [component1, component2, component3]
eventqueue.add(InitEvent())
while True:
    event = eventqueue.pop()
    for listener in listeners:
        listener.handle_event(event)


from twisted.internet import reactor
from twisted.web.client import getPage

def updateUI(message):
    print "UI:", message

def processPage(pageContent):
    print 'got the page'
    # process the page here
    # ...
    # update the UI
    updateUI('Received %d bytes' % len(pageContent))

def handleError(error):
    print 'got error'
    # update the UI
    updateUI('Whoops! %s' % error)

pageFetchedDeferred = getPage("http://orestis.gr")
pageFetchedDeferred.addCallback(processPage)
pageFetchedDeferred.addErrback(handleError)

reactor.run()



from __future__ import print_function
import signal
import pyuv

def on_read(client, data, error):
    if data is None:
        client.close()
        clients.remove(client)
        return
    client.write(data)

def on_connection(server, error):
    client = pyuv.TCP(server.loop)
    server.accept(client)
    clients.append(client)
    client.start_read(on_read)

def signal_cb(handle, signum):
    [c.close() for c in clients]
    signal_h.close()
    server.close()

print("PyUV version %s" % pyuv.__version__)

loop = pyuv.Loop.default_loop()
clients = []

server = pyuv.TCP(loop)
server.bind(("0.0.0.0", 1234))
server.listen(on_connection)

signal_h = pyuv.Signal(loop)
signal_h.start(signal_cb, signal.SIGINT)

loop.run()
print("Stopped!")



class MyDateClass(object):
	"""docstring for MyClass"""
	classproperty = None
	def __init__(self, arg):
		super(MyClass, self).__init__()
		self.arg = arg
		self._foo
	
	@def foo():
	    doc = "The foo property."
	    def fget(self):
	        return self._foo
	    def fset(self, value):
	        self._foo = value
	    def fdel(self):
	        del self._foo
	    return locals()
	foo = property(**foo())

	@property
	def foo(self):
		return self._foo

	@classmethod
    def from_string(cls, date_as_string):
        day, month, year = map(int, date_as_string.split('-'))
        date1 = cls(day, month, year)
        return date1

date2 = MyDateClass.from_string('11-09-2012')

	@staticmethod
    def is_date_valid(date_as_string):
        day, month, year = map(int, date_as_string.split('-'))
        return day <= 31 and month <= 12 and year <= 3999



interface myIterable:
	def next():

class myList implements myIterable:
	def next(self):
		#myImpl



def f (x): return x**2

print f(8)

g = lambda x: x**2

print g(8)



f = lambda x: x + 1
g = lambda x: x * 2

d = createCompositeFunc(f,g)

d(8)


from flask import Flask
app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello World!"

if __name__ == "__main__":
    app.run()


import tornado.ioloop
import tornado.web

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

application = tornado.web.Application([
    (r"/", MainHandler),
])

if __name__ == "__main__":
    application.listen(8888)
    tornado.ioloop.IOLoop.instance().start()

from pyjade.ext.tornado import patch_tornado
patch_tornado()




from cassandra.cluster import Cluster
from cassandra.policies import DCAwareRoundRobinPolicy

cluster = Cluster(
    ['10.1.1.3', '10.1.1.4', '10.1.1.5'],
    load_balancing_policy=DCAwareRoundRobinPolicy(local_dc='US_EAST'),
    port=9042)

cluster = Cluster()
session = cluster.connect('mykeyspace')

rows = session.execute('SELECT name, age, email FROM users')
for user_row in rows:
    print user_row.name, user_row.age, user_row.email

session.execute(
    """
    INSERT INTO users (name, credits, user_id)
    VALUES (%s, %s, %s)
    """,
    ("Diego Ram", 42, uuid.uuid1())
)


def loggeable(f):
    def new_log():
        print "Method: " f.__name__
        f()
    return new_log

@loggeable
def func1():
    ## do my stuffs
    print "new action"

