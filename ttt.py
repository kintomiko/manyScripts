import requests

headers = {'User-Agent': 'Mozilla/5.0'}
payload = {'id':16,'type':'geshou'}

session = requests.Session()
for i in range(1,1000000):
	if(i%30==0):
		session.cookies.clear()
	res = session.post('http://newyear.music.163.com/web/activity/vote/toupiao',headers=headers,data=payload)
	if res.json()['msg']!= None:
		print res.json()['msg'].encode('utf8')
