const request = require('request');
const apiUrl = require('./config')
/**
 * 课程爬取
 * @param {string}jwloginToken 从ecampus获取
 * @returns {Promise<object>}courseData 返回每堂课的数据，默认为String，可用JSON.parse转换为JSON格式
 */
function courseSpider(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-cssi/CssStudent/r-listJxbForIndex',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'xn': '2021',
            'xq': '1',
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

function courseDetailSpider(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-cssi/CssStudent/r-listJxb',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'xn': '2021',
            'xq': '1',
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

module.exports = {courseSpider,courseDetailSpider}

