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

g_url = 'http://interaction.wap.sogou.com/interaction?reqtype=vote&querystr=%E5%A7%9A%E8%B4%9D%E5%A8%9C&querytype=0&callback=jsonp4&vrid=100001&'
g_url1 = 'http://interaction.wap.sogou.com/interaction?reqtype=vote&querystr=%E9%83%91%E6%B7%B3%E5%85%83&querytype=0&callback=jsonp12&vrid=100001&'

if sys.argv[1]!= None:
	proxies = ProxyQueue(is_thread=True, filename=sys.argv[1])
else:
	proxies = ProxyQueue(is_thread=True)

# f=open('xingdiandian.txt', 'a')

th=5
class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global g_url,g_url1,proxies
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
					con = session.open('http://m.sogou.com/web/features/rankList.jsp?ranktype=').read()
					mdpass=con[con.find('passStr')+11:con.find('passStr')+43]
					userparam = urllib.quote(con[con.find('userid')+10:con.find('userid')+38])
					log = 'userid='+userparam+'&sec='+mdpass+'&login=0'
					for i in range(10):
						res = session.open(g_url+log)
						print res.read()
						res = session.open(g_url1+log)
						print res.read()
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

tc = int(sys.argv[2]) if sys.argv[2] != None else 80

threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
