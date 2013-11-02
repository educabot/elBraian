import sys
import StringIO

# create file-like string to capture output
codeOut = StringIO.StringIO()
codeErr = StringIO.StringIO()

#code = """
#def f(x):
#    x = x + 1
#    return x
#
#print 'This is my output.'
#"""

code = """
def f(x)
	print "Narigon puto " + str(x)
print("my output")
"""

# capture output and errors
sys.stdout = codeOut
sys.stderr = codeErr

exec code

# restore stdout and stderr
sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

print f(4)

s = codeErr.getvalue()
print s

print "error:\n%s\n" % s

s = codeOut.getvalue()

print "output:\n%s" % s

codeOut.close()
codeErr.close()