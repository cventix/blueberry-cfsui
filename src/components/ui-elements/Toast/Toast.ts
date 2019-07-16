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
    if (msg.length < 30) {
      return toast.success(msg, {
        ...options,
        autoClose: 5000,
        className: css({
          height: '35px !important',
          fontFamily: 'vazir-regular !important',
          padding: '0 !important',
          minHeight: '35px !important',
          textAlign: 'center !important',
          background: 'linear-gradient(to top, #2fd673, #3ae57c) !important'
        }),
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_LEFT
      })
    } else {
      return toast.success(msg, {
        ...options,
        autoClose: 5000,
        className: css({
          height: '35px !important',
          width: '480px !important',
          fontFamily: 'vazir-regular !important',
          padding: '10px !important',
          minHeight: '35px !important',
          textAlign: 'center !important',
          background: 'linear-gradient(to top, #2fd673, #3ae57c) !important'
        }),
        hideProgressBar: true,
        position: toast.POSITION.BOTTOM_LEFT
      })
    }
  },
  timed(msg: any, options = {}) {
    return toast.success(msg, {
      ...options,
      autoClose: false,
      className: css({
        height: '35px !important',
        width: '480px !important',
        fontFamily: 'vazir-regular !important',
        padding: '10px !important',
        minHeight: '35px !important',
        textAlign: 'center !important',
        background: 'linear-gradient(to top, #2fd673, #3ae57c) !important'
      }),
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT
    })
  },
  succeed(msg: any, options = {}) {
    return toast.success(msg, {
      ...options,
      autoClose: 3000,
      className: css({
        height: '35px !important',
        fontFamily: 'vazir-regular !important',
        padding: '0 !important',
        minHeight: '35px !important',
        textAlign: 'center !important',
        background: 'linear-gradient(to top, #2fd673, #3ae57c) !important'
      }),
      hideProgressBar: true,
      position: toast.POSITION.BOTTOM_LEFT
    })
  },
  error(msg: string, options = {}) {
    console.log(msg.length)
    if (msg.length < 30) {
      return toast.error(msg, {
        ...options,
        autoClose: 30000,
        className: css({
          fontFamily: 'vazir-regular !important',
          padding: '0 !important',
          minHeight: '35px !important',
          textAlign: 'center !important'
        }),

        position: toast.POSITION.BOTTOM_LEFT,
        hideProgressBar: true,
        progressClassName: css({
          background: '#007aff'
        })
      })
    } else {
      return toast.error(msg, {
        ...options,
        autoClose: 30000,
        className: css({
          fontFamily: 'vazir-regular !important',
          padding: '10px !important',
          minHeight: '35px !important',
          textAlign: 'center !important'
        }),

        position: toast.POSITION.BOTTOM_LEFT,
        hideProgressBar: true,
        progressClassName: css({
          background: '#007aff'
        })
      })
    }
  },
  dismiss() {
    return toast.dismiss()
  }
}
