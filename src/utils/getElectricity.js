var axios = require('axios');
var qs = require('qs');

/**
 * 获取房间具体ID
 * @return {Promise<num>} 房间id
 * @param id 用户id
 * @param name 用户姓名
 * @param num 用户学号
 */
function getElectricity(id,name,num){
    var data = qs.stringify({
        'id': id,
        'name': name,
        'num': num
    });
    var config = {
        method: 'post',
        url: process.env.NODE_ENV === 'development' ? 'http://47.103.153.181:20000/apis/sesa/getElectricity' : 'https://tool.naiquoy.com/apis/sesa/getElectricity',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    // eslint-disable-next-line no-async-promise-executor
    return new Promise((async (resolve, reject) => {
        try{
            let res = await axios(config)
            res = res.data.data
            resolve(res)
        }catch (e){
            reject(e)
        }

    }))

}
module.exports=getElectricity
