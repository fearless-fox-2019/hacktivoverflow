const axios = require('axios')
const db = axios.create({
    baseURL: 'http://localhost:3000'
})
module.exports = db