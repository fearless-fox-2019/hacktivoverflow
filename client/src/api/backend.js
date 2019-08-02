import axios from 'axios'

const backend = axios.create({
  baseURL: `http://13.229.64.177`
})

export default backend