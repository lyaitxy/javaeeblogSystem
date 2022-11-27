//引入axios
import axios from 'axios'
import store from '../store'



const request = axios.create({
  baseURL: 'http://124.223.6.87:8084/SpringBlogs',
  timeout: 10000
})


//请求拦截器
request.interceptors.request.use(config => {
  //在发送请求之前做些什么
  console.log(store.state.user.userInfo.authorization); 
  let token = store.state.user.userInfo.authorization
  if (token) {
    config.headers.Authorization = token
  }
  console.log("data信息",config.data);
  return config
}, error => {
  //对请求错误做些什么
  return Promise.reject(error)
})

//响应拦截器
request.interceptors.response.use(response => {
  //对响应数据做点什么

  return response
}, error => {
  //对响应错误做点什么
  return Promise.reject(error)
})


export default request