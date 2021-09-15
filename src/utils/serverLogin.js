const request = require('request');


/**
 * 获取ecampus的jwloginToken
 * @param {object}user 需要包含username和password
 * @returns {Promise<string>}jwloginToken 返回的string为jwloginToken
 */
function serverLogin(user) {
    var options = {
        'method': 'POST',
        'url': 'http://127.0.0.1:20001/apis/user/getToken',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'username': user.username,
            'password': user.password,
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            console.log(response)
            if(JSON.parse(response.body).msg === "登录成功")
                resolve(JSON.parse(response.body).info)
            else
                reject("账号密码错误")
        });
    })

}

module.exports = serverLogin

