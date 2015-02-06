import urllib, urllib2, json, base64, rsa, time, binascii, random
import cookielib
import re
import hashlib
from Loginer import Session
from SinaLogin import SinaLogin
import math

pollUrl = 'http://survey.ent.sina.com.cn/polling.php'
pipUrl = 'http://login.sina.com.cn/cgi/pin.php'
payload={
	'q_8674[]':'59985',
	'q_8674[]':'59945',
	'poll_id':'106946',
	'ad_url':'',
	'x':'40',
	'y':'8'
}

sinalogin = SinaLogin()

session = sinalogin.login('ourtomiko@gmail.com', 'xxx', is_proxy=False)

f = open('code.jpg','w')
res = session.open(pipUrl + '?r='+ str(int(math.floor(random.random()*1e8))) + '&s=0&p=' + sinalogin.pcid)
print >>f, res.read()
f.close()

import Image
im = Image.open('/home/kin/Pictures/smdh.jpg')

session = sinalogin.relogin('ourtomiko@gmail.com', 'xxx')
session.opener.addheaders.append(('Referer', 'http://ent.sina.com.cn/f/y/dffyb2015/index.shtml'))
res = session.open(pollUrl, urllib.urlencode(payload))