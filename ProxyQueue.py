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
				rst = outer.getProxyies()
				if rst != -1:
					for proxy in rst:
						self.outer.proxies.put(proxy)
				time.sleep(10)

	def getProxies(self):
		s = Session()
		print 'getting proxy from :' + self.proxyAPIUrl
		res = s.open(self.proxyAPIUrl)
		if res.getcode() == 200:
			con = res.read()
			print 'get proxy success! '
			tmp = con.split('\r\n')[:-1]
			return tmp
		return -1

	def __init__(self, is_thread=True):
		self.batchnum = 200
		self.proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=8819588195389&getnum='+ str(self.batchnum) +'&isp=1&area=1'
		self.proxies = Queue.Queue(maxsize=200)
		if is_thread:
			self.proxyt = self.proxythread(self)

	def start(self):
		self.proxyt.start()

	def stop(self):
		self.proxyt.stop()

	def getProxy(self):
		if self.proxies.empty():
			if self.proxyt:
				self.start()
				time.sleep(1)
			else:
				rst = getProxies()
				if rst != -1:
					for proxy in rst:
						self.proxies.put(proxy)
		if self.proxies.empty():
			raise Exception('get proxy failed')
		return self.proxies.get()

if __name__ == '__main__':
	ProxyQueue.run()