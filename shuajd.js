function test(){
	d = new Date()
	if(d.getHours()==23 && d.getMinutes()>55)
		window.flag = true
	if(window.flag){
		$.getJSON('http://p.3.cn/prices/get?skuid=J_1093503&type=1&area=18_1482_1485_0&_=1428323089105',function(json){
			a = json.pop()
			if(a.p<2200)
				window.location.href='http://gate.jd.com/InitCart.aspx?pid=1093503&pcount=1&ptype=1'
		})
	}
	setTimeout(test, 200)
}

test()