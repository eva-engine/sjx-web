import Axios from "axios";
console.log(import.meta.env.VITE_API_DOMAIN)
const axiosInstance = Axios.create({
  baseURL: import.meta.env.VITE_API_DOMAIN as string,
  timeout: 10000,
  method: 'post',
  headers: {
    'Content-Type': 'application/json;charset=utf8',
    'Access-Control-Allow-Origin': '*'
  }
})
axiosInstance.interceptors.response.use(async res => {
  if (res.status !== 200) throw new Error('server error');
  return res.data.data;
}, error => {
  throw error;
})
export { axiosInstance };