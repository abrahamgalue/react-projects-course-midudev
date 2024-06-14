import { type User } from '../types.d'

interface Props {
  users: User[]
  isColored: boolean
}

export default function UserList({ users, isColored }: Props) {
  return (
    <table width='100%'>
      <thead>
        <tr>
          <th>Foto</th>
          <th>Nombre</th>
          <th>Apellido</th>
          <th>País</th>
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
                <button>Borrar</button>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}
