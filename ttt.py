import urllib, urllib2, json, base64, rsa, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback

payload = urllib.urlencode({'id':16,'type':'geshou'})


f = open('proxyok.txt', 'r')

class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		while 1:
			proxy = f.readline()
			if not proxy:
				break
			session = Session(proxy)
			i=0
			while 1:
				try:
					i+=1
					if(i%30==0):
						session = Session(proxy)
					res = session.open('http://newyear.music.163.com/web/activity/vote/toupiao',payload)
					con=res.read()
					print con
					if json.loads(con)['code']==500:
						print 'break and switch new proxy'
						break
				except:
					exstr = traceback.format_exc()
					print exstr

tc = 5
threads = []
for i in range(1, tc+1):
	t = mythread()
	threads.append(t)
	t.start()

for thread in threads:
	thread.join()

f.close()
f2.close()
f3.close()