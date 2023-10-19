// importa de manera dinamica los componentes
// Y hasta que no los necesitamos no los utiliza
import { lazy, Suspense } from 'react'
// import HomePage from './pages/Home'
// import AboutPage from './pages/About' // import estático
import Page404 from './pages/404'
import SearchPage from './pages/Search'

import { Router } from './Router'
import { Route } from './Route'

const LazyHomePage = lazy(() => import('./pages/Home.jsx')) // lazy loading
const LazyAboutPage = lazy(() => import('./pages/About.jsx')) // import dinamico

const appRoutes = [
  {
    path: '/:lang/about', // /es/about
    Component: LazyAboutPage,
  },
  {
    path: '/search/:query', // /search/loquesea
    Component: SearchPage,
  },
]

function App() {
  return (
    <main>
      <Suspense fallback={<div>Loading...</div>}>
        <Router routes={appRoutes} defaultComponent={Page404}>
          <Route path='/' Component={LazyHomePage} />
          <Route path='/about' Component={LazyAboutPage} />
        </Router>
      </Suspense>
    </main>
  )
}

export default App
