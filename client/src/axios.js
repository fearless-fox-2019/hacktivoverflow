import axios from 'axios'

const axi = axios.create({
    baseURL: `http://localhost:3000`,
    // baseURL: ``
})

export default axi