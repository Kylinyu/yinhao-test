import axios from 'axios'

function initAxios() {
  axios.defaults.baseURL = 'https://api.uomg.com/api'
  
  axios.interceptors.response.use(res => {
    if (res?.data?.code === 1) {
      return res?.data
    }
    throw new Error('没有查询结果')
  })
}

export default initAxios
