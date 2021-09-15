const request = require('request');
const apiUrl = require('./config')

function getL1List(token) {
    var options = {
        'method': 'POST',
        'url': apiUrl +'/jw-cmsi/CmsKcz1lbq/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'deleted': 'false',
            'pageSize': '65535',
            'jwloginToken': token
        }
    };
    return new Promise(((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body).msg.list);
        });
    }))
}

function getL2List(token) {
    var options = {
        'method': 'POST',
        'url': apiUrl +'/jw-cmsi/CmsKcz2lbq/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'deleted': 'false',
            'pageSize': '65535',
            'jwloginToken': token
        }
    };
    return new Promise(((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body).msg.list);

        });
    }))
}

function getL3List(token) {
    var options = {
        'method': 'POST',
        'url': apiUrl +'/jw-cmsi/CmsKcz3lbq/r-list',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'deleted': 'false',
            'pageSize': '65535',
            'jwloginToken': token
        }
    };
    return new Promise(((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body).msg.list);

        });
    }))
}

function getDetailList(id,token){
    var options = {
        'method': 'POST',
        'url': apiUrl +'/jw-cmsi/CmsKczkc/r-listByXsid',
        'headers': {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        form: {
            'id': id,
            'jwloginToken': token
        }
    };
    return new Promise(((resolve, reject) => {
        request(options, function (error, response) {
            if (error) reject(error);
            resolve(JSON.parse(response.body));

        });
    }))
}


module.exports = {getL1List, getL2List, getL3List,getDetailList}
