import { ToastContainer } from 'react-toastify'

export function GoogleLike() {
  return (
    <div>
      <p style={{ marginBottom: 0 }}>Se copió la traducción</p>
    </div>
  )
}

export function Toast() {
  return <ToastContainer limit={1} />
}
