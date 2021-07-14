import { get } from '@/utils/request'

export const getproductCateList53 = (data = {}) => {
  return get('/home/productCateList/53', data)
}
export const getproductCateList56 = (data = {}) => {
  return get('/home/productCateList/56', data)
}
export const getaddresslist = (data = {}) => {
  return get('/member/address/list', data)
}
