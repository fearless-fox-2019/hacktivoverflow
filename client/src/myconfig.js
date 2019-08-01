import axios from "axios";
let instance = axios.create({
  baseURL: "http://localhost:3000/api/"
});
export default instance
