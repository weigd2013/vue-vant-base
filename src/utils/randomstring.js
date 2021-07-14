function randomString(length) {
  let str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i)
    result += str[Math.floor(Math.random() * str.length)]
  return result
}
// alert(randomString(6))

function GetRandomNum(Min, Max) {
  let Range = Max - Min
  let Rand = Math.random()
  return Min + Math.round(Rand * Range)
}

export { randomString, GetRandomNum }
