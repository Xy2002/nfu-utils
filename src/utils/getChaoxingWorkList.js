var axios = require('axios');
var qs = require('qs');
const cheerio = require("cheerio")
const to = require('await-to-js').default;

/**
 * 超星登陆，获取Cookie
 * @param {String}username 账号
 * @param password 密码
 * @return {Promise<string|Error>}
 */
async function login(username,password){
    password = Buffer.from(password).toString("base64")
    var data = qs.stringify({
        'fid': '-1',
        'forbidotherlogin': '0',
        'password': password,
        'refer': 'http%3A%2F%2Fi.mooc.chaoxing.com',
        't': 'true',
        'uname': username
    });
    var config = {
        method: 'post',
        url: 'https://passport2.chaoxing.com/fanyalogin',
        headers: {
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'Accept': 'application/json, text/javascript, */*; q=0.01',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'X-Requested-With': 'XMLHttpRequest',
            'sec-ch-ua-mobile': '?0',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'sec-ch-ua-platform': '"macOS"',
            'Sec-Fetch-Site': 'same-origin',
            'Sec-Fetch-Mode': 'cors',
            'Sec-Fetch-Dest': 'empty',
        },
        data : data
    };
    let [err,response] = await to(axios(config))
    if(err){
        return err
    }
    let headers = response.headers['set-cookie']
    let cookie = ""
    for (const header of headers) {
        cookie+=header.split(";")[0]+";"
    }
    return cookie

}

/**
 * 获取所有课程部分参数(courseId,classId,personId)
 * @param {String}Cookie
 * @return {Promise<Error|*[]>}
 */
async function getCourseList(Cookie){
    var data = qs.stringify({
        'courseFolderId': '0',
        'courseFolderSize': '0',
        'courseType': '1'
    });
    var config = {
        method: 'post',
        url: 'https://mooc1-1.chaoxing.com/visit/courselistdata',
        headers: {
            'Accept': 'text/html, */*; q=0.01',
            'X-Requested-With': 'XMLHttpRequest',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'Cookie': Cookie
        },
        data : data
    };
    let [err,res] = await to(axios(config))
    if(err){
        return err
    }
    let tempArr = []
    let htmlText = res.data
    let $ = cheerio.load(htmlText)
    $('#courseList').find(".course.clearfix").each(function() {
        let obj = {}
        obj.courseName = $(this).find(".course-name.overHidden2").attr("title")
        obj.courseid = $(this).attr("courseid")
        obj.clazzid = $(this).attr("clazzid")
        obj.personid = $(this).attr('personid')
        tempArr.push(obj)
    });
    return tempArr
}

/**
 * 获取课程教案参数enc
 * @param {Object}obj
 * @param {String}Cookie
 * @return {Promise<Error|*[]>}
 */
async function getClassEnc(obj,Cookie){
    let {courseid,clazzid,personid} = {courseid:obj.courseid,clazzid:obj.clazzid,personid:obj.personid}
    let url = `https://mooc2-ans.chaoxing.com/mycourse/stu?courseid=${courseid}&clazzid=${clazzid}&cpi=${personid}`
    let config = {
        method: 'get',
        url: url,
        headers: {
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Dest': 'iframe',
            'Cookie': Cookie
        }
    };
    let [err,res] = await to(axios(config))
    if(err){
        return err
    }
    let htmlText = res.data
    let $ = cheerio.load(htmlText)
    try{
        obj.enc = $('#boxscrollleft > div > ul:nth-child(12) > li:nth-child(4) > a').attr('data-url').split("enc=")[1]
    }catch (e) {
        console.log($.html())
    }
    return obj
}

/**
 * 获取课程下的未完成作业列表
 * @param {Object}obj
 * @param {String}Cookie
 * @return {Promise<Error|*[]>}
 */
async function getWorkList(obj,Cookie){
    let {courseid,clazzid,personid,enc} = {courseid:obj.courseid,clazzid:obj.clazzid,personid:obj.personid,enc:obj.enc}
    let config = {
        method: 'get',
        url: `https://mooc1.chaoxing.com/mooc2/work/list?courseId=${courseid}&classId=${clazzid}&cpi=${personid}&enc=${enc}&status=1`,
        headers: {
            'sec-ch-ua': '"Google Chrome";v="93", " Not;A Brand";v="99", "Chromium";v="93"',
            'sec-ch-ua-mobile': '?0',
            'sec-ch-ua-platform': '"macOS"',
            'Upgrade-Insecure-Requests': '1',
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/93.0.4577.82 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
            'Sec-Fetch-Site': 'same-site',
            'Sec-Fetch-Mode': 'navigate',
            'Sec-Fetch-Dest': 'iframe',
            'Cookie': Cookie
        }
    };

    let [err,res] = await to(axios(config))
    if(err){
        return err
    }
    let htmlText = res.data
    let $ = cheerio.load(htmlText)
    let workArr = []
    $('body > div.box > div > div > div.has-content > div.bottomList > ul').find("li").each(function () {
        let workObj = {}
        let text = $(this).text().replace(/\s+/g,"")
        workObj.title = text.split("未交")[0]
        workObj.time = text.split("未交")[1]
        workObj.status = text.split(workObj.title)[1].split(workObj.time)[0]
        workObj.courseName = obj.courseName
        workArr.push(workObj)
    })
    return workArr
}

/**
 * 整合所有接口，
 * @param {Object}obj 包含三个参数：账号，密码，需获取前n门课程的作业
 * @return {Promise<Error|*[]>}
 */
async function getChaoxingWorkList(obj){
    let {
        username,
        password,
        count
    }={
        username:obj.username,
        password:obj.password,
        count:obj.count
    }
    let [err,Cookie] = await to(login(username,password))
    if(err){
        return err
    }
    let [err2,courseList] = await to(getCourseList(Cookie))
    if(err2){
        return err2
    }
    courseList=courseList.slice(0,count)
    let workArr = []
    for (let courseListElement of courseList) {
        courseListElement = await getClassEnc(courseListElement,Cookie)
        let tempWork = await getWorkList(courseListElement,Cookie)
        workArr.push.apply(workArr,tempWork)
    }
    return workArr
}

module.exports=getChaoxingWorkList()
