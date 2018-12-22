const axios = require('axios');

const fs = require('fs');
const path = require('path');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpYW5nemhlbndlaUB6aGVueHVhbi5tb2JpIiwibmFtZSI6ImxpYW5nemhlbmd3ZWkiLCJvcCI6IjAiLCJpYXQiOjE1NDUxODE5MzYsImV4cCI6MTU0NTE4OTEzNn0.HDuEAsXLQCsgwaSNJa-tzcUpUO-etlGrHveaHs8Y0F8'
let url = `http://bapi.zhenxuan.mobi/cms/goods/list?token=${token}`;
let url2 = `https://bapi.zhenxuan.mobi/cms/goods/detail?token=${token}`;


let arr =[];
axios.get(url).then((R) => {

    // console.log(R.data.Items);
    for(var i = 0 ; i < R.data.Items.length; i++) {  // 100条
    // for(var i = 100 ; i < 145; i++) {
        arr.push(R.data.Items[i].gid);
    }
    let arr2 = [];
    let arr3 = [];
    const to = (arr) => {
        // console.log(arr);
        axios.get(url2 + `&gid=${arr}`).then(res=>{
            let obj = {};
            obj.gid = res.data.data.Items[0].gid
            obj.skus = res.data.data.Items[0].skus
            arr2.push(obj);

            var obj2 = {};
            for(var k = 0;  k < arr2.length; k++) {
                obj2.gid = arr2[k].gid;
                for(var j = 0; j < arr2[k].skus.length; j++) {
                    obj2 = arr2[k].skus[j];
                    arr3.push(obj2);
                }
            }

            console.log(arr3.length);



            // for(var k = 0; k < res.data.data.Items[0].skus[k].length; k++) {
            //     console.log(res.data.data.Items[0].skus[k]);
            // }

            
            // fs.writeFile(path.resolve(__dirname, '../initData/3.js'), arr3, 'utf8', (err, data) => {
            //     console.log(111);
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