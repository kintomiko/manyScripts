import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import Loginer
import threading,traceback
import Queue
from ProxyQueue import ProxyQueue


g_header={
'Accept':'application/json, text/javascript, */*; q=0.01',
'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
'Connection':'keep-alive',
'Content-Length':'11',
'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
'Host':'www.xingdiandian.com',
'Origin':'http://www.xingdiandian.com',
'Referer':'http://www.xingdiandian.com/',
'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
'X-Requested-With':'XMLHttpRequest',
'X-CSRF-Token':''
}
arr = [591, 6086, 6089, 6090, 6092, 6093]

g_post='star_id='

g_url='http://www.xingdiandian.com/home/checkin'

proxies = ProxyQueue(is_thread=True, filename='kuaidaili.txt')

# f=open('xingdiandian.txt', 'a')

th=5
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global g_header, th, g_post, g_url,proxies, f, arr
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
					res = session.open('http://www.xingdiandian.com/', time_out=8)
					con=res.read()
					csrf = con[con.find('csrf-token')-52:con.find('csrf-token')-8]
					# print con
					post = Loginer.HttpRequest()
					post.header = dict(g_header)
					post.header['X-CSRF-Token'] = csrf
					post.url = g_url
					for startid in arr:
						post.post = g_post+str(startid)
						wait=1
						while wait<10 and wait!=0:
							if wait>1:
								print 'sleeping (' +str(wait) + ')+1 secs to post again---' 
								time.sleep(wait)
							res = Loginer.post(session, post)
							con=res.read()
							params = con.split(';')	
							wait = int(params[4])
							print str(startid)+'||'+con
					# print >>f, proxy
					# if i%5==0:
					# 	f.flush()
					session.opener.close()
					errc=0
					break
					# if json.loads(con)['code']==200:
					# 	print con
					# if json.loads(con)['code']==500:
					# 	# print 'break and switch new proxy'
					# 	break
				except:
					errc+=1
					# print 'error! count: '+ str(errc)
					if errc>th:
						exstr = traceback.format_exc()
						session.opener.close()
						# print exstr
						break

tc = 200
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
