import { post } from '@/utils/request'

export const uploadimage = (data = {}) => {
  console.log(data)
  return post('/minio/upload', data)
}
