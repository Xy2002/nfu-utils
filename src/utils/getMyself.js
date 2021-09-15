const request = require('request');
const apiUrl = require('./config')

/**
 * 获取ecampus的jwloginToken
 * @param {string}jwloginToken jwt
 * @returns {Promise<object>}id 返回用户信息
 */
function getMyself(jwloginToken) {
    var options = {
        'method': 'POST',
        'url':apiUrl +'/jw-privilegei/User/r-getMyself',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken,
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            try{
                if(JSON.parse(response.body).user.actualId !== false){
                    let obj = {}
                    obj.actualId=JSON.parse(response.body).msg.actualId
                    obj.username=JSON.parse(response.body).msg.username
                    obj.name=JSON.parse(response.body).msg.name
                    resolve(obj)
                }
                else
                    reject("未知错误")
            }catch (e) {
                reject(e.message)
            }

        });
    })

}

module.exports = {getMyself}

