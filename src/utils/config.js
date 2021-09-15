//const apiUrl = 'http://ecampus.nfu.edu.cn:2929'
//const apiUrl = 'https://www.naiquoy.com/nfuApi'
const apiUrl = process.env.NODE_ENV === 'development' ? 'http://ecampus.nfu.edu.cn:2929' : 'https://www.naiquoy.com/nfuApi';
module.exports = apiUrl
