import axios from "axios";
let instance = axios.create({
  baseURL: "http://34.87.53.206/api/"
});
export default instance
