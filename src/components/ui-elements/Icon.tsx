import * as React from 'react'
import folder from '../../images/typeIcons/icon-folder.svg'
import excel from '../../images/typeIcons/icon-image.svg'
import image from '../../images/typeIcons/icon-folder.svg'
import music from '../../images/typeIcons/icon-music.svg'
import zip from '../../images/typeIcons/icon-zip.svg'
import video from '../../images/typeIcons/icon-video.svg'
import pdf from '../../images/typeIcons/icon-pdf.svg'
export default interface Iprops {
  src?: string
  alt?: string
  className?: string
  style?: object
  mimetype?: string
}

export const Icon = ({ src, alt, className = 'icon', style, mimetype }: Iprops) => (
  <img src={mimetype ? renderIconSrc(mimetype) : src} alt={alt} className={className} style={style} />
)

const renderIconSrc = (mimetype: string) => {
  let src
  switch (mimetype) {
    case 'folder':
      src = folder
      break
    case 'excel':
      src = excel
      break
    case 'image':
      src = excel
      break
    case 'music':
      src = music
      break
    case 'video':
      src = video
      break
    case  'archive':
      src = zip
      break
      case  'pdf':
      src = pdf
      break
  }
  return src
}
