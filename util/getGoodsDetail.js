const axios = require('axios');

const fs = require('fs');
const path = require('path');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpYW5nemhlbndlaUB6aGVueHVhbi5tb2JpIiwibmFtZSI6ImxpYW5nemhlbmd3ZWkiLCJvcCI6IjAiLCJpYXQiOjE1NDUwNDY5OTcsImV4cCI6MTU0NTA1NDE5N30.eyGGIPVnOM38Ail7nOgc17ouJliMnkOi9QN3nA__uQg'
let url = `http://bapi.zhenxuan.mobi/cms/goods/list?token=${token}`;
let url2 = `https://bapi.zhenxuan.mobi/cms/goods/detail?token=${token}`;


let arr =[];
axios.get(url).then((R) => {

    // console.log(R.data.Items);
    // for(var i = 0 ; i < R.data.Items.length; i++) {  // 100条
    for(var i = 100 ; i < 138; i++) {
        arr.push(R.data.Items[i].gid);
    }
    let arr2 = [];

    const to = (arr) => {
        // console.log(arr);
        axios.get(url2 + `&gid=${arr}`).then(res=>{
            let obj = {};
            obj.res = res.data.data.Items[0];
            arr2.push(obj);
            console.log(arr2);
            
            // fs.writeFile(path.resolve(__dirname, '../initData/goods1Detail.json'), arr2, 'utf8', (err, data) => {
            //     console.log(data);
            // })
        })
        
    };

    const go =(arr)=>{
        // console.log(arr);
        for(var k=0;k<arr.length;k++){
            let temp = to(arr[k]);
        }
    };
    go(arr);
    
})