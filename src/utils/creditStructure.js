const request = require('request');
const apiUrl = require('./config')
/**
 * 学分结构
 * @param {string}id 任意接口都会返回
 * @param {string}jwloginToken 从ecampus获取
 * @returns {Promise<object>}courseData 返回每堂课的数据，默认为String，可用JSON.parse转换为JSON格式
 */
function creditStructrue(id,jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-cmsi/CmsKczkc/r-listByXsid',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'id': id,
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve) => {
        request(options, function (error, response) {
            if (error) throw new Error(error);
            let courseData = JSON.parse(response.body)
            resolve(courseData.msg)
        })
    })
}

module.exports = creditStructrue

