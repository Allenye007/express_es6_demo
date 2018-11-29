let xs = `李 张 冯 王 刘 杨 陈 赵 黄 周 吴 徐 郑 马 朱 胡 郭 何 高 林 罗 孙 梁 谢 宋 唐 许 韩 邓 曹 彭 
曾 萧 田 董 潘 袁 于 蒋 蔡 余 杜 叶 程 苏 魏 吕 丁 任 沈 姚 卢 姜 崔 钟 谭 陆 汪 范 金 石 廖 贾 夏 韦 傅 
方 白 邹 孟 熊 秦 邱 江 尹 薛 阎 段 雷 侯 龙 史 陶 黎 贺 顾 毛 郝 龚 邵 万 钱 严 覃 河 戴 莫 孔 向 汤`;
var arr = xs.split(' ');
for(var i = 0; i < 99; i++) {
    // console.log(arr[Math.floor(Math.random() * (99 - 0 + 1) + 0)])
}


var data = {
    '分类1':[{name:'1',age:1},{name:'11',age:11}],
    '分类2':[{name:'2',age:2},{name:'22',age:22}]
};
for(var i in data){
    console.log(data[i]);
    console.log(data);
}




function GetRandom(min, max) {
    var n = Math.floor(Math.random() * (max - min + 1) + min);
    return n;
};