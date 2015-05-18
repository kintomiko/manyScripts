import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session, HttpRequest
import Loginer
import threading,traceback
import Queue, sys

headers = {'User-Agent': 'Mozilla/5.0',
'Accept': '*/*',
'Host':'open.onebox.haosou.com',
'Referer':'http://m.haosou.com/mhtml/zt/hotlist.html',
'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'}

index='http://m.haosou.com/mhtml/zt/hotlist.html#'
pollUrl = 'http://rs.ewang.com/fengyun/wpay/weipay.php?from=1&inbox=1&time=1428678683&userid=000649313&sig=c36554ecbe94c6e1fbfc1b23db224e76'

th=5
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global th
		global headers,pollUrl
		c = 0
		while 1:
			i=1
			errc=0
			try:
				# proxy = proxies.getProxy()
				# print 'thread using proxy: ' + proxy
				# session = Session(proxy)
				session = Session()
			except:
				# print 'read proxy or session error'
				# exstr = traceback.format_exc()
				# print exstr
				continue
			while 1:
				try:
					# if i%(pollnum+1)==0:
					# 	print >> f, proxy
					# 	pcount+=1
					# 	if pcount%50==0:
					# 		f.flush()
					# 	break
						# session = Session()
					# res = session.open(pollUrl2+str(int(time.time()*1e3)), time_out=10)
					req = HttpRequest()
					req.header = headers
					# req.url = index
					# res = Loginer.get(session, req)
					# for i in range(pollnum):
					req.url = pollUrl
					res = Loginer.get(session, req)
					con=res.read()
					print con
					# c+=1
					# i+=1
					# print con
					errc=0
					break
					# if c%30==0:
						# lock.acquire()
						# count += c
						# c=0
						# print '==========voted ' + str(count) + ' times!'
						# lock.release()
				except:
					errc+=1
					# print 'error! count: '+ str(errc)
					if errc>th:
					# exstr = traceback.format_exc()
					# print exstr
						break

tc = 2000
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
