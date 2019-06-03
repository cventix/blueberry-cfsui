import { toast } from 'react-toastify'
import { css } from 'glamor'
import 'react-toastify/dist/ReactToastify.css'

toast.configure({
 
  draggable: false,
  closeButton: false,
  rtl: true
})

export default {
  success(msg: any, options = {}) {
    return toast.success(msg, {
      ...options,
       autoClose: 10000,
      className: css({
        background: '#21d352 !important',
        fontFamily: 'vazir-regular !important',
        textAlign: 'center !important'

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
       autoClose: 3000,
      className: css({
        height: '35px !important',
        fontFamily: 'vazir-regular !important',
        padding:'0 !important',
        minHeight:'35px !important',
        textAlign: 'center !important'
      }),
    
      position: toast.POSITION.BOTTOM_LEFT,
      hideProgressBar: true,
      progressClassName: css({
        background: '#007aff'
      })
    })
  }
}
