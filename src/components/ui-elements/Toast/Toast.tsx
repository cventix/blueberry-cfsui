import { toast } from 'react-toastify'
import { css } from 'glamor'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
  autoClose: 10000,
  draggable: false,
  closeButton: false,
  rtl: true 
})

export default {
  success(msg: any, options = {}) {
    return toast.success(msg, {
      ...options,
      className: css({
        background: '#21d352 !important',
        fontFamily: 'vazir-regular !important'
      }),
      progressClassName: css({
        background: '#007aff'
      }),
      position: toast.POSITION.BOTTOM_LEFT
    })
  },
  error(msg: string, options = {}) {
    return toast.error(msg, {
      ...options,
      className: {
        color: '#fff',
        minHeight: '60px',
        borderRadius: '8px',
        boxShadow: '2px 2px 20px 2px rgba(0,0,0,0.3)'
      },
      progressClassName: css({
        background: '#007aff'
      })
    })
  }
}
