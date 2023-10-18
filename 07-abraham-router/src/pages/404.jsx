import { Link } from '../Link'

export default function Page404() {
  return (
    <>
      <div>
        <h1>404 Not Fond</h1>
        <img
          src='https://www.impactplus.com/hs-fs/hubfs/404-error-page-examples-best.jpg?length=1200&name=404-error-page-examples-best.jpg'
          alt='404 Image not found'
        />
      </div>
      <Link to='/'>Go to Home</Link>
    </>
  )
}
