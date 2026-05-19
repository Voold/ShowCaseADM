import { useEffect, useState } from 'react'
import styles from './UsersList.module.css'
import OpenIcon from '../assets/up.svg?react'
import { getHighestRole, getRoleTranslation, UserSlot, useUsersByName } from '@/entities/user'
import { DynamicList, useDebounce, useQueryFilters } from '@/shared'

const UsersList = () => {
  const { page, setPage, limit, offset, query, setQuery } = useQueryFilters()

  const [localQuery, setLocalQuery] = useState(query)
  const debouncedQuery = useDebounce(localQuery, 500)

  useEffect(() => setQuery(debouncedQuery), [debouncedQuery])
  useEffect(() => setLocalQuery(query), [query])

  const { data: users = [], isSuccess, isLoading, isError } = useUsersByName(query.toLowerCase(), offset, limit)

  const paginatedUsers = users.slice(offset, offset + limit)
  const totalPages = Math.ceil(users.length / limit) || 1

  return (
    <DynamicList
      currentPage={page}
      totalPages={totalPages}
      setCurrentPage={setPage}
      searchQuery={localQuery}
      setSearchQuery={setLocalQuery}
      placeholder={'Найти пользователя...'}
    >
      {isLoading && <h3 className={styles.placeholder}>Загрузка...</h3>}
      {isError && <h3 className={styles.placeholder}>Произошла ошибка :P</h3>}
      {isSuccess && users.length === 0 ? (
        <h3 className={styles.placeholder}>Ничего не нашлось!</h3>
      ) : (
        paginatedUsers.map(user => (
          <UserSlot className={styles.userSlot} key={user.id} user={user}>
            <a href={`mailto:${user.email}`} className={styles.email}>
              {user.email}
              <OpenIcon className={styles.openIcon} />
            </a>
            <p
              className={`${styles.role} ${user.roles.some(role => role.type === 'Admin') ? styles.active : styles.inactive}`}
            >
              {getRoleTranslation(getHighestRole(user.roles))}
            </p>
          </UserSlot>
        ))
      )}
    </DynamicList>
  )
}

export default UsersList
