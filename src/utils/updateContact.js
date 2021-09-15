const request = require('request')
const apiUrl = require('./config')


/**
 * 更新联系方式
 * @param {string}jwloginToken 从ecampus获取
 * @param {Object}newInfo 新的联系方式
 * @return {Promise<string>}
 */
function updateContact(jwloginToken, newInfo) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-srsi/SrsJbzl_myself/r-updateContact',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken,
            'dim': true,
            'email': newInfo.email,
            'isDim': true,
            'xh': newInfo.id,
            'xm': newInfo.name,
            'yxlxdh': newInfo.phone
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg)
            }
        })
    })
}

module.exports = updateContact
