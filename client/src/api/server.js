const axios = require('axios').create({
    baseURL : 'http://18.139.226.27/',
    headers : {
        access_token : localStorage.getItem('access_token')
    }
})

module.exports = axios
