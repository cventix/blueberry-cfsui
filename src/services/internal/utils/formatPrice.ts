export const formatPrice = (num: number, currency = 'تومان', sep = ',') => {
  num = num * 1000
  let number = typeof num === 'number' ? num.toString() : num

  const separator = typeof sep === 'undefined' ? ',' : sep
  const result = number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
  return `${result} ${currency}`
}
