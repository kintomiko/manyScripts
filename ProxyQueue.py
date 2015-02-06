import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback
import Queue

class ProxyQueue(object):

	class proxythread(threading.Thread):
		def __init__(self, outer):  
			threading.Thread.__init__(self)
			self.outer = outer
		def run(self):
			while 1:
				s = Session()
				print 'getting proxy from :' + self.outer.proxyAPIUrl
				res = s.open(self.outer.proxyAPIUrl)
				if res.getcode() == 200:
					con = res.read()
					print 'get proxy success! '
					tmp = con.split('\r\n')[:-1]
					for proxy in tmp:
						self.outer.proxies.put(proxy)
				time.sleep(10)

	def __init__(self):
		self.batchnum = 200
		self.proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=8819588195389&getnum='+ str(self.batchnum) +'&isp=1&area=1'
		self.proxies = Queue.Queue(maxsize=100)
		self.proxyt = self.proxythread(self)

	def start(self):
		self.proxyt.start()

	def stop(self):
		self.proxyt.stop()

	def getProxy(self):
		if self.proxies.empty():
			self.start()
			time.sleep(1)
		if self.proxies.empty():
			raise Exception('get proxy failed')
		return self.proxies.get()

if __name__ == '__main__':
	ProxyQueue.run()