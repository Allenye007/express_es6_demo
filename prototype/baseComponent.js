// import formiadable from 'formidable';
import fetch from 'node-fetch';
import { error } from 'util';
class BaseComponent {
    constructor() {

    };
    async fetch(url = '', data = {}, type = 'GET', resType = 'JSON') {
        type = type.toLocaleUpperCase();
        resType = resType.toLocaleUpperCase();
        // 请求方式
        if(type === 'GET') {
            let dataStr = '';
            Object.keys(data).forEach(key => {
				dataStr += key + '=' + data[key] + '&';
            })
            if(dataStr !== '') {
                dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
                url = url + '?' + dataStr;
            }
        }
        if(type === 'POST') {
			Object.defineProperty(requestConfig, 'body', {
				value: JSON.stringify(data)
			})
        }
        let requestConfig = {
            method: type,
            headers: {
                'Accept': 'application/json',
				'Content-Type': 'application/json'
            }
        }
        let responseJson;
        try {
            const response = await fetch(url, requestConfig);
            if(resType === 'TEXT') {
                responseJson = await response.text();
            } else {
                responseJson = await response.json();
            }
        } catch (err) {
            console.log('获取数据失败');
            throw new error(err);
        }
        return responseJson;
    }
}

exports.class = BaseComponent;