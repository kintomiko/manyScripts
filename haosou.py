import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session, HttpRequest
import Loginer
import threading,traceback
import Queue
from ProxyQueue import ProxyQueue

headers = {'User-Agent': 'Mozilla/5.0',
'Accept': '*/*',
'Host':'open.onebox.haosou.com',
'Referer':'http://m.haosou.com/mhtml/zt/hotlist.html',
'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36'}

index='http://m.haosou.com/mhtml/zt/hotlist.html#'
pollUrl='http://open.onebox.haosou.com/api/dovote?key=%E5%A7%9A%E8%B4%9D%E5%A8%9C&type=relation_hits_side&src=onebox&tpl=0&callback=jsonp'
# pollUrl2 = 'http://s.360.cn/w360/c.htm?p=mso_onebox_hot&u=http%3A%2F%2Fm.haosou.com%2Fmhtml%2Fzt%2Fhotlist.html%23&id=41460785.532862450986764500.1423238813109.2312&guid=41460785.532862450986764500.1423238813109.2312&f=http%3A%2F%2Fm.haosou.com%2Fmhtml%2Fzt%2Fhotlist.html%23vote&c=%E6%94%AF%E6%8C%81%2B1&cId=&clickId=%7B%22p%22%3A%22btn_vote%22%7D&t='
# payload = urllib.urlencode({'id':16,'type':'geshou'})

proxies = ProxyQueue(is_thread=True)
pollnum = 10
lock = threading.Lock()
f = open('rawproxyHaosou.txt', 'a')
pcount=0
count = 0

th=5
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global proxies
		global th
		global pollnum
		global count
		global lock
		global pcount,f,headers,index,pollUrl
		c = 0
		while 1:
			i=1
			errc=0
			try:
				proxy = proxies.getProxy()
				# print 'thread using proxy: ' + proxy
				session = Session(proxy)
				# session = Session()
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
					req.url = index
					res = Loginer.get(session, req)
					for i in range(pollnum):
						req.url = pollUrl+str(4+i)
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
						exstr = traceback.format_exc()
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
