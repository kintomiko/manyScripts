import urllib, urllib2, json, base64, rsa, time, binascii, random
import cookielib
import re, threading
import hashlib
import Loginer
import math
import ProxyQueue

baiduStage = []

baiduStage1 = Loginer.HttpRequest()

baiduStage1.url = 'http://play.baidu.com/statage'
baiduStage1.header={
	'Accept':'*/*',
	'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
	'Connection':'keep-alive',
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Host':'play.baidu.com',
	'Origin':'http://play.baidu.com',
	'Referer':'http://play.baidu.com/',
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest'
}
baiduStage1.post={
	'songid':'85800595',
	'singerid':'8007'
}
baiduStage2 = Loginer.HttpRequest()

baiduStage2.url = 'http://play.baidu.com/statage'
baiduStage2.header={
	'Accept':'*/*',
	'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
	'Connection':'keep-alive',
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Host':'play.baidu.com',
	'Origin':'http://play.baidu.com',
	'Referer':'http://play.baidu.com/',
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest'
}
baiduStage2.post={
	'songid':'131445055',
	'singerid':'8007'
}
baiduStage3 = Loginer.HttpRequest()

baiduStage3.url = 'http://play.baidu.com/statage'
baiduStage3.header={
	'Accept':'*/*',
	'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
	'Connection':'keep-alive',
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Host':'play.baidu.com',
	'Origin':'http://play.baidu.com',
	'Referer':'http://play.baidu.com/?__m=mboxCtrl.addSong&__a=91009739&__o=/top/yingshijinqu||songListIcon&fr=-1||-1',
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest'
}
baiduStage3.post={
	'songid':'91009739',
	'singerid':'8007'
}

baiduStage4 = Loginer.HttpRequest()

baiduStage4.url = 'http://play.baidu.com/statage'
baiduStage4.header={
	'Accept':'*/*',
	'Accept-Language':'en-US,en;q=0.8,zh-CN;q=0.6,zh;q=0.4,ja;q=0.2,zh-TW;q=0.2',
	'Connection':'keep-alive',
	'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
	'Host':'play.baidu.com',
	'Origin':'http://play.baidu.com',
	'Referer':'http://play.baidu.com/?__m=mboxCtrl.addSong&__a=65720837&__o=/search||songListIcon&fr=-1||play.baidu.com&__s=%E8%87%AA%E5%B7%B1',
	'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_90_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/40.0.2214.111 Safari/537.36',
	'X-Requested-With':'XMLHttpRequest'
}
baiduStage4.post={
	'songid':'65720837',
	'singerid':'8007,10616'
}

baiduStage.append(baiduStage1)
baiduStage.append(baiduStage2)
baiduStage.append(baiduStage3)
baiduStage.append(baiduStage4)
j=0
pq = ProxyQueue.ProxyQueue(is_thread=False)

class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global pq, j
		while 1:
			try:
				for in in range(4):
					proxy = pq.getProxy()
					s = Loginer.Session(proxy)
					res = Loginer.post(s, baiduStage[i])
					print 'posting ' + str(i) + ' | ' + res.read()
			except:
				j+=1
				# print 'post error'

tc = 500
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()