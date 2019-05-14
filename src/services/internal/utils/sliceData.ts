/**slice data for show more */
export const sliceData = ({ array, choppedArray = [], step = 10 }: { array: any; choppedArray?: any; step?: number }) => {
  let number = choppedArray.length / step + 1
  return array.slice(0, number * step)
}
