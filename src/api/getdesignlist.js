import { get, post } from '@/utils/request'

export const getdesignlist = (data = {}) => {
  return get('/cart/list', data)
}

export const addcart = (data = {}) => {
  return post('/cart/add', data)
}

export const deletecartids = (data = {}) => {
  return post('/cart/delete', data)
}
