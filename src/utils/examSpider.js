const request = require('request');
const apiUrl = require('./config')
/**
 * 待考试列表获取
 * @param {string}jwloginToken 从ecampus获取
 * @returns {Promise<Array>}examInfo 返回考试信息，默认为JSON
 */
function examSpider(jwloginToken){
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-kwi/JxbKcxx/getKsxxByXs',
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': 'SESSION=NzMzZjc2OTQtNDMzMC00NjNlLThkY2MtOGVlZTM5YzgxMTY1'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body).msg);
        });
    })
}

module.exports=examSpider
