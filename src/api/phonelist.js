import { get } from '@/utils/request'

export const getphonelist = (data = {}) => {
  return get('api/phonelist', data)
  // return new Promise(resolve => {
  //   setTimeout(() => {
  //     resolve({
  //       success: true,
  //       data: {
  //         name: '子君',
  //         公众号: '前端有的玩',
  //         掘金: '前端进击者'
  //       }
  //     })
  //   }, 2000)
  // })
}
