import { Link } from '../Link.jsx'

console.log('Estamos importando el archivo About.jsx')

const i18n = {
  es: {
    title: 'Sobre nosotros',
    description:
      'Hola! Me llamo Abraham Galue y estoy creando un clon de React Router.',
    button: 'Ir a Home Page',
  },
  en: {
    title: 'About us',
    description:
      'Hello! My name is Abraham Galue and I am creating a React Router clone.',
    button: 'Go to Home Page',
  },
}

const useI18n = lang => {
  return i18n[lang] || i18n.en
}

export default function AboutPage({ routeParams }) {
  const i18n = useI18n(routeParams.lang ?? 'es')

  return (
    <>
      <h1>{i18n.title}</h1>
      <div>
        <img
          src='https://www.mascotarios.org/wp-content/uploads/2011/08/DogodeBurdeos.jpg'
          alt='Un bonito canino'
          width={260}
        />
      </div>
      <p>{i18n.description}</p>
      <Link to='/'>{i18n.button}</Link>
    </>
  )
}
