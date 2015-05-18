var eids = ['新年好','我爱女神姚贝娜不解释！！！','希望她的路越走越好;姚贝娜我爱你','希望听到她更多的歌;姚贝娜我爱你','姚如意要如意！你是我女神！','顶级实力唱将！你是我女神！','真是艺术享受！你是我女神！','最爱的是你！你是我女神！','走自己的路，回头一看都是浮云','天籁公主啊！你是我女神！','你是全能歌手！你是我女神！','打算走过彩云之南，泸沽情思，然后青藏高原，寻找冈拉梅朵。','锲而不舍，佩服佩服,姚贝娜我爱你','希望听到她更多的歌;希望你取得更好的成绩，','这儿因为有你们而精彩','娜个人，娜些年，娜种声音，娜样的动听。','天耀中华！佑我中华','姚贝娜，好样的！！','我们一起去旅游吧！','【天耀中华】一首磅礴大气的好歌，','这一生情感注定为娜娜牵挂'];
var ttid = PageData.tbs;
function test() {
    $.ajax({
            type:'POST',
            url:'/f/commit/post/add',
            data:'ie=utf-8&kw=%E5%A7%9A%E8%B4%9D%E5%A8%9C&fid=122608&tid=3588231003&rich_text=1&tbs='+ ttid +'&lp_type=1&lp_sub_type=2&content='+ eids[Math.round(Math.random()*20)] + eids[Math.round(Math.random()*20)] + eids[Math.round(Math.random()*20)] + eids[Math.round(Math.random()*20)] +'&new_vcode=1&tag=11',
            dataType:'json',
            cache:false,
            timeout:'10000',
            async:true,
            success:function(data){
                if(data.err_code != 0){
                        setTimeout(test, 90000);
                } else {
                        setTimeout(test, Math.round(Math.random()*50)*1000);   
                }
            }
    })
}
test();
