import moment from 'moment'

moment.defineLocale('fa', {
  relativeTime: {
    future: 'در %s',
    past: '%s پیش',
    s: 'چند ثانیه',
    ss: '%d ثانیه',
    m: 'یک دقیقه',
    mm: '%d دقیقه',
    h: 'یک ساعت',
    hh: '%d ساعت',
    d: 'یک روز',
    dd: '%d روز',
    M: 'یک ماه',
    MM: '%d ماه',
    y: 'یک سال',
    yy: '%d سال'
  }
})

export const formatDate = (date: any) => {
  let lang = localStorage.getItem("__language")
  return moment(date)
    .locale(lang === 'en' ? 'en' : 'fa')
    .fromNow()
  //   return `${new Date(date)}`
}
