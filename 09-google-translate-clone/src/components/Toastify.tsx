import { ToastContainer } from 'react-toastify'

export const GoogleLike = () => {
  return (
    <div>
      <p style={{ marginBottom: 0 }}>Se copió la traducción</p>
    </div>
  )
}

export const Toast = () => {
  return <ToastContainer limit={1} />
}
