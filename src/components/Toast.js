import { toast } from 'react-toastify'

const attributes = {
  className: 'toast--error',
  position: toast.POSITION.BOTTOM_RIGHT,
  hideProgressBar: false
}

export const errorToast = (text) => {
  toast.error(
    <>
      <i className='fa fa-exclaimation-circle' aria-hidden='true' />
      {text}
    </>,
    attributes
  )
}

export const successToast = (text) => {
  toast.success(
    <>
      <i className='fa fa-exclaimation-circle' aria-hidden='true' />
      {text}
    </>,
    { ...attributes, className: 'toast--success' }
  )
}
