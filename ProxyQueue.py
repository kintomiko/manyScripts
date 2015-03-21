import urllib, urllib2, json, base64, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback
import Queue

def parseProxies(con):
	return con.split('\r\n')[:-1]
	# rst = []
	# tmp = eval(con)
	# tmp = tmp['proxylist']
	# keys = tmp.keys()
	# for k in keys:
		# rst.append(tmp[k]['ip']+':'+tmp[k]['port'])
	# return rst
rawproxyf = open('rawproxy.txt', 'a')

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
				time.sleep(6)

	def getProxies(self):
		global rawproxyf
		s = Session()
		print 'getting proxies from :' + self.proxyAPIUrl
		try:
			res = s.open(self.proxyAPIUrl)
			con = res.read()
			if res.getcode() == 200 and len(con)>500:
				tmp = parseProxies(con)
				print tmp
				if len(tmp)==0:
					return -1
				print >>rawproxyf, con
				rawproxyf.flush()
				print 'successfully get ('+str(len(tmp))+') proxies! '
				return tmp
			else:
				print 'get proxy from file'
				if not self.file:
					self.file=open(self.filename, 'r')
				tmp = []
				for i in range(0,self.batchnum):
					line = self.file.readline()
					if not line:
						self.file.close()
						self.file=open(self.filename, 'r')
					tmp.append(line[:-1])
				print 'successfully get ('+str(len(tmp))+') proxies! '
				print tmp
				return tmp
		except:
			exstr = traceback.format_exc()
			print exstr
			print 'get proxy failed! got from file'
			if not self.file:
				self.file=open(self.filename, 'r')
			tmp = []
			for i in range(self.batchnum):
				line = self.file.readline()
				if not line:
					self.file.close()
					self.file=open(self.filename, 'r')
				tmp.append(line)
			return tmp
		return -1

	def __init__(self, is_thread=True, filename='goodproxy.txt'):
		self.filename = filename
		self.lock = threading.Lock()
		self.file=None
		self.batchnum = 1000
		self.proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=gcxfhbvdf&getnum='+str(self.batchnum)
		# self.proxyAPIUrl = 'http://www.httpsdaili.com/api.asp?key=8819588195389&getnum='+ str(self.batchnum) +'&isp=1&area=1'
		# self.proxyAPIUrl = 'http://www.yasakvar.com/apiv1/?type=json'
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
					# print 'start get proxy thread'
					try:
						self.start()
					except:
						pass
						# print 'waiting...'
				else:
					rst = self.getProxies()
					if rst != -1:
						for proxy in rst:
							self.proxies.put(proxy)
			self.lock.release()
		return self.proxies.get()

if __name__ == '__main__':
	ProxyQueue.run()