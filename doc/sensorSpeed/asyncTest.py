from multiprocessing import Process
import os

def info(title):
	print title
	print 'module name: ', __name__
	if hasattr(os, 'getppid'):
		print 'parent process: ' , os.getppid()
	print 'process Id', os.getppid()

def f(name):
	info('function f')
	print 'hello ', name

if __name__ == '__main__':
	info('main line')
	p = Process(target=f, args=('diego',))
	p.start()
	p.join() 