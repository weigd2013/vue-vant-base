import { get } from '@/utils/request'

export const getproduct = (params, data = {}) => {
  console.log(params)
  return get('/product/search', params, data)
}
export const getproductdetail = (id, params = {}, data = {}) => {
  return get('product/detail/' + id, params, data)
}
