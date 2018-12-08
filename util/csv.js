const csv = require('./csv');

const formatItem = (item) => {
    let news = item;
    let oid = '';
    let uid = '';
    let op = '';
    let sid = '';
    let barcode = '';
    let spu_id = '';
    let cover = '';

    // for(let i = 0; i < news.length; i++) {
        oid = oid + news.oid + '\n';  // 换行
        uid = uid + news.uid + '\n';
        sid = sid + news.sid + '\n';
        barcode = barcode + news.barcode + '\n';
        op = op + news.op + '\n';
        spu_id = spu_id + news.spu_id + '\n';
        cover = cover + news.cover + '\n';
    // }

    return {
        oid: oid,
        uid: uid,
        sid:sid,
        op:op,
        barcode: barcode,
        spu_id: spu_id,
        cover: cover,
    }
}

const downloadModel = (req, res, msg) => {
    let b = [];
    for(var i = 0; i < msg.length; i++) {
        b.push(formatItem(msg[i].dataValues))
    }
    for(var i = 0; i < msg.length; i++) {
        msg[i].oid= b[i].oid;
        msg[i].uid= b[i].uid;
        msg[i].sid= b[i].sid;
        msg[i].op = b[i].op;
        msg[i].barcode = b[i].barcode;
        msg[i].spu_id = b[i].spu_id;
        msg[i].cover = b[i].cover;
    }
    csv.downLoad(req, res, (row) => {
        console.log(row)
        return {
            '价格': row.cover,
        }
    }, msg, 'table' + new Date().toLocaleString());
}


module.exports = downloadModel


// Do you have a lighter lighter no why do you can kindle my heart
