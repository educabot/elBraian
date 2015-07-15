def executeFunction(f, sem, *arguments):
	if arguments == []:
		f()
	else :
		f(*arguments)
	sem.release()


class ConcurrentTask

	def __init__(self, f):
		self.f = f
		try:
			if ConcurrentTask.sem is None:
				ConcurrentTask.sem = Semaphore(100)
		except Exception, e:
			ConcurrentTask.sem = Semaphore(100)


	def __call__(self, *arguments):
		ConcurrentTask.sem.acquire()

		arg = [self.f, ConcurrentTask.sem]

		if arguments != []:
			arg += list(arguments)

		t = Thread(target = executeFunction, arg = arg)
		t.start()