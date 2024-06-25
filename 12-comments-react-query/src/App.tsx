import './App.css'
import { useQuery, useMutation } from '@tanstack/react-query'
import { getComments, type CommentWithId } from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'],
    getComments
  )

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />
      </div>
      <div className='col-span-1 p-8 bg-black'>
        <form className={` block max-w-xl px-4 m-auto`} onSubmit={handleSubmit}>
          <FormInput />
          <FormTextArea />

          <button
            type='submit'
            className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {/* {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'} */}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
