const apiUrl = require("./config");
const request = require("request");

function getCourseRank(name,jxbid,token) {
    var options = {
        'method': 'POST',
        'url': apiUrl +'/jw-amsi/AmsJxbXscj/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'deleted': 'false',
            'pageSize': '65535',
            'jxbid': jxbid,
            'lookCj': true,
            'jwloginToken': token
        }
    };
    return new Promise(((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            try{
                let list = JSON.parse(response.body).msg.list
                let tempScoreArr = []
                for (const arrElement of list) {
                    let tempObj = {}
                    tempObj.score = parseFloat(arrElement.zpcj)
                    tempObj.name = arrElement.xm
                    tempScoreArr.push(tempObj)
                }
                tempScoreArr.sort(function compare(a,b) {
                    return (b.score - a.score)
                })
                for (let [index,element] of new Map(tempScoreArr.map( (item , i) => [i ,item]) ) ) {
                    if (element.name === name){
                        resolve({count : list.length,rank: index+1})
                    }
                }
            }catch (e){
                resolve(e.message)
            }

        });
    }))
}

module.exports= {getCourseRank}
