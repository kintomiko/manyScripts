
function test(){
xhr = new XMLHttpRequest()
xhr.open('get', 'http://rs.ewang.com/fengyun/tou.php?bangid=0001&cid=0002700001&jiangid=0010&piao=0.111111111111111111111111111111111111111111&time=1427880822&userid=000443241&sig=58ff09e25237ce2ac1dd442326022454')
xhr.send()
setTimeout(test, 50);
}

test()

bangid=0001&cid=0002700001&jiangid=0010&piao=0.111111111111111111111111111111111111111111&sigkey=552005733561b&time=1427880822&userid=000443241&sig=fa668c560e713635be23d3e1107d902f

