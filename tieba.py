import requests

headers = {'User-Agent': 'Mozilla/5.0'}
payload = {'fname':'\xe5\xa7\x9a\xe8\xb4\x9d\xe5\xa8\x9c',
	'tag':'\xe5\x93\x87\xe5\xa1\x9e',
	'tbs':'32d24f78e839ab761423061538',
	'fid': '122608',
	'ie': 'utf8'}
    
cookie={'TIEBA_USERTYPE':'cd2ee4aa8e615c57a4226d86',
    'bdshare_firstime':'1423056505469',
    'TIEBAUID':'72034c466349d1d83be1176a',
    'baidu_broswer_setup_kintaka':'0',
    'BAIDUID':'392EEE7F455713E9FC9992EC98375ED6FG=1',
    'GET_TOPIC':'16749505',
    'BDUSS':'FFZHhsUG8zdmRUaEJBV2NGdWJxLWx4QU1pdTlUaFROV0ZZZExrODNiYmx0dmxVQVFBQUFBJCQAAAAAAAAAAAEAAADBk~8Aa2ludGFrYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOUp0lTlKdJUfk'}

session = requests.Session()
for i in range(1,1000000):
        if(i%30==0):
                session.cookies.clear()
        res = session.post('http://tieba.baidu.com/coupon/vote/postVote',headers=headers,data=payload,cookies=cookie)
        print res.content
