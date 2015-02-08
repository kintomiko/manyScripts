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

sinalogin = SinaLogin()

retcode = sinalogin.login('kintomiko@hotmail.com', 'daispeed', is_proxy=False)

f = open('code.jpg','w')
res = session.open(pipUrl + '?r='+ str(int(math.floor(random.random()*1e8))) + '&s=0&p=' + sinalogin.pcid)
print >>f, res.read()
f.close()

import Image
im = Image.open('code.jpg')

session = sinalogin.relogin('ourtomiko@gmail.com', 'xxx')


removeHeaderItem(session.opener, 'Referer')
session.opener.addheaders.append(('Referer', 'http://ent.sina.com.cn/f/y/dffyb2015/index.shtml'))
res = session.open(pollUrl, urllib.urlencode(payload))

removeHeaderItem(sinalogin.session.opener, 'Referer')
removeHeaderItem(sinalogin.session.opener, 'Content-Type')
removeHeaderItem(sinalogin.session.opener, 'X-Requested-With')
removeHeaderItem(sinalogin.session.opener, 'Host')
removeHeaderItem(sinalogin.session.opener, 'Origin')
sinalogin.session.opener.addheaders.append(('Referer', 'http://weibo.com/u/1268252377?topnav=1&wvr=6&topsug=1'))
sinalogin.session.opener.addheaders.append(('Host', 'weibo.com'))
sinalogin.session.opener.addheaders.append(('Origin', 'http://weibo.com'))
sinalogin.session.opener.addheaders.append(('Content-Type','application/x-www-form-urlencoded'))
sinalogin.session.opener.addheaders.append(('X-Requested-With','XMLHttpRequest'))

res = sinalogin.session.open(getFlowerUrl+str(int(time.time()*1e3)), urllib.urlencode(floweradd_data))

removeHeaderItem(sinalogin.session.opener, 'Referer')
sinalogin.session.opener.addheaders.append(('Referer', 'http://club.starvip.weibo.com/plugin?sid=1268252377&ru=http://www.weibo.com/u/1268252377?topnav=1&wvr=6&topsug=1'))
removeHeaderItem(sinalogin.session.opener, 'Content-Type')
removeHeaderItem(sinalogin.session.opener, 'X-Requested-With')
removeHeaderItem(sinalogin.session.opener, 'Host')
removeHeaderItem(sinalogin.session.opener, 'Origin')
sinalogin.session.opener.addheaders.append(('Host', 'club.starvip.weibo.com'))
sinalogin.session.opener.addheaders.append(('Origin', 'http://club.starvip.weibo.com'))
sinalogin.session.opener.addheaders.append(('Content-Type','application/x-www-form-urlencoded'))
sinalogin.session.opener.addheaders.append(('X-Requested-With','XMLHttpRequest'))


res = sinalogin.session.open(sendFlowerUrl+str(int(time.time()*1e3)), urllib.urlencode(flowersend_data))
