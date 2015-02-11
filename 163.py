import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback
import Queue
from ProxyQueue import ProxyQueue

payload = urllib.urlencode({'id':16,'type':'geshou'})

proxies = ProxyQueue(is_thread=False)

th=20
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global th
		while 1:
			i=0
			errc=0
			try:
				proxy = proxies.getProxy()
				session = Session(proxy)
				# session = Session()
			except:
				print 'read proxy or session error'
				exstr = traceback.format_exc()
				print exstr
			while 1:
				try:
					i+=1
					if(i%30==0):
						session = Session(proxy)
						# session = Session()
					res = session.open('http://newyear.music.163.com/web/activity/vote/toupiao',payload, 10)
					con=res.read()
					# print con
					errc=0
					if json.loads(con)['code']==200:
						print con
					if json.loads(con)['code']==500:
						# print 'break and switch new proxy'
						break
				except:
					errc+=1
					# print 'error! count: '+ str(errc)
					if errc>th:
						exstr = traceback.format_exc()
						# print exstr
						break

tc = 500
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
