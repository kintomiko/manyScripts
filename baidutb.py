import Loginer
import urllib, urllib2, cookielib, json

# msg = ['寂寞是因为思念谁',
# '随它吧',
# '中国梦',
# 'Beautiful Light',
# '至少还有你',
# '依爱',
# '也许明天',
# '自己',
# '也许在',
# '把握',
# 'dear friend',
# 'all by myself',
# '冬天里的一把火',
# '暗香',
# '我会再回来',
# '牵挂',
# 'memory',
# '矜持',
# '只要你过得比我好',
# 'Venus(现场版)',
# '重来',
# '不管有多苦',
# 'Girl On Fire',
# 'Bring Me to Life',
# '不唱情歌',
# '一掬热泪',
# '爱无反顾',
# '心火',
# '流浪记',
# '相见欢',
# '战争世界',
# '离不开你',
# '画情',
# '生命的河',
# '不聪明',
# '地球村',
# '草根',
# '惊鸿舞',
# '菩萨蛮',
# '山歌好比春江水',
# '相约中国节',
# '情人的眼泪',
# '采莲',
# '红颜劫',
# '金缕衣',
# '从头再来',
# '不一样的精彩',
# '东方之珠',
# '暖',
# '爱让我们成长',
# '我们的心在一起',
# '欢天喜地闹花灯',
# '连心',
# 'Ain\'t no sunshine',
# '日月凌空',
# '等待',
# '千百年后谁还记得谁',
# '当时',
# '飞鸟和鱼',
# '眷恋',
# '我记得你眼里的依恋',
# '彩云之恋',
# '总有一天',
# '何处觅英雄网盘',
# '秋萍之死',
# '蓝贝壳',
# '重逢',
# '踮起脚尖吻到爱',
# '爱与恨',
# '我要回家',
# '沧桑长痕',
# '情',
# '御龙吟',
# '今夜属于你',
# '追寻',
# '这里通向未来',
# '我要歌唱',
# '一起走到',
# '旗开得胜',
# '幸福',
# '阆中之恋',
# '冈拉梅朵',
# '萧红女声哼唱',
# '想念',
# '致母亲',
# '相亲相爱',
# '天净沙秋思',
# '梦幻刘三姐',
# '最美的爱',
# '中国 我为你歌唱',
# '百年同行',
# '世上哪有树缠藤',
# '倚天钦差之甘肃米案',
# '相约永恒',
# '中国之最',
# '目光',
# '倾海之恋',
# '生命之城',
# '昼夜乐',
# '彼岸',
# '浪漫的事',
# '诺言',
# '生死不离',
# '生命之恋',
# '回家',
# '大抉择',
# '一路笑着走',
# '花愿',
# '落雪',
# '青盲片尾哼唱',
# '你我的心一样年轻',
# '爱在七夕',
# '爱在哪边',
# '无字',
# '家有九凤',
# '爱如水中月',
# '一生情',
# '记忆',
# '死也不伤悲',
# '今生欠你一个拥抱',
# '我们住在同一个村庄',
# '我要你幸福',
# '来生还要做女人',
# '难舍天堂',
# '香飘云天',
# '幸福花开（又名马兰花）',
# '心愿',
# '美丽咒语',
# '女人不哭',
# '相信爱很美',
# '南歌子古戍',
# '北京OK',
# '我不告诉你',
# '感叹',
# '旅程',
# '手心手背',
# '蓝色诗意',
# '红军阿哥你慢慢走',
# '在那遥远的地方',
# '风雨缠绵',
# '把一切献给党',
# '回首望',
# '雨是天空的忧伤',
# '风吹竹叶',
# '风中花',
# '回家',
# '执着',
# '原谅',
# '眼睛',
# '天下有情人',
# '爱是什么',
# '一生相伴',
# '桃花雨',
# '月光满地',
# '永远还有多远',
# '爱不变',
# '红霞飞满天',
# '每个女人都想',
# '可以爱多久',
# '老地方',
# '风筝颂',
# '乱世佳人',
# '爱',
# '爱的拯救',
# '爱一个人可以爱多久',
# '爱在哪边',
# '暗伤',
# '把爱给你',
# '半个月亮半个家',
# '玻璃',
# '不再受伤',
# '唱给沱江',
# '唱支山歌给党听',
# '晨跑',
# '虫虫飞',
# '大爱无疆',
# '带你走溪口',
# '当一张报纸飘落在眼前',
# '等爱',
# '第一江山春好处',
# '丁香女孩',
# '东方之恋',
# '独上西楼',
# '断桥离情',
# '多情的土地',
# '二十年后再相会',
# '飞天',
# '飞越巅峰',
# '飞越光荣与梦想',
# '告诉世界',
# '格拉丹冬雪光',
# '还有爱',
# '孩子啊你不要哭',
# '海的心曲',
# '海风吹',
# '海蓝海蓝',
# '海洋之约',
# '好梦难圆',
# '和风欢歌',
# '和谐的日子',
# '黑',
# '红山为证',
# '红雪花',
# '花瓣雨纷纷',
# '怀念战友',
# '欢聚在一起',
# '记得我们有约',
# '家的港湾',
# '家有爹娘',
# '敬酒歌',
# '可以不可以',
# '渴望',
# '刻骨铭心',
# '孔雀',
# '来不及',
# '兰花花',
# '了了歌',
# '莲',
# '两个人的世界',
# '邻里谣',
# '龙船调(现场版)',
# '泸沽情思',
# '伦巴（俄语歌）',
# '马兰歌',
# '美丽的张家界',
# '美丽三亚 浪漫天涯',
# '梦和路',
# '梦里开的花',
# '梦圆太极湖',
# '牡丹花谱',
# '那时花开',
# '南国花儿艳',
# '南海边有一个美丽的地方',
# '你就是我',
# '你是我的四季',
# '你是我的天使',
# '你是月光里的海',
# '普陀情',
# '千万次的问',
# '牵着阳光的手',
# '琴声如诉',
# '青藏高原',
# '青春闪光',
# '情定武陵',
# '情归西西里',
# '让梦冬眠',
# '让世界没有尘埃',
# '人生四季',
# '如果我们没有遇见',
# '三峡的孩子',
# '生命之花',
# '士兵情怀',
# '手拉手',
# '水在天地间',
# '睡着了的云',
# '四季歌',
# '四面山之恋',
# '天边的雨花',
# '天歌',
# '天籁之声《家有九凤》',
# '天下平安',
# '天耀中华',
# '弯弯的月亮',
# '万里滔滔江水永不休',
# '忘记',
# '温暖上海',
# '文博会友',
# '问红尘',
# '我爱的男人',
# '我不想说',
# '我们的季节',
# '我是一朵小浪花',
# '我是一棵勒杜鹃',
# '我要的很简单',
# '我用所有报答爱',
# '无处躲雨',
# '梧桐烟雨',
# '相思放一旁',
# '香格里拉',
# '香蜜湖之恋',
# '向幸福出发',
# '小头发',
# '心如明月',
# '血流动，爱永远',
# '一个人听见全世界听见',
# '一路有你',
# '一切来自爱',
# '一生花',
# '一声忧伤（听）',
# '因为有你',
# '英文版《原谅》',
# '迎风飘扬的旗',
# '影子',
# '有这样一些人',
# '又忆江南',
# '与地球相爱吧',
# '与你同行',
# '玉女剑法',
# '原来我这么爱你',
# '原野牧歌',
# '月亮代表我的心(现场版)',
# '贞观长歌',
# '震不垮的爱',
# '只因为爱',
# '中国英雄',
# '竹翠梅香',
# '自娱自乐插曲',
# '走进大讲堂',
# '祖国 我的爱恋',
# '祖国，深圳对你说']

baidu = Loginer.HttpRequest()

baidu.post = urllib.urlencode({'staticpage':'http://tieba.baidu.com/tb/static-common/html/pass/v3Jump.html',
'charset':'UTF-8',
'tpl':'tb',
'subpro':'',
'apiver':'v3',
'tt':'1424355350404',
'codestring':'',
'safeflg':'0',
'u':'http://tieba.baidu.com/f?kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&ie=utf-8',
'isPhone':'',
'quick_user':'0',
'logintype':'dialogLogin',
'logLoginType':'pc_loginDialog',
'idc':'',
'loginmerge':'true',
'username':'kintaka',
'password':'daispeed',
'verifycode':'',
'mem_pass':'on',
'ppui_logintime':'28459',
'callback':'parent.bd__pcbs__6dxpkb'
})

baidu.url='https://passport.baidu.com/v2/api/?login'

baidu.header={'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
'Content-Type':'application/x-www-form-urlencoded',
'Origin':'http://tieba.baidu.com',
'Referer':'http://tieba.baidu.com/f?kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&ie=utf-8',
'User-Agent':'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/37.0.2062.120 Safari/537.36',
'X-DevTools-Emulate-Network-Conditions-Client-Id':'D3F2B3F3-9820-05C8-66CC-E23358254181'}

pincodeUrl='https://passport.baidu.com/cgi-bin/genimage?'

s = Loginer.Session()

s.open('http://tieba.baidu.com')

res = Loginer.post(s, baidu)