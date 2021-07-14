import { get } from '@/utils/request'

export const getGuessYouLike = (params, data = {}) => {
  console.log('getGuessYouLike')
  console.log(params)
  return get('/api/getGuessYouLike', params, data)
}
