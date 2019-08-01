import axios from 'axios'

let ax = axios.create({
  baseURL: 'http://localhost:3001'

})

export default ax
