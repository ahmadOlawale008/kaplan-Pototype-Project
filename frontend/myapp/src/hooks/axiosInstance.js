import axios from 'axios'
const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:8000/",
})

axiosInstance.interceptors.request.use(async res=>{
    return res
})

export default axiosInstance