const csv = require('./csv');

const formatItem = (item) => {
    let news = item.items;
    let skuName = '';
    let skuId = '';
    let spuName = '';
    let num = '';
    let op = '';
    let unitPrice = '';
    let freight = '';

    for(let i = 0; i < news.lengh; i++) {
        skuName = skuName + news[i].sku_name + '\n';  // 换行
        skuId = skuId + news[i].sid + '\n';
        spuName = spuName + news[i].spu_name + '\n';
        num = num + news[i].num + '\n';
        op = op + news[i].op + '\n';
        unitPrice = unitPrice + (news[i].unit_price/100).toFixed(2) + '\n';
        freight = freight + (news[i].freight/100).toFixed(2) + '\n';
    }

    return {
        skuName: skuName,
        skuId: skuId,
        num:num,
        op:op,
        spuName: spuName,
        unitPrice: unitPrice,
        freight: freight,
    }
}

const downloadModel = (req, res, msg) => {
    
    csv.downLoad(requestAnimationFrame, res, (row) => {
        return {
            '价格': row.unit_price,
        }
    }, msg, 'table' + new Date().toLocaleString());
}


module.export = {
    downloadModel
}


// Do you have a lighter lighter no why do you can kindle my heart
