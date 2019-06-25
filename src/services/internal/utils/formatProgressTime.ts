export const formatProgressTime = (seconds: number) => {
  seconds = +seconds.toFixed(0)
  const value = Math.abs(seconds)
  const days = Math.floor(value / 1440)
  const hours = Math.floor((value - days * 1440) / 3600)
  const min = Math.floor((value - days * 1440 - hours * 3600) / 60)
  const sec = value - days * 1440 - hours * 3600 - min * 60
  return `${min < 10 ? '0' + min : min}:${sec < 10 ? '0' + sec : sec}`
}
