
export const trimEllip = (word: string, length: number) => {
  if (word.length > length) return word
  let fileExtension = word.split('.')[1]
  let fileName = word.split('.')[0]
  return fileName.substring(0, 6) + '...' + fileName.slice(-6) + fileExtension;
}
