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
				rst = self.outer.getProxies()
				if rst != -1:
					for proxy in rst:
						self.outer.proxies.put(proxy)
				time.sleep(10)

	def getProxies(self):
		s = Session()
		print 'getting proxies from :' + self.proxyAPIUrl
		try:
			res = s.open(self.proxyAPIUrl)
			con = res.read()
			if res.getcode() == 200 and len(con)>500:
				tmp = con.split('\r\n')[:-1]
				print con
				if len(tmp)==0:
					return -1
				f = open('rawproxy.txt', 'a')
				print >>f, con
				f.close()
				print 'successfully get ('+str(len(tmp))+') proxies! '
				return tmp
			else:
				print 'get proxy from file'
				if not self.file:
					self.file=open('goodproxy.txt', 'r')
				tmp = []
				for i in range(0,self.batchnum):
					line = self.file.readline()
					if not line:
						self.file.close()
						self.file=open('goodproxy.txt', 'r')
					tmp.append(line[:-1])
				return tmp
		except:
			print 'get proxy failed! got from file'
			if not self.file:
				self.file=open('goodproxy.txt', 'r')
			tmp = []
			for i in range(self.batchnum):
				line = self.file.readline()
				if not line:
					self.file.close()
					self.file=open('goodproxy.txt', 'r')
				tmp.append(line)
			return tmp
		return -1

	def __init__(self, is_thread=True):
		self.lock = threading.Lock()
		self.file=None
		self.batchnum = 1000
		self.proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=8819588195389&getnum='+ str(self.batchnum) +'&isp=1&area=1'
		self.proxies = Queue.Queue(maxsize=self.batchnum)
		if is_thread:
			self.proxyt = self.proxythread(self)
		else:
			self.proxyt=None

	def start(self):
		self.proxyt.start()

	def stop(self):
		self.proxyt.stop()

	def getProxy(self):
		if self.proxies.empty():
			self.lock.acquire()
			# print 'thread : '+str(threading.current_thread())+'get lock'
			# print self.proxies.empty()
			if self.proxies.empty():
				if self.proxyt:
					print 'start get proxy thread'
					self.start()
					time.sleep(1)
				else:
					rst = self.getProxies()
					if rst != -1:
						for proxy in rst:
							self.proxies.put(proxy)
			self.lock.release()
		if self.proxies.empty():
			raise Exception('get finnally proxy failed')
		return self.proxies.get()

if __name__ == '__main__':
	ProxyQueue.run()