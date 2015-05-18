import hashlib
from Loginer import Session
import math, random
import os.path


codeDict = {'md5': []}

# pincodeUrl = 'http://login.sina.com.cn/cgi/pin.php'
pincodeUrl = 'https://kyfw.12306.cn/otn/passcodeNew/getPassCodeNew?module=login&rand=sjrand&0.6005673969630152'

repeatc = 0

codec = 0

s = Session()
fname='result.txt'

if os.path.isfile(fname):
	f = open(fname, 'r')
	repeatc = int(f.readline())
	codeDict = eval(f.read())
	codec = len(codeDict)-1+repeatc
	f.close()

for i in range(0, 5000):
	# res = s.open(pincodeUrl+'?r='+ str(int(math.floor(random.random()*1e8))) + '&s=0&p=' + 'ja-44aa0749809a6996db30c1280881c98e3d10')
	try:
		res = s.open(pincodeUrl, time_out=15)
		img = res.read()
		codec+=1
		md5=hashlib.md5(img).hexdigest()

		arr = codeDict.get(md5)
		if not arr:
			arr = []
		else:
			print 'found repeat! count: ' + str(repeatc) 
			repeatc += 1

		filename = str(codec)+'.jpg'
		arr.append(filename)
		codeDict[md5] = arr

		f = open('./img/'+filename, 'wb')
		print >> f, img
		f.close()
	except:
		print 'error'

f=open('result.txt', 'w')
print >>f, repeatc
print >>f, codeDict
f.close()