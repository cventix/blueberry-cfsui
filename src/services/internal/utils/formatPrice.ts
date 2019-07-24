export const formatPrice = (num: number, currency = 'تومان', sep = ',') => {
  console.log(num)
  num = num * 1000
  console.log(num)
  let number = typeof num === 'number' ? num.toFixed(0).toString() : num
console.log(num)
  const separator = typeof sep === 'undefined' ? ',' : sep
  const result = number.replace(/(\d)(?=(\d\d\d)+(?!\d))/g, '$1' + separator)
  return `${result} ${currency}`
}
