import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback

payload = urllib.urlencode({'id':16,'type':'geshou'})

batchnum = 200
queueLock = threading.Lock()
# f = open('proxyok.txt', 'r')

proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=8819588195389&getnum='+ str(batchnum) +'&isp=1&area=1'

proxies=[]
index=0

def getProxy():
	s = Session()
	print 'getting proxy from :' + proxyAPIUrl
	res = s.open(proxyAPIUrl)
	if res.getcode() == 200:
		con = res.read()
		print 'get proxy success! '
		proxies = con.split('\r\n')[:-1]
		return proxies


def lockAndGetProxy():
	global index
	queueLock.acquire()
	if index>=batchnum:
		return -1
	proxy = proxies[index]
	index+=1
	queueLock.release()
	return proxy

th=20
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		while 1:
			i=0
			errc=0
			try:
				proxy = lockAndGetProxy()
				if proxy == -1:
					break
				session = Session(proxy)
			except:
				print 'read proxy or session error'
			while 1:
				try:
					i+=1
					if(i%30==0):
						session = Session(proxy)
					res = session.open('http://newyear.music.163.com/web/activity/vote/toupiao',payload, 10)
					con=res.read()
					print con
					errc=0
					if json.loads(con)['code']==500:
						print 'break and switch new proxy'
						break
				except:
					errc+=1
					print 'error! count: '+ str(errc)
					if errc>th:
						exstr = traceback.format_exc()
						print exstr
						break

tc = 100
threads = []
for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

while 1:
	proxies = getProxy()
	print proxies
	if len(proxies) != batchnum:
		print 'get proxy error size:' + str(len(proxies))
		time.sleep(10)
		continue
	index=0
	for thread in threads:
		thread.start()
	for thread in threads:
		thread.join()