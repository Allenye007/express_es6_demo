const axios = require('axios');

// const fs = require('fs');
// const path = require('path');

let token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImxpYW5nemhlbndlaV90ZXN0QHpoZW54dWFuLm1vYmkiLCJuYW1lIjoibGlhbmd6aGVuZ3dlaSIsIm9wIjoiYXRqdCIsImlhdCI6MTU0NTE5MTU1NCwiZXhwIjoxNTQ1MTk4NzU0fQ.p-uYIMNRhUKiylF6dFf-KhJeANVnvfN5U7UP9xzALMQ'
let url = `http://bapi.zhenxuan.mobi/cms/goods/list?token=${token}`;
let url2 = `https://bapi.zhenxuan.mobi/cms/goods/detail?token=${token}`;

let arr =[]; // gid 列表
let arr2 = [];
axios.get(url).then(R => {

        for(var i = 0 ; i < R.data.Items.length; i++) {  // 100条
        // for(var i = 100 ; i < 145; i++) {
            arr.push(R.data.Items[i].gid);
        }
        
        
        for(var i = 0; i < arr.length; i++) {
            
            axios.get(url2 + `&gid=${arr[i]}`).then(R => {
                for(var k = 0; k < R.data.data.Items[0].styles.length; k++) {
                    // console.log(R.data.data.Items[0].skus[k])
                    var obj = {};
                    // obj = R.data.data.Items[0].skus[k];
                    obj = R.data.data.Items[0].styles[k];
                    obj.gid = R.data.data.Items[0].gid;
                    
                    arr2.push(obj);
                }
                console.log(arr2);
            })
        }

})

