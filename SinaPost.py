import urllib, urllib2, json, base64, rsa, time, binascii, random
import cookielib
import re
import hashlib
from Loginer import Session
from SinaLogin import SinaLogin
import math

pollUrl = 'http://survey.ent.sina.com.cn/polling.php'

getFlowerUrl = 'http://weibo.com/p/aj/proxy?api=http://club.starvip.weibo.com/aj/openfansclub&__rnd='

sendFlowerUrl = 'http://club.starvip.weibo.com/aj/freefloweruse?__rnd='

def removeHeaderItem(opener, name):
	a = opener.addheaders
	for i in range(0,len(a)-1):
		if a[i][0] == name:
			del a[i]

def resetHeaderItem(opener, name, value):
	removeHeaderItem(opener, name)
	opener.addheaders.append((name, value))


payload={
	'q_8674[]':'59933',
	'q_8674[]':'59945',
	'poll_id':'106946',
	'ad_url':'',
	'x':'40',
	'y':'8'
}

floweradd_data = {
	'type': 'freefloweradd',
	'from': '1',
	'sid': '1268252377',
	'_t': '0'
}

flowersend_data = {
	'sid':'1268252377',
	'num':'1',
	'isShare': '0',
	'_t':'0'
}

# sinalogin = SinaLogin()

# retcode = sinalogin.login('kintomiko@hotmail.com', 'daispeed', is_proxy=False)

def getFlower(sinalogin):
	resetHeaderItem(sinalogin.session.opener, 'Referer', 'http://weibo.com/u/1268252377?topnav=1&wvr=6&topsug=1')
	resetHeaderItem(sinalogin.session.opener, 'Content-Type', 'application/x-www-form-urlencoded')
	resetHeaderItem(sinalogin.session.opener, 'X-Requested-With', 'XMLHttpRequest')
	resetHeaderItem(sinalogin.session.opener, 'Host', 'weibo.com')
	resetHeaderItem(sinalogin.session.opener, 'Origin', 'http://weibo.com')
	resetHeaderItem(sinalogin.session.opener, 'Accept', '*/*')
	resetHeaderItem(sinalogin.session.opener, 'Connection', 'keep-alive')
	res = sinalogin.session.open(getFlowerUrl+str(int(time.time()*1e3)), urllib.urlencode(floweradd_data))
	try:
		a = eval(res.read())
	except:
		return 'failed'
	return a['code']

def sendFlower(sinalogin):
	resetHeaderItem(sinalogin.session.opener, 'Referer', 'http://club.starvip.weibo.com/plugin?sid=1268252377&ru=http://www.weibo.com/u/1268252377?topnav=1&wvr=6&topsug=1')
	resetHeaderItem(sinalogin.session.opener, 'Content-Type','application/x-www-form-urlencoded')
	resetHeaderItem(sinalogin.session.opener, 'X-Requested-With','XMLHttpRequest')
	resetHeaderItem(sinalogin.session.opener, 'Host', 'club.starvip.weibo.com')
	resetHeaderItem(sinalogin.session.opener, 'Origin', 'http://club.starvip.weibo.com')
	res = sinalogin.session.open(sendFlowerUrl+str(int(time.time()*1e3)), urllib.urlencode(flowersend_data))
	try:
		a = eval(res.read())
	except:
		return 'failed'
	return a['code']

def poll():
	removeHeaderItem(session.opener, 'Referer')
	session.opener.addheaders.append(('Referer', 'http://ent.sina.com.cn/f/y/dffyb2015/index.shtml'))
	res = session.open(pollUrl, urllib.urlencode(payload))

