/**
 * gets byte and coverts it to biggest unit
 * @param bytes
 * @param toFixed
 * numbers deep it goes
 */

export const formatBytes = ({ bytes, toFixed = 2, lang = 'en' }: { bytes: number; toFixed?: number; lang?: any }): string => {
  const units = ['bytes', 'KB', 'MB', 'GB', 'TB']
  const faUnits = ['بایت', 'کیلوبایت', 'مگابایت', 'گیگابایت', 'ترابایت']
  let unit = 0
  while (bytes >= 1024 && unit < 4) {
    bytes /= 1024
    unit++
  }

  return `${parseFloat(bytes.toFixed(toFixed).toString())} ${lang === 'en' ? units[unit] : faUnits[unit]}`
}
