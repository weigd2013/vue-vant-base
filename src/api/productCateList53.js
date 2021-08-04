import { get, post } from '@/utils/request'

export const getproductCateList53 = (data = {}) => {
  return get('/home/productCateList/53', data)
}
export const getproductCateList56 = (data = {}) => {
  return get('/home/productCateList/56', data)
}
export const getaddresslist = (data = {}) => {
  return get('/member/address/list', data)
}

export const addaddressA = (data = {}) => {
  return post('/member/address/add', data)
}
export const editaddressA = (id, data = {}) => {
  return post('/member/address/update/' + id, data)
}
export const getaddressid = (id, data = {}) => {
  return get('/member/address/' + id, data)
}
export const deleteaddressA = (id, data = {}) => {
  return post('/member/address/delete/' + id, data)
}
