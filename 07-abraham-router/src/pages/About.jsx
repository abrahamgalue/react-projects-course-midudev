import { Link } from '../Link.jsx'

export default function AboutPage() {
  return (
    <>
      <h1>About</h1>
      <div>
        <img
          src='https://www.mascotarios.org/wp-content/uploads/2011/08/DogodeBurdeos.jpg'
          alt='Un bonito canino'
        />
      </div>
      <p>
        Hola! Me llamo Abraham Galue y estoy creando un clon de React Router.
      </p>
      <Link to='/'>Ir a Home Page</Link>
    </>
  )
}
