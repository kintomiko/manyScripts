import urllib, urllib2, json, base64, rsa, time, binascii, random
import cookielib
import re, threading
import hashlib
import Loginer
import math, traceback
import ProxyQueue


baiduSongLink4 = Loginer.HttpRequest()
baiduSongLink4.url = 'http://play.baidu.com/data/music/songlink'
baiduSongLink4.post='songIds=65720837&hq=1&type=m4a%2Cmp3&rate=&pt=0&flag=-1&s2p=-1&prerate=-1&bwt=-1&dur=-1&bat=-1&bp=-1&pos=-1&auto=-1'

baiduSongLink1 = Loginer.HttpRequest()
baiduSongLink1.url = 'http://play.baidu.com/data/music/songlink'
baiduSongLink1.post='songIds=85800595&hq=1&type=m4a%2Cmp3&rate=&pt=0&flag=-1&s2p=-1&prerate=-1&bwt=-1&dur=-1&bat=-1&bp=-1&pos=-1&auto=-1'

baiduSongLink2 = Loginer.HttpRequest()
baiduSongLink2.url = 'http://play.baidu.com/data/music/songlink'
baiduSongLink2.post='songIds=131445055&hq=1&type=m4a%2Cmp3&rate=&pt=0&flag=-1&s2p=-1&prerate=-1&bwt=-1&dur=-1&bat=-1&bp=-1&pos=-1&auto=-1'

baiduSongLink3 = Loginer.HttpRequest()
baiduSongLink3.url = 'http://play.baidu.com/data/music/songlink'
baiduSongLink3.post='songIds=91009739&hq=1&type=m4a%2Cmp3&rate=&pt=0&flag=-1&s2p=-1&prerate=-1&bwt=-1&dur=-1&bat=-1&bp=-1&pos=-1&auto=-1'

baiduSongLink = []

baiduSongLink.append(baiduSongLink1)
baiduSongLink.append(baiduSongLink2)
baiduSongLink.append(baiduSongLink3)
baiduSongLink.append(baiduSongLink4)


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
baiduStage1.post=urllib.urlencode({
	'songid':'85800595',
	'singerid':'8007'
})
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
baiduStage2.post=urllib.urlencode({
	'songid':'131445055',
	'singerid':'8007'
})
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
baiduStage3.post=urllib.urlencode({
	'songid':'91009739',
	'singerid':'8007'
})

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
baiduStage4.post=urllib.urlencode({
	'songid':'65720837',
	'singerid':'8007,10616'
})

baiduStage.append(baiduStage1)
baiduStage.append(baiduStage2)
baiduStage.append(baiduStage3)
baiduStage.append(baiduStage4)
j=0
pq = ProxyQueue.ProxyQueue()

class mythread(threading.Thread):
	def __init__(self):  
		threading.Thread.__init__(self) 
	def run(self):
		global pq, j
		while 1:
			for i in range(2):
				try:
					# proxy = pq.getProxy()
					# print 'get proxy '+proxy
					# s = Loginer.Session(proxy)
					s = Loginer.Session()
					# s.open('http://play.baidu.com')
					res = Loginer.post(s, baiduSongLink[i])
					# print '########################'
					con = eval(res.read())
					link = con['data']['songList'][0]['linkinfo']['128']['songLink'].replace('\\','')
					# print 'opening link: ' + link
					try:
						res = s.open(link, time_out=5)
					except:
						# print 'open play.baidu.com'
						res = s.open('http://play.baidu.com', time_out=5)
					# print 'return code ' +res.getcode() 
					# print 'sleeping'
					time.sleep(90)
					res = Loginer.post(s, baiduStage[i])
					print 'posted ' + str(i) + ' | ' + res.read()
				except:
					j+=1
					if j%100==0:
						print 'error count: ' + str(j)
					# traceback.print_exc()

tc = 500
threads = []

for i in range(1, tc+1):
	t = mythread()
	threads.append(t)

for thread in threads:
	thread.start()
for thread in threads:
	thread.join()
