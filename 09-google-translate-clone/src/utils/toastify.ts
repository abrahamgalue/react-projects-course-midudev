import { toast } from 'react-toastify'
import { GoogleLike } from '../components/Toastify'

export const notify = () => {
  toast(GoogleLike, {
    style: {
      backgroundColor: '#323232',
      color: '#fff',
      width: 250,
    },
    autoClose: 1000,
    closeButton: false,
    closeOnClick: true,
    draggable: false,
    hideProgressBar: true,
    pauseOnHover: true,
    position: 'bottom-left',
    progress: undefined,
    toastId: 'custom-id',
  })
}
