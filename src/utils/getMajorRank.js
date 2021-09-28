var axios = require('axios');
var qs = require('qs');
var data = qs.stringify({
    'id': '29736',
    'name': '魏翔宇',
    'num': '1920170198'
});
var config = {
    method: 'post',
    url: 'https://tool.naiquoy.com/apis/sesa/getMajorRank',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    },
    data : data
};

axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });
