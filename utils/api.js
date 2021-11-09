import axios from 'axios';


let base =  process.env.BASE_URL

const api = axios.create({baseURL: base })
export default api