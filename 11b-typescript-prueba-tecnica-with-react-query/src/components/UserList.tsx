import { SortBy, type UUID, type User } from '../types.d'

interface Props {
  users: User[]
  isColored: boolean
  deleteUser: (id: UUID) => void
  changeSorting: (sort: SortBy) => void
}

export default function UserList({
  users,
  isColored,
  deleteUser,
  changeSorting
}: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.NAME)
            }}
          >
            Nombre
          </th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.LAST)
            }}
          >
            Apellido
          </th>
          <th
            className='pointer'
            onClick={() => {
              changeSorting(SortBy.COUNTRY)
            }}
          >
            País
          </th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody className={isColored ? 'table--showColors' : undefined}>
        {users.map(user => {
          return (
            <tr key={user.login.uuid}>
              <td>
                <img
                  src={user.picture.thumbnail}
                  alt={`Photo of ${user.name.first} ${user.name.last}`}
                />
              </td>
              <td>{user.name.first}</td>
              <td>{user.name.last}</td>
              <td>{user.location.country}</td>
              <td>
                <button
                  onClick={() => {
                    deleteUser(user.login.uuid)
                  }}
                >
                  Borrar
                </button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
