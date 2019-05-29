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
      className: css({
        height: '35px !important',
        fontFamily: 'vazir-regular !important'
      }),
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      progressClassName: css({
        background: '#007aff'
      })
    })
  }
}
