import urllib, urllib2, json, base64, rsa, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading

f = open('proxy1.txt','r')
f2 = open('proxyok.txt', 'a')

class mythread(threading.Thread):  
    def __init__(self):  
        threading.Thread.__init__(self)  
    def run(self):
        while 1:
			line = f.readline()
			if not line:
				break
			s = Session(line,0)
			try:
				res = s.open('http://weibo.com', time_out=7)
				print 'proxy: ' + line + '========' + str(res.getcode())
				if res.getcode()==200:
					print >>f2, line[:-1]
			except:
				print 'proxy: ' + line + '======== time out'

tc = 10
threads = []
for i in range(1, tc+1):
	t = mythread()
	threads.append(t)
	t.start()

for thread in threads:
	thread.join()

f.close()
f2.close()