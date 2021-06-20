import { get } from '@/utils/request'

export const getshelllist = (params, data = {}) => {
  console.log('getphoneshell')
  console.log(params)
  return get('api/getphoneshell', params, data)
}
