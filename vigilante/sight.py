from watchdog.observers import Observer
from watchdog.events import LoggingEventHandler


class Watcher(object):
	def __init__(self, path = '.'):
		self._path = path
		self._logging = LoggingEventHandler()
		self._observer = Observer()
		self._observer.schedule(self._logging, self._path, recursive=True)


	def start(self):
		self._observer.start()


	def onFrame(self):
		


if __name__ == "__main__":
	Watcher().start()