import { t } from 'ttag'

export const sortData = (array: any, sortBy: string, isAscending?: boolean) => {
  let sortedArray
  switch (sortBy) {
    case t`نام`:
      sortedArray = array.sort((a: any, b: any) => {
        if (isAscending) {
          if (a.name < b.name) {
            return -1
          }
          if (a.name > b.name) {
            return 1
          }
          return 0
        } else {
          if (b.name < a.name) {
            return -1
          }
          if (b.name > a.name) {
            return 1
          }
          return 0
        }
      })
      break
    case t`حجم`:
      sortedArray = array.sort((a: any, b: any) => {
        if (a.size) {
          if (isAscending) return b.size - a.size
          else return a.size - b.size
        }
      })
      break
    case t`تاریخ`:
      sortedArray = array.sort((a: any, b: any) => {
        if (isAscending) return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        else return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      })
      break
  }
  return sortedArray
}
