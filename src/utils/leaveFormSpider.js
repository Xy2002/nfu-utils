const request = require('request');


/**
 * 假条爬取
 * @param {string}JSESSIONID 从service获取
 * @param {number}i 请假条编号
 * @returns {Promise<string>} 假条结果，默认为String，可用JSON.parse转换为JSON格式
 */
async function getForm(JSESSIONID,i) {

    let options = {
        'method': 'POST',
        'url': 'http://service.nfu.edu.cn/default/cn.edu.nfu.ehall.lobby.office.processCommon.getApply.biz.ext',
        'headers': {
            'Accept': '*/*',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'text/json',
            'cookie': JSESSIONID
        },
        body: `{"data":{"processInstId":"${i}"},"entityName":"cn.edu.nfu.ehall.lobby.eduAdmin.NfuEhallStutentLeave"}`
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(response.body)
        });
    })
}

module.exports=getForm
