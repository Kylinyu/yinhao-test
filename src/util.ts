const textEllipsis = (str: string) => {
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