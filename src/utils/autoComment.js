const request = require('request');
const apiUrl = require("./config")
var token

/**
 * 获取待评教列表
 * @param {string}jwloginToken 从ecampus获取
 * @param {object}_options 需要包含xn(学年)和xq(学期)
 * @returns {Promise<object>} 返回待评教列表
 */
async function getCommentList(jwloginToken, _options) {

    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-amsi/amsEvalTeacher/r-getEvaluatingTeacherCourse',
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'checkType': '0',
            'deleted': 'false',
            'jwloginToken': token,
            'pageSize': '20',
            'pg': '1',
            'xn': _options.xn,
            'xq': _options.xq
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            let res = JSON.parse(response.body)
            resolve(res.msg.list)
        });
    })
}

/**
 * 评教
 * @param {object}item 待评教列表
 * @returns {Promise<object>} 评教结果
 */
function comment(item) {
    let amsEvalRecordList = [
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 1,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师教学用心投入，乐于答疑解惑。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 2,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师告知了课程要求，教学进度和考核方法。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 3,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师备课充分，内容娴熟，授课生动，不照本宣科。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 4,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "教学内容充实，重点突出，条理清晰，难度适宜。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 5,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师关注课堂反应，教学方法灵活有效。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 6,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "课件清晰规范，板书工整有序。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 7,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师严格要求学生，维护课堂秩序。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 8,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师能及时讲评反馈作业。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 9,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "老师对平时成绩的考核公开、公正、公平。",
            "kczkhfsdm": "01",
            "levelId": 1
        },
        {
            "xn": item.xn,
            "xq": item.xq,
            "targetId": 10,
            "jxbId": item.jxbId,
            "yjkcMc": item.className,
            "teacherId": item.teacherId,
            "content": "通过老师的教学，我掌握了课程知识。",
            "kczkhfsdm": "01",
            "levelId": 1
        }
    ]
    let amsEvalRecordOpinion = {
        xn: item.xn,
        xq: item.xq,
        teacherId: item.teacherId,
        jxbId: item.jxbId,
        yjkcMc: item.className,
        content: ""
    }
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-amsi/amsEvalTeacher/w-saveAll',
        'headers': {
            'Accept': 'application/json, text/plain, */*',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'amsEvalRecordList': JSON.stringify(amsEvalRecordList),
            'amsEvalRecordOpinion': JSON.stringify(amsEvalRecordOpinion),
            'jwloginToken': token
        }
    }
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

/**
 * 自动循环待评教列表进行评教
 * @param {string}jwloginToken 需要包含username和password
 * @param {object}_options 需要包含xn(学年)和xq(学期)
 * @returns {unknown} return了个寂寞，直接console.log打印结果
 */
async function autoComment(jwloginToken, _options) {
    let commentList = await getCommentList(token, _options)
    commentList.forEach(comment)
}

module.exports = autoComment
