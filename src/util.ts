const textEllipsis = (str: string) => {
  // 字符长度超过4，星号处理
  // 前面两个 + * + 后面两个
  if (str && str.length > 4) {
    return `${str.slice(0,2)}*${str.slice(-2)}`
  }
  return str
}

const isNumber = (str: string) => {
  const regex = /^[0-9]*$/g;
  return regex.test(`${str}`)
}

export {
  textEllipsis,
  isNumber
}