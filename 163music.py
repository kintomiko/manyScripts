import Loginer
import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import Loginer
import threading,traceback
import Queue
from ProxyQueue import ProxyQueue
import sys

g_header = {
'Accept':'*/*',
'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
'Connection':'keep-alive',
'Content-Type':'application/x-www-form-urlencoded',
'Host':'music.163.com',
'Origin':'http://music.163.com',
'Referer':'http://music.163.com/',
'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.118 Safari/537.36',
'X-Requested-With':'XMLHttpRequest'
}
arr = ['action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=31311180&json%5Btime%5D=288&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=31246383&json%5Btime%5D=298&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=109054&json%5Btime%5D=168&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=28190492&json%5Btime%5D=259&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=28208244&json%5Btime%5D=225&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=27836035&json%5Btime%5D=262&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=29498105&json%5Btime%5D=187&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=413018&json%5Btime%5D=326&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=31246384&json%5Btime%5D=221&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=31246385&json%5Btime%5D=291&json%5Bend%5D=playend',
'action=play&json%5Btype%5D=song&json%5Bwifi%5D=0&json%5Bdownload%5D=0&json%5Bid%5D=31311181&json%5Btime%5D=222&json%5Bend%5D=playend']

g_url='http://music.163.com/api/log/web?csrf_token='

# if sys.argv[1]!= None:
# 	proxies = ProxyQueue(is_thread=True, filename=sys.argv[1])
# else:
# 	proxies = ProxyQueue(is_thread=True)

# f=open('xingdiandian.txt', 'a')

th=5
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global g_header, th, g_url, arr
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
					req = Loginer.HttpRequest()
					req.header=g_header
					req.url=g_url
					for post in arr:
						req.post=post
						res = Loginer.post(session, req)
						print str(threading.current_thread()) + '||' + res.read()
					# print >>f, proxy
					# if i%5==0:
					# 	f.flush()
					# session.opener.close()
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
						# session.opener.close()
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
