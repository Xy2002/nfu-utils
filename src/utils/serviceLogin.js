const request = require('request');
const cheerio = require('cheerio')


/**
 * 获取初始化的JSESSIONID以及获取CSRFToken
 * @description 需要先GET一次该jsp页面获取JSESSIONID以及lt
 * @returns {Promise<object>} 返回登录所需的参数JSESSIONID以及lt
 */
function getFirstCookie(){
    let options = {
        'method': 'GET',
        'url': 'http://auth.nfu.edu.cn/login?service=http%3A%2F%2Fservice.nfu.edu.cn%2Fdefault%2Fbusiness%2FThreeList%2Findex.jsp',
        'headers': {
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            let JSESSIONID = response.headers['set-cookie'][0].split(";")[0].split("JSESSIONID=")[1]
            let $ = cheerio.load(response.body)
            let lt = $('#fm1 > div.row.btn-row > input[type=hidden]:nth-child(1)').attr("value")
            let obj={}
            obj.JSESSIONID = JSESSIONID
            obj.lt = lt
            resolve(obj)
        });
    })
}

/**
 * 从service中获取JSESSIONID
 * @param {object}user 需要包含username和password
 * @returns {Promise<string>}JSESSIONID 返回的string为Cookie，调用service相关接口时，Header里的Cookie形式为"JSESSIONID=xxx"
 */
async function serviceLogin(user){
    let obj = await getFirstCookie()
    let options = {
        'method': 'POST',
        'url': "http://auth.nfu.edu.cn/login?service=http%3A%2F%2Fservice.nfu.edu.cn%2Fdefault%2Fbusiness%2FThreeList%2Findex.jsp",
        'headers': {
            'Upgrade-Insecure-Requests': '1',
            'Content-Type': 'application/x-www-form-urlencoded',
            'Cookie': `JSESSIONID=${obj.JSESSIONID}`
        },
        form: {
            'username': user.username,
            'password': user.password,
            'lt': `${obj.lt}`,
            'execution': 'e1s1',
            '_eventId': 'submit',
            'submit': '登录',
        },
        followAllRedirects:true
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            if(response.headers['set-cookie']){
                resolve(response.headers['set-cookie'][0])
            }else{
                reject("账号密码错误")
            }
        });
    })
}

module.exports=serviceLogin

