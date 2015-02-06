import urllib, urllib2, json, base64, rsa, time, binascii, random
import cookielib
import re
import hashlib
from Loginer import Session
import threading,traceback
from ProxyQueue import ProxyQueue

headers = {'User-Agent': 'Mozilla/5.0'}

postdata = {'entry': 'weibo',
'gateway': '1',
'from': '',
'savestate': '7',
'userticket': '1',
'ssosimplelogin':'1',
'vsnf': '1',
'vsnval': '',
'su': '',
'service': 'miniblog',
'servertime': '',
'nonce': '',
'pwencode': 'rsa2',
'rsakv': '',
'sp': '',
'encoding': 'UTF-8',
'prelt':'130',
'domain': 'weibo.com',
'url':'http://weibo.com/ajaxlogin.php?framelogin=1&callback=parent.sinaSSOController.feedBackUrlCallBack',
'returntype': 'META',
'pcid': ''
}

class SinaLogin(object):

	def __init__(self):
		self.pubkey='EB2A38568661887FA180BDDB5CABD5F21C7BFD59C090CB2D245A87AC253062882729293E5506350508E7F9AA3BB77F4333231490F915F6D63C55FE2F08A49B353F444AD3993CACC02DB784ABBB8E42A9B1BBFFFB38BE18D78E87A0E41B9B8F73A928EE0CCEE1F6739884B9777E4FE9E88A1BBE495927AC4A799B3181D6442443'
		self.servertimeUrl = 'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=&rsakt=mod&client=ssologin.js(v1.4.18)&_='+str(long(time.time()*1000))
		self.loginUrl = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.18)'
		self.session = None
		self.pcid=''
		self.proxyQueue = ProxyQueue()
		self.prelogin={}

	def sinaEncryptMsg(self, pubkey, msg, servertime, nonce):
		rsaPublickey = int(pubkey, 16)  
		key = rsa.PublicKey(rsaPublickey, 65537) 
		message = str(servertime) + '\t' + str(nonce) + '\n' + str(msg)
		passwd = rsa.encrypt(message, key) 
		passwd = binascii.b2a_hex(passwd)
		return passwd

	def login(self, username, password):
		if postdata.get('door')!=None:
			del postdata['door']
		# proxy = self.proxyQueue.getProxy()
		# self.session = Session(proxy)
		self.session = Session()
		# prelogin
		res = self.session.open(self.servertimeUrl, time_out=5)
		t = long(time.time()/1000)
		con = res.read()
		self.prelogin = eval(con[35:-1])

		servertime=self.prelogin['servertime']
		pubkey=self.prelogin['pubkey']
		nonce=self.prelogin['nonce']
		su = base64.encodestring(urllib.quote(username))[:-1]
		servertime = servertime + long(long(servertime)/1000) - t
		sp = self.sinaEncryptMsg(pubkey, password, servertime, nonce)
		postdata['nonce'] = nonce
		postdata['servertime'] = servertime
		postdata['su']=su
		postdata['sp']=sp
		postdata['rsakv'] = self.prelogin['rsakv']
		self.pcid=self.prelogin['pcid']
		postdata['pcid']=self.prelogin['pcid']

		login_data = urllib.urlencode(postdata)
		res = self.session.open(self.loginUrl, login_data, time_out=5)
		con = res.read()
		retcode = con[con.find('retcode=')+8:con.find('&',con.find('retcode='))]
		print username+':'+password + ':' + retcode
		if retcode != '1':
			print 'login failed'
			print con
		return self.session

	def relogin(self, username, password, code):
		servertime=self.prelogin['servertime']
		pubkey=self.prelogin['pubkey']
		nonce=self.prelogin['nonce']
		su = base64.encodestring(urllib.quote(username))[:-1]
		servertime = servertime
		sp = self.sinaEncryptMsg(pubkey, password, servertime, nonce)
		postdata['su']=su
		postdata['sp']=sp
		postdata['door']=code

		login_data = urllib.urlencode(postdata)
		res = self.session.open(self.loginUrl, login_data, time_out=5)
		con = res.read()
		retcode = con[con.find('retcode=')+8:con.find('&',con.find('retcode='))]
		print username+':'+password + ':' + retcode
		if retcode != '1':
			print 'login failed'
		print con
		return self.session
