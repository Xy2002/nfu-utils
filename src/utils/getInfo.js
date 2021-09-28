const request = require('request');
const apiUrl = require('./config')

function getUserInfo(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-privilegei/User/r-getMyself',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                let resJson = JSON.parse(res.body)
                let obj = {}
                obj.name = resJson.msg.name
                obj.id = resJson.msg.username
                obj.majorId = resJson.msg.zyid
                obj.facultyId = resJson.msg.xyid
                resolve(obj)
            }
        })
    })
}

function checkLoginStatus(jwloginToken) {
    let options = {
        'method': 'POST',
        'timeout':3000,
        'url': apiUrl+'/jw-privilegei/User/r-getMyself',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                let resJson = JSON.parse(res.body)
                if (!resJson.msg) {
                    resolve(false)
                } else {
                    resolve(true)
                }
            }
        })
    })
}


function getFacultyList(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-fesi/FesXy/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg.list)
            }
        })
    })
}

function getMajorList(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-fesi/FesZy/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken,
            'pageSize':65535,
            'deleted':false
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else {
                resolve(JSON.parse(res.body).msg.list)
            }
        })
    })
}

function getContact(jwloginToken) {
    let options = {
        'method': 'POST',
        'url': apiUrl+'/jw-srsi/SrsJbzl_myself/r-contact',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'jwloginToken': jwloginToken
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

async function getInfo(jwloginToken) {
    let facultyList = await getFacultyList(jwloginToken)
    let majorList = await getMajorList(jwloginToken)
    let obj = await getUserInfo(jwloginToken)
    let contact = await getContact(jwloginToken)
    let userInfo = {}
    userInfo.name = obj.name
    userInfo.id = obj.id
    // userInfo.major = majorList[obj.majorId - 1].zymc
    for (const majorListElement of majorList) {
        if(majorListElement.id===obj.majorId){userInfo.major = majorListElement.zymc;break;}
    }
    userInfo.faculty = facultyList[obj.facultyId - 1].xymc
    userInfo.phone = contact.yxlxdh
    userInfo.email = contact.email
    return new Promise(((resolve, reject) => {
        if (userInfo) {
            resolve(userInfo)
        } else {
            reject("未知错误")
        }
    }))
}

async function getClassmateList(code,id,name,num){
    let options = {
        'method': 'POST',
        'url':  process.env.NODE_ENV === 'development' ? 'http://47.103.153.181:20000/apis/sesa/getClassmateList' : 'https://tool.naiquoy.com/apis/sesa/getClassmateList',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'code': code,
            'id': id,
            'name': name,
            "num": num
        }
    };
    return new Promise((resolve, reject) => {
        request(options, function (err, res) {
            if (err) reject(err)
            else if(JSON.parse(res.body).code==="101"){
                reject(JSON.parse(res.body).msg)
            }
            else {
                let resJson = JSON.parse(res.body).data
                resolve(resJson)
            }
        })
    })
}

module.exports = {getInfo, checkLoginStatus,getClassmateList}
