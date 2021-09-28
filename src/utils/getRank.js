const request = require("request");

async function getMajorRank(id,name,num){
    let options = {
        'method': 'POST',
        'url':  process.env.NODE_ENV === 'development' ? 'http://47.103.153.181:20000/apis/sesa/getMajorRank' : 'https://tool.naiquoy.com/apis/sesa/getMajorRank',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
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
                let resJson = JSON.parse(res.body).data[0].majorRank
                resolve(resJson)
            }
        })
    })
}

async function getMajorCount(id,name,num){
    let options = {
        'method': 'POST',
        'url':  process.env.NODE_ENV === 'development' ? 'http://47.103.153.181:20000/apis/sesa/getMajorCount' : 'https://tool.naiquoy.com/apis/sesa/getMajorCount',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
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

module.exports={getMajorRank,getMajorCount}
