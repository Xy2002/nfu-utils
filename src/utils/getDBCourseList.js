const axios = require('axios');
const qs = require('qs');

const getDBCourseList = async (jwloginToken) => {
    var data = qs.stringify({
        'jwloginToken': jwloginToken,
        'xn': '2021',
        'xq': '1'
    });
    var config = {
        method: 'post',
        url: 'http://ecampus.nfu.edu.cn:2929/jw-cssi/CssStudent/r-listJxb',
        headers: {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        data : data
    };
    let res = await axios(config)
    res = res.data
    let obj = {}
    obj.user = res.user
    delete obj.user.groupIds
    console.log(res)
    console.log(obj)
}

let jwt = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1c2VyIiwiYXVkIjoie1wiYWN0dWFsSWRcIjpcIjI5NzM2XCIsXCJncm91cElkc1wiOls0XSxcImlkXCI6NzE4MjQsXCJ1c2VybmFtZVwiOlwiMTkyMDE3MDE5OFwifSIsImlzcyI6Imh0dHA6XC9cL2VjYW1wdXMubmZ1LmVkdS5jbiIsImV4cCI6MTYzMjIxNDM4MywiaWF0IjoxNjMyMTI3OTgzfQ.ujxEY-jjH0dDE3umaLhPXsqN6sI4cecO0eAAUjKiOV0"
getDBCourseList(jwt)
