import requests

headers = {'User-Agent': 'Mozilla/5.0'}
session = requests.Session()
for i in range(1,1000000):
	if(i%10==0):
		session.cookies.clear()
	res = session.get('http://open.onebox.haosou.com/api/dovote?key=%E5%A7%9A%E8%B4%9D%E5%A8%9C&type=relation_hits_side&src=onebox&tpl=0&callback=jsonp6',headers=headers)
	print res.content
