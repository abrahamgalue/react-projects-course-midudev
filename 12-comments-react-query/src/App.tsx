import './App.css'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  getComments,
  postComment,
  type CommentWithId,
  type Comment,
} from './service/comments'
import { FormInput, FormTextArea } from './components/Form'
import { Results } from './components/Results'

function App() {
  const { data, isLoading, error } = useQuery<CommentWithId[]>(
    ['comments'],
    getComments
  )

  const queryClient = useQueryClient()

  const { mutate, isLoading: isLoadingMutation } = useMutation({
    mutationFn: postComment,
    /*
    Maneras de solucionar el problema de que no se reflejen los cambios
    Cuando realizamos alguna accion en la bdd, de peor a mejor
    */
    //  3. Optimistic Updates
    onMutate: async newComment => {
      // Cancelamos cualquier refetch que quiera hacer el usuario
      // Para que no exista una sobreescritura de otro query
      await queryClient.cancelQueries(['comments'])

      // esto lo hacemos para guardar el estado previo
      // por en caso de error hay que hacer un rollback
      const previousComments = queryClient.getQueryData(['comments'])

      // Actualizamos de manera optimista el nuevo valor
      queryClient.setQueryData(
        ['comments'],
        (oldData?: Comment[]): Comment[] => {
          const newCommentToAdd = structuredClone(newComment)
          newCommentToAdd.preview = true

          if (oldData == null) return [newCommentToAdd]
          return [...oldData, newCommentToAdd]
        }
      )

      // Devolvemos el objeto de context con el valor snapshotted
      return { previousComments }
    },
    onError: (err, _newComment, context) => {
      console.error(err)
      if (context?.previousComments != null) {
        queryClient.setQueryData(['comments'], context.previousComments)
      }
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['commets'] })
    },
    /* onSuccess: async newComment => {
      // 1. Actualizar la cache de react-query manualmente.
      // await queryClient.setQueryData(
      //   ['comments'],
      //   (oldData?: CommentWithId[]) => {
      //     if (oldData == null) return [newComment]
      //     return [...oldData, newComment]
      //   }
      // )
      // 2. Hacer otra vez un refetch de query
      // Cuando termina invalida las query con el value que le pasamos
      // Y las trae de nuevo
      await queryClient.invalidateQueries({
        queryKey: ['comments'],
      })
    }, */
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    if (isLoadingMutation) return

    event.preventDefault()

    const data = new FormData(event.currentTarget)
    const title = data.get('title')?.toString() ?? ''
    const message = data.get('message')?.toString() ?? ''

    if (title !== '' && message !== '') {
      mutate({ title, message })
    }
  }

  return (
    <main className='grid h-screen grid-cols-2'>
      <div className='col-span-1 p-8 bg-white'>
        {isLoading && <strong>Cargando...</strong>}
        {error != null && <strong>Algo ha ido mal</strong>}
        <Results data={data} />
      </div>
      <div className='col-span-1 p-8 bg-black'>
        <form
          className={`${
            isLoadingMutation ? 'opacity-40' : ''
          } block max-w-xl px-4 m-auto`}
          onSubmit={handleSubmit}
        >
          <FormInput />
          <FormTextArea />

          <button
            disabled={isLoadingMutation}
            type='submit'
            className='mt-4 px-12 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm py-2.5 text-center mr-2 mb-2'
          >
            {isLoadingMutation ? 'Enviando comentario...' : 'Enviar comentario'}
          </button>
        </form>
      </div>
    </main>
  )
}

export default App
