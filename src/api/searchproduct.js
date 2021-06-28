import { get } from '@/utils/request'

export const getproduct = (params, data = {}) => {
  console.log(params)
  return get('/product/search', params, data)
}
