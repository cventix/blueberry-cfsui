export const formatType = (mimType: string, isDirectory: boolean) => {
  if (!isDirectory) return mimType
  else return 'folder'
}
