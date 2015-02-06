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

session = sinalogin.login('yuanlin1110@gmail.com', 'daispeed')

f = open('code.jpg','w')
res = session.open(pipUrl + '?r='+ str(int(math.floor(random.random()*1e8))) + '&s=0&p=' + sinalogin.pcid)
print >>f, res.read()
f.close()

session = sinalogin.relogin('yuanlin1110@gmail.com', 'daispeed')

res = session.open(pollUrl, urllib.urlencode(payload))