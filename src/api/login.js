import { post } from '@/utils/request'

export const userlogin = (data = {}) => {
  // console.log(data)
  return post('/sso/login', data)
}
