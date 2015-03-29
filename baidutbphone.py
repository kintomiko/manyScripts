# -*- coding:UTF-8 -*-
import Loginer, time, random
import urllib, urllib2, cookielib, json
import hashlib

msg = ['新年好姚贝娜',
'我爱女神姚贝娜不解释！！！',
'希望她的路越走越好;姚贝娜我爱你',
'希望听到她更多的歌;姚贝娜我爱你',
'姚如意要如意！你是我女神！',
'顶级实力唱将姚贝娜！你是我女神！',
'真是艺术享受姚贝娜！你是我女神！',
'最爱的是你姚贝娜！你是我女神！',
'走自己的路，回头一看都是浮云,姚贝娜',
'天籁公主啊！姚贝娜你是我女神！',
'你是全能歌手！姚贝娜你是我女神！',
'姚贝娜, 打算走过彩云之南，泸沽情思，然后青藏高原，寻找冈拉梅朵。',
'锲而不舍，佩服佩服,姚贝娜我爱你',
'希望听到她姚贝娜更多的歌;希望你取得更好的成绩，',
'姚贝娜, 这儿因为有你们而精彩',
'姚贝娜, 娜个人，娜些年，娜种声音，娜样的动听。',
'姚贝娜天耀中华！佑我中华',
'姚贝娜，好样的！！',
'姚贝娜我们一起去旅游吧！',
'姚贝娜【天耀中华】一首磅礴大气的好歌，',
'姚贝娜这一生情感注定为娜娜牵挂',
'姚贝娜寂寞是因为思念谁',
'随它吧',
'中国梦',
'Beautiful Light',
'至少还有你',
'依爱',
'也许明天',
'自己',
'也许在',
'把握',
'dear friend',
'all by myself',
'冬天里的一把火',
'暗香',
'我会再回来',
'牵挂',
'memory',
'矜持',
'只要你过得比我好',
'Venus(现场版)',
'重来',
'不管有多苦',
'Girl On Fire',
'Bring Me to Life',
'不唱情歌',
'一掬热泪',
'爱无反顾',
'心火',
'流浪记',
'相见欢',
'战争世界',
'离不开你',
'画情',
'生命的河',
'不聪明',
'地球村',
'草根',
'惊鸿舞',
'菩萨蛮',
'山歌好比春江水',
'相约中国节',
'情人的眼泪',
'采莲',
'红颜劫',
'金缕衣',
'从头再来',
'不一样的精彩',
'东方之珠',
'暖',
'爱让我们成长',
'我们的心在一起',
'欢天喜地闹花灯',
'连心',
'Ain\'t no sunshine',
'日月凌空',
'等待',
'千百年后谁还记得谁',
'当时',
'飞鸟和鱼',
'眷恋',
'我记得你眼里的依恋',
'彩云之恋',
'总有一天',
'何处觅英雄网盘',
'秋萍之死',
'蓝贝壳',
'重逢',
'踮起脚尖吻到爱',
'爱与恨',
'我要回家',
'沧桑长痕',
'情',
'御龙吟',
'今夜属于你',
'追寻',
'这里通向未来',
'我要歌唱',
'一起走到',
'旗开得胜',
'幸福',
'阆中之恋',
'冈拉梅朵',
'萧红女声哼唱',
'想念',
'致母亲',
'相亲相爱',
'天净沙秋思',
'梦幻刘三姐',
'最美的爱',
'中国 我为你歌唱',
'百年同行',
'世上哪有树缠藤',
'倚天钦差之甘肃米案',
'相约永恒',
'中国之最',
'目光',
'倾海之恋',
'生命之城',
'昼夜乐',
'彼岸',
'浪漫的事',
'诺言',
'生死不离',
'生命之恋',
'回家',
'大抉择',
'一路笑着走',
'花愿',
'落雪',
'青盲片尾哼唱',
'你我的心一样年轻',
'爱在七夕',
'爱在哪边',
'无字',
'家有九凤',
'爱如水中月',
'一生情',
'记忆',
'死也不伤悲',
'今生欠你一个拥抱',
'我们住在同一个村庄',
'我要你幸福',
'来生还要做女人',
'难舍天堂',
'香飘云天',
'幸福花开（又名马兰花）',
'心愿',
'美丽咒语',
'女人不哭',
'相信爱很美',
'南歌子古戍',
'北京OK',
'我不告诉你',
'感叹',
'旅程',
'手心手背',
'蓝色诗意',
'红军阿哥你慢慢走',
'在那遥远的地方',
'风雨缠绵',
'把一切献给党',
'回首望',
'雨是天空的忧伤',
'风吹竹叶',
'风中花',
'回家',
'执着',
'原谅',
'眼睛',
'天下有情人',
'爱是什么',
'一生相伴',
'桃花雨',
'月光满地',
'永远还有多远',
'爱不变',
'红霞飞满天',
'每个女人都想',
'可以爱多久',
'老地方',
'风筝颂',
'乱世佳人',
'爱',
'爱的拯救',
'爱一个人可以爱多久',
'爱在哪边',
'暗伤',
'把爱给你',
'半个月亮半个家',
'玻璃',
'不再受伤',
'唱给沱江',
'唱支山歌给党听',
'晨跑',
'虫虫飞',
'大爱无疆',
'带你走溪口',
'当一张报纸飘落在眼前',
'等爱',
'第一江山春好处',
'丁香女孩',
'东方之恋',
'独上西楼',
'断桥离情',
'多情的土地',
'二十年后再相会',
'飞天',
'飞越巅峰',
'飞越光荣与梦想',
'告诉世界',
'格拉丹冬雪光',
'还有爱',
'孩子啊你不要哭',
'海的心曲',
'海风吹',
'海蓝海蓝',
'海洋之约',
'好梦难圆',
'和风欢歌',
'和谐的日子',
'黑',
'红山为证',
'红雪花',
'花瓣雨纷纷',
'怀念战友',
'欢聚在一起',
'记得我们有约',
'家的港湾',
'家有爹娘',
'敬酒歌',
'可以不可以',
'渴望',
'刻骨铭心',
'孔雀',
'来不及',
'兰花花',
'了了歌',
'莲',
'两个人的世界',
'邻里谣',
'龙船调(现场版)',
'泸沽情思',
'伦巴（俄语歌）',
'马兰歌',
'美丽的张家界',
'美丽三亚 浪漫天涯',
'梦和路',
'梦里开的花',
'梦圆太极湖',
'牡丹花谱',
'那时花开',
'南国花儿艳',
'南海边有一个美丽的地方',
'你就是我',
'你是我的四季',
'你是我的天使',
'你是月光里的海',
'普陀情',
'千万次的问',
'牵着阳光的手',
'琴声如诉',
'青藏高原',
'青春闪光',
'情定武陵',
'情归西西里',
'让梦冬眠',
'让世界没有尘埃',
'人生四季',
'如果我们没有遇见',
'三峡的孩子',
'生命之花',
'士兵情怀',
'手拉手',
'水在天地间',
'睡着了的云',
'四季歌',
'四面山之恋',
'天边的雨花',
'天歌',
'天籁之声《家有九凤》',
'天下平安',
'天耀中华',
'弯弯的月亮',
'万里滔滔江水永不休',
'忘记',
'温暖上海',
'文博会友',
'问红尘',
'我爱的男人',
'我不想说',
'我们的季节',
'我是一朵小浪花',
'我是一棵勒杜鹃',
'我要的很简单',
'我用所有报答爱',
'无处躲雨',
'梧桐烟雨',
'相思放一旁',
'香格里拉',
'香蜜湖之恋',
'向幸福出发',
'小头发',
'心如明月',
'血流动，爱永远',
'一个人听见全世界听见',
'一路有你',
'一切来自爱',
'一生花',
'一声忧伤（听）',
'因为有你',
'英文版《原谅》',
'迎风飘扬的旗',
'影子',
'有这样一些人',
'又忆江南',
'与地球相爱吧',
'与你同行',
'玉女剑法',
'原来我这么爱你',
'原野牧歌',
'月亮代表我的心(现场版)',
'贞观长歌',
'震不垮的爱',
'只因为爱',
'中国英雄',
'竹翠梅香',
'自娱自乐插曲',
'走进大讲堂',
'祖国 我的爱恋',
'祖国，深圳对你说'];

def changeContent(post, content):
	code='tiebaclient!!!'
	r={}
	for s in post.split('&'):
		r[s.split('=')[0]]=s.split('=')[1]
	if r.get('sign'):del r['sign']
	if r.get('_timestamp'):del r['_timestamp']
	if r.get('_client_id'):del r['_client_id']
	if r.get('m_cost'):del r['m_cost']
	if r.get('m_size_u'):del r['m_size_u']
	if r.get('m_size_d'):del r['m_size_d']
	r['content']=content.decode('utf8').encode('utf8')
	keys = r.keys()
	res = ''
	keys.sort()
	for k in keys:
		res+=k+'='+urllib.unquote(r[k])
	res+=code
		
	r['sign']=str(sign)
	return urllib.urlencode(r).replace('%25','%')

baidu1 = Loginer.HttpRequest()

baidu1.url='http://c.tieba.baidu.com/c/c/post/add'

baidu1.header={'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Content-Type':'application/x-www-form-urlencoded; charset=utf-8',
'Host':'c.tieba.baidu.com',
'sid': '6107c188d6407cb1',
'Connection': 'close',
'net': '1',
'Cookie': 'IS_NEW_USER=b0769614d7614b44ec6612d8; TIEBA_USERTYPE=8d41a7df44bc8277a74ea82c; TIEBAUID=8ffe8aebb71ebf20c8fcc6d5; BAIDU_WISE_UID=wapp_1424282071721_132; BAIDUID=F152EF7497D3027B7B3B0F8523A3A0C3:FG=1; BDUSS=kwZGpmMjd6flFoY2tlZWRzOTBuMkJpQVlmWmRVQzBFN1NBM0thTHdUdDU4QlZWQVFBQUFBJCQAAAAAAAAAAAEAAABvIgABa2luZXJpa28AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHlj7lR5Y-5UbF; PLUS=1; plus_lsv=9c948a631e4e15da'
}
post1 = 'BDUSS=kwZGpmMjd6flFoY2tlZWRzOTBuMkJpQVlmWmRVQzBFN1NBM0thTHdUdDU4QlZWQVFBQUFBJCQAAAAAAAAAAAEAAABvIgABa2luZXJpa28AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHlj7lR5Y-5UbF&_timestamp=1424916863676&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=589&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%88%91%E8%84%91%E6%AE%8B%E6%88%91%E5%BF%AB%E4%B9%90%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C%E6%88%91%E7%88%B1%E4%BD%A0&from=appstore&tbs=d2ba0121c8aa76961424909177&m_api=c%2Fc%2Fpost%2Fadd&m_cost=1448.974967&st_param=pb&m_logid=788465194&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1433&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=5312E950DE46A0DC4F0318B832597015&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=868475&net_type=1'
post2 = 'BDUSS=p-OWVla2dtTkxHSE1BSEJydHJZTmlRNVpuUUFLelhteUpiZnJuNDRjanZpUTVWQVFBQUFBJCQAAAAAAAAAAAEAAACYjP8Aa2luaGlybwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO%7E85lTv%7EOZURH&_timestamp=1424917746455&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=250&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%88%91%E5%BC%B1%E6%95%85%E6%88%91%E6%99%BA%EF%BC%8C%E6%88%91%E6%99%BA%E6%95%85%E6%88%91%E9%9A%9C%EF%BC%8C%E5%95%A6%E5%95%A6%E5%95%A6%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C%E6%98%AF%E6%9C%80%E5%A5%BD%E7%9A%84&from=appstore&tbs=952951c1d59b9feb1424424176&m_api=c%2Fs%2Flogtogether%3Fcmd%3D303101&m_cost=966.742992&st_param=pb&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1468&sign=D6A52E17D969CD7F5B3E50A447514E97&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&net_type=1&floor=870241'
# baidu2.post='BDUSS=p-OWVla2dtTkxHSE1BSEJydHJZTmlRNVpuUUFLelhteUpiZnJuNDRjanZpUTVWQVFBQUFBJCQAAAAAAAAAAAEAAACYjP8Aa2luaGlybwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAO%7E85lTv%7EOZURH&content=%E6%88%91%E5%BC%B1%E6%95%85%E6%88%91%E6%99%BA%EF%BC%8C%E6%88%91%E6%99%BA%E6%95%85%E6%88%91%E9%9A%9C%EF%BC%8C%E5%95%A6%E5%95%A6%E5%95%A6%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C%E6%98%AF%E6%9C%80%E5%A5%BD%E7%9A%84&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&fid=122608&tid=3588231003&brand=iPhone&tbs=952951c1d59b9feb1424424176'
post3 = 'BDUSS=lEUjNReHJ4eUJzUkRDdU9OUX5qS2pLTXJQTDdDalBMUEFwLUdGNWtKOXRFaFpWQVFBQUFBJCQAAAAAAAAAAAEAAACtlAhfa2luZGFpMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG2F7lRthe5UUG&_timestamp=1424924473069&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=7124&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E5%A6%82%E4%BD%95&from=appstore&tbs=8ea497171f8ac5c61424917870&m_api=c%2Fs%2Fsync&m_cost=1313.283980&st_param=pb&m_logid=1254068058&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1254&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=EB398E14967636A5221083A43BA478D6&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=879821&net_type=1'
post4 = 'BDUSS=HQ5bExlME1WT1FOV3NCbDBpM0tMZ0pGNWQ0NENPc09qRHoxUko1YjQ1R2NMQlpWQVFBQUFBJCQAAAAAAAAAAAEAAADSswpfa2ludG9taWtvMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJyf7lScn-5UO&_timestamp=1424924603694&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=2606&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E5%A7%9A%E8%B4%9D%E5%A8%9C%E6%98%AF%E5%A5%BD%E6%A0%B7%E7%9A%84&from=appstore&tbs=163cb2bf03ff6fe31424924577&m_api=c%2Ff%2Fforum%2Fforumrecommend%3Fcmd%3D303011&m_cost=660.715044&st_param=pb&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1323&sign=0A10438EE3998A16ECA0AACE9A16639F&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=880042&net_type=1'
post5 = 'BDUSS=kxvTVJvZm1NU3BYRndTZkp3OH5PYjRORUZyTmQ5akNWV2NDakNQMTdKRC1MQlpWQVFBQUFBJCQAAAAAAAAAAAEAAADJDT9fa2luYmVsbGEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP6f7lT-n-5UY&_timestamp=1424924699451&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=657&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E7%A5%9E%E5%8A%9F%E9%99%84%E4%BD%93%EF%BC%81&from=appstore&tbs=6643aaaf6b8b58451424924671&m_api=c%2Fc%2Fforum%2Fsign&m_cost=726.418018&st_param=pb&m_logid=1479874550&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1305&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=F86BCBDBEBEADB7C454A5B77F16F4305&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=880216&net_type=1'

post6 = 'BDUSS=JIZEk2ZVJQLTU0d1VQOWJ4TzZoQWd2eXc5QWNONXZmVXFvTjlWfmRUS1lYeFpWQVFBQUFBJCQAAAAAAAAAAAEAAABEkoxfa2lucnlvOTI2AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJjS7lSY0u5UWG&_timestamp=1424937658961&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=613&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%94%AF%E6%8C%81%E5%A7%9A%E8%B4%9D%E5%A8%9C&from=appstore&tbs=69632ea78c65bc6a1424937625&m_api=c%2Fc%2Fforum%2Flike&m_cost=904.519022&st_param=pb&m_logid=37069812&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1329&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=F5FC323EB8E99B70565E13C8FA572E6D&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=901392&net_type=1'
post7 = 'BDUSS=FQ2aTF4Ni04UzVUR28yOW9hRWxzQzBkQlQwSUNFYUEyOURIa3NKN0xPLUhZQlpWQVFBQUFBJCQAAAAAAAAAAAEAAACv3Yxfa2ludGV0c3U5MjYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAIfT7lSH0-5UT&_timestamp=1424937893679&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=614&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E5%A7%9A%E8%B4%9D%E5%A8%9C%E5%A5%BD%E6%A0%B7%E7%9A%84%EF%BC%81&from=appstore&tbs=5d19c5c1baa9111d1424937864&m_api=c%2Fc%2Fforum%2Flike&m_cost=546.954989&st_param=pb&m_logid=274683953&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1330&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=2F4F3A474E0744B5F0F6746E605DC8C8&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=901785&net_type=1'
post8 = 'BDUSS=8zSXN4T1FUTlNjLVV3MUtkelc1WURueXJLM0g3QWtTUnFhWEo0WEpyaEVZUlpWQVFBQUFBJCQAAAAAAAAAAAEAAABZD41fa2luaHlkZQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAETU7lRE1O5UR2&_timestamp=1424938082866&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=613&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E5%93%87%E5%A1%9E%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C%EF%BC%81&from=appstore&tbs=ffab79cc91a9fd871424938053&m_api=c%2Fc%2Fforum%2Flike&m_cost=495.009005&st_param=pb&m_logid=463179965&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1330&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=FCD99955D43F80B827AE73844661659C&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=902204&net_type=1'
post9 = 'BDUSS=2U2eW9GOGJ1aHZIQUw2dW5zZDRYYXhXS0U0OExHdkNhVTU4d3N4Z3JOYXhYUHhVQVFBQUFBJCQAAAAAAAAAAAEAAADBk%7E8Aa2ludGFrYQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAALHP1FSxz9RUQ&_timestamp=1424938221770&_phone_newimei=E926FE1A2DA82E82C06770E36490F5F1&m_size_d=1030&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E926FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E5%A7%9A%E8%B4%9D%E5%A8%9C%E4%BD%A0%E6%98%AF%E6%9C%80%E6%9C%80%E6%9C%80%E6%9C%80%E6%9C%80%E5%A5%BD%E7%9A%84&from=appstore&tbs=2999bbe12cd136391423273661&m_api=c%2Ff%2Fforum%2Fforumrecommend%3Fcmd%3D303011&m_cost=1401.042998&st_param=pb&m_logid=599729061&_phone_imei=E926FE1A2DA82E82C06770E36490F5F1&m_size_u=1254&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=B6C9F9C9A79888B04C83954B5400112F&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=902512&net_type=1'
post10 = 'BDUSS=kt4TklqOUdsVXlBVEFZZE41c3dRNEJXZnNvNXNPa29GU0RNMlBWVXNjRkJaaFpWQVFBQUFBJCQAAAAAAAAAAAEAAAAldI1fa2lubmFnYW8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEHZ7lRB2e5Ue&_timestamp=1424939356002&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=424&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%94%AF%E6%8C%81%E4%BD%A0%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C%EF%BC%81&from=appstore&tbs=6376bdc2c237724d1424939330&m_api=c%2Fu%2Fuser%2Fprofile%3Fcmd%3D303012&m_cost=1286.736965&st_param=pb&m_logid=1732078308&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1258&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=48B663EA2F766CD0029F161A28C076E6&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=904934&net_type=1'
post11 = 'BDUSS=XZZZUtZclZXYVVxZEpZSE90LVU3MzNTfkpHUmVqMy1sanZiaVpTQlpTLW9aaFpWQVFBQUFBJCQAAAAAAAAAAAEAAADOlo1fa2lubWF0c3Vtb3RvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKjZ7lSo2e5Ub&_timestamp=1424939464425&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=440&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%94%AF%E6%8C%81%E4%BD%A0%EF%BC%8C%E6%B0%B8%E8%BF%9C%E6%94%AF%E6%8C%81%E5%A7%9A%E8%B4%9D%E5%A8%9C&from=appstore&tbs=b89f985c73c662b01424939433&m_api=c%2Fu%2Fuser%2Fprofile%3Fcmd%3D303012&m_cost=1022.696018&st_param=pb&m_logid=1834060432&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1258&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=7E88C7A60D1D9C6A78D923689E4072C6&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=905161&net_type=1'
post12 = 'BDUSS=gzMUdvbEhkVFZ2YU8tUG80dlVRR1g3OVczbzNoQVhuSXFNMnNDQ2FxSi1aeFpWQVFBQUFBJCQAAAAAAAAAAAEAAADeko1fa2luanVuMDEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH7a7lR-2u5UNF&_timestamp=1424939678238&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=657&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%B0%B8%E8%BF%9C%E6%94%AF%E6%8C%81%E4%BD%A0%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C&from=appstore&tbs=420465bff78b1f4d1424939647&m_api=c%2Fc%2Fforum%2Fsign&m_cost=804.386020&st_param=pb&m_logid=2060452008&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1299&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=E7D9E60DB597F8F9711C31429BBFAA95&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=905644&net_type=1'
post13='BDUSS=1R6V1REc28tbXgweHRtcEwtNWhHanQ5bm1Wbzc4MEgwWXdBVGZkcTAyZ2dnUlpWQVFBQUFBJCQAAAAAAAAAAAEAAACT549fa2luZGFpdG9taWtvAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACD07lQg9O5UY&_timestamp=1424946251848&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=656&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%8C%81%E6%94%AF%E6%8C%81%E5%A7%9A%E8%B4%9D%E8%B4%9D%E8%B4%9D&from=appstore&tbs=21b9367a00f4d0451424946209&m_api=c%2Fc%2Fforum%2Fsign&m_cost=720.326006&st_param=pb&m_logid=1426342288&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1316&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=4A9040B3945F55D8D7584C6250499A23&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=919020&net_type=1'
post14='BDUSS=DdoYm52SzV0QVdEMHliUGV3VUJ5Vm0xaVhqWkFVSktFaERDM21YaFZzVn5nUlpWQVFBQUFBJCQAAAAAAAAAAAEAAABFy5Bfa2luZGFpYmVsbGEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAH%7E07lR%7E9O5UW&_timestamp=1424946334544&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=655&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E6%88%91%E6%94%AF%E6%8C%81%EF%BC%8C%E6%88%91%E6%94%AF%E6%8C%81%EF%BC%8C%E5%90%83%E9%A5%AD%E4%BA%86%EF%BC%8C%E5%A7%9A%E8%B4%9D%E5%A8%9C&from=appstore&tbs=1f2bf5749123931a1424946304&m_api=c%2Fc%2Fforum%2Fsign&m_cost=714.483976&st_param=pb&m_logid=1513112839&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1320&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=01D8F54944E4C3331D99612CB1BE9A72&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=919179&net_type=1'
post15='BDUSS=VMeDc0aGxrbnhBSWUwYVcxZDNUWmxpTTdmMXlWR29jazZuQlk2Vi1VdllnUlpWQVFBQUFBJCQAAAAAAAAAAAEAAAC90S04S2ludG9taWtvZGFpAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANj07lTY9O5Udl&_timestamp=1424946419572&_phone_newimei=E914FE1A2DA82E82C06770E36490F5F1&m_size_d=656&tid=3588231003&brand=iPhone&_client_version=6.6.0&cuid=E914FE1A2DA82E82C06770E36490F5F1&_os_version=8.1.1&fid=122608&_client_id=wappc_1423273658646_48&_client_type=1&is_location=1&new_vcode=1&content=%E4%BB%8A%E6%99%9A%E5%90%83%E7%BA%A2%E7%83%A7%E8%82%89%E5%95%8A%E5%A7%9A%E8%B4%9D%E5%A8%9C&from=appstore&tbs=314cc8aaae5822fe1424946393&m_api=c%2Fc%2Fforum%2Fsign&m_cost=717.172980&st_param=pb&m_logid=1601003683&_phone_imei=E914FE1A2DA82E82C06770E36490F5F1&m_size_u=1315&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&sign=EBFC9BE8327D086B9B0A45544AD73538&vcode_tag=11&brand_type=iPhone%204S&anonymous=0&is_addition=0&floor=919368&net_type=1'
post=[]

post.append(post1)
post.append(post2)
post.append(post3)
post.append(post4)
post.append(post5)
post.append(post6)
post.append(post7)
post.append(post8)
post.append(post9)
post.append(post10)
post.append(post11)
post.append(post12)
post.append(post13)
post.append(post14)
post.append(post15)

s = Loginer.Session()
def getContent():
	return msg[int(random.random()*len(msg))]+';'+msg[int(random.random()*20)]+';'+msg[int(random.random()*len(msg))]+';'+msg[int(random.random()*20)]+';'+msg[int(random.random()*len(msg))]

count=5

while 1:
	baidu1.post=changeContent(post[int(random.random()*len(post))], getContent())
	res = Loginer.post(s, baidu1)
	print res.read()
	time.sleep(int(random.random()*90/len(post)))
	# for i in range(len(post)):
	# 	for j in range(count):
	# 		baidu1.post=changeContent(post[(i+j)%len(post)], getContent())
	# 		res = Loginer.post(s, baidu1)
	# 		print res.read()
	# 		time.sleep(0.3)
	# 	time.sleep(int(random.random()*80/(len(post)-count)))
