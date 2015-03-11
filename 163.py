import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import Loginer
import threading,traceback
import Queue
from ProxyQueue import ProxyQueue

netease = Loginer.HttpRequest()

netease.post = urllib.urlencode({'id':16,'type':'geshou'})

netease.url='http://newyear.music.163.com/web/activity/vote/toupiao'

netease.header={
'Accept':'application/json, text/javascript, */*; q=0.01',
'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
'Connection':'keep-alive',
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Host':'newyear.music.163.com',
'Origin':'http://newyear.music.163.com',
'Referer':'http://newyear.music.163.com/activity/vote/w/singer/2',
'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
'X-Requested-With':'XMLHttpRequest'
}

proxies = ProxyQueue()

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
				# proxy = proxies.getProxy()
				# session = Session(proxy)
				session = Session()
			except:
				print 'read proxy or session error'
				exstr = traceback.format_exc()
				print exstr
			while 1:
				try:
					i+=1
					if(i%30==0):
						# session = Session(proxy)
						session = Session()
					res = Loginer.post(session, netease)
					con=res.read()
					print con
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

tc = 20
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
